const crypto = require('crypto')
const db = require('../database/db')

const requiredFields = ['title', 'category', 'description', 'price']

function createId(value) {
  const source = value || `product-${Date.now()}`

  return source
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function validateRequiredFields(body) {
  return requiredFields
    .filter((field) => !body[field] || String(body[field]).trim() === '')
    .map((field) => `${field} is required`)
}

const selectAll = db.prepare('SELECT * FROM products ORDER BY created_at DESC')
const selectById = db.prepare('SELECT * FROM products WHERE id = ?')
const insert = db.prepare(`
  INSERT INTO products (id, title, category, image, description, price, availability)
  VALUES (@id, @title, @category, @image, @description, @price, @availability)
`)
const update = db.prepare(`
  UPDATE products
  SET title = @title, category = @category, image = @image, description = @description, price = @price, availability = @availability
  WHERE id = @id
`)
const removeById = db.prepare('DELETE FROM products WHERE id = ?')

function getAll(req, res) {
  const rows = selectAll.all().map((row) => ({ ...row, type: 'product' }))

  res.json({ success: true, count: rows.length, data: rows })
}

function getById(req, res) {
  const row = selectById.get(req.params.id)

  if (!row) {
    return res.status(404).json({ success: false, message: 'product not found' })
  }

  return res.json({ success: true, data: { ...row, type: 'product' } })
}

function create(req, res) {
  const errors = validateRequiredFields(req.body)

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors })
  }

  const id = createId(req.body.title) || crypto.randomUUID()

  if (selectById.get(id)) {
    return res.status(400).json({ success: false, message: 'product with this id already exists' })
  }

  insert.run({
    id,
    title: req.body.title,
    category: req.body.category,
    image: req.body.image ?? '',
    description: req.body.description,
    price: req.body.price,
    availability: req.body.availability ?? '',
  })

  return res.status(201).json({ success: true, data: { ...selectById.get(id), type: 'product' } })
}

function updateById(req, res) {
  const existing = selectById.get(req.params.id)

  if (!existing) {
    return res.status(404).json({ success: false, message: 'product not found' })
  }

  const errors = validateRequiredFields(req.body)

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors })
  }

  update.run({
    id: req.params.id,
    title: req.body.title,
    category: req.body.category,
    image: req.body.image ?? '',
    description: req.body.description,
    price: req.body.price,
    availability: req.body.availability ?? '',
  })

  return res.json({ success: true, data: { ...selectById.get(req.params.id), type: 'product' } })
}

function remove(req, res) {
  const existing = selectById.get(req.params.id)

  if (!existing) {
    return res.status(404).json({ success: false, message: 'product not found' })
  }

  removeById.run(req.params.id)

  return res.json({ success: true, data: { ...existing, type: 'product' } })
}

module.exports = {
  getAll,
  getById,
  create,
  update: updateById,
  remove,
}
