const crypto = require('crypto')
const db = require('../database/db')

function createId(value, fallbackPrefix) {
  const source = value || `${fallbackPrefix}-${Date.now()}`

  return source
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function validateRequiredFields(body, fields) {
  return fields
    .filter((field) => !body[field] || String(body[field]).trim() === '')
    .map((field) => `${field} is required`)
}

function mapRow(row, type) {
  if (!row) {
    return null
  }

  if (type === 'booking') {
    return {
      ...row,
      bookingDateTime: row.bookingDate,
    }
  }

  return {
    ...row,
    type,
  }
}

function buildInsert(table, fields) {
  const columns = ['id', ...fields]
  const placeholders = columns.map((field) => `@${field}`)

  return db.prepare(`
    INSERT INTO ${table} (${columns.join(', ')})
    VALUES (${placeholders.join(', ')})
  `)
}

function buildUpdate(table, fields) {
  const assignments = fields.map((field) => `${field} = @${field}`)

  return db.prepare(`
    UPDATE ${table}
    SET ${assignments.join(', ')}
    WHERE id = @id
  `)
}

function pickFields(body, fields) {
  return fields.reduce((result, field) => {
    result[field] = body[field] ?? ''
    return result
  }, {})
}

function createCrudController(options) {
  const {
    table,
    type,
    fields,
    requiredFields,
    idSourceField = 'title',
    transformInput = (body) => body,
    extraValidate = () => [],
  } = options

  const selectAll = db.prepare(`SELECT * FROM ${table} ORDER BY created_at DESC`)
  const selectById = db.prepare(`SELECT * FROM ${table} WHERE id = ?`)
  const insert = buildInsert(table, fields)
  const update = buildUpdate(table, fields)
  const removeById = db.prepare(`DELETE FROM ${table} WHERE id = ?`)

  const getAll = (req, res) => {
    const rows = selectAll.all().map((row) => mapRow(row, type))

    res.json({
      success: true,
      count: rows.length,
      data: rows,
    })
  }

  const getById = (req, res) => {
    const row = mapRow(selectById.get(req.params.id), type)

    if (!row) {
      return res.status(404).json({
        success: false,
        message: `${type} not found`,
      })
    }

    return res.json({
      success: true,
      data: row,
    })
  }

  const create = (req, res) => {
    const input = transformInput(req.body)
    const errors = [
      ...validateRequiredFields(input, requiredFields),
      ...extraValidate(input),
    ]

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      })
    }

    const id = input.id || createId(input[idSourceField], type) || crypto.randomUUID()

    if (selectById.get(id)) {
      return res.status(400).json({
        success: false,
        message: `${type} with this id already exists`,
      })
    }

    insert.run({
      id,
      ...pickFields(input, fields),
    })

    return res.status(201).json({
      success: true,
      data: mapRow(selectById.get(id), type),
    })
  }

  const updateById = (req, res) => {
    const existing = selectById.get(req.params.id)

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: `${type} not found`,
      })
    }

    const input = transformInput(req.body)
    const errors = [
      ...validateRequiredFields(input, requiredFields),
      ...extraValidate(input),
    ]

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      })
    }

    update.run({
      id: req.params.id,
      ...pickFields(input, fields),
    })

    return res.json({
      success: true,
      data: mapRow(selectById.get(req.params.id), type),
    })
  }

  const remove = (req, res) => {
    const existing = selectById.get(req.params.id)

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: `${type} not found`,
      })
    }

    removeById.run(req.params.id)

    return res.json({
      success: true,
      data: mapRow(existing, type),
    })
  }

  return {
    getAll,
    getById,
    create,
    update: updateById,
    remove,
  }
}

module.exports = createCrudController
