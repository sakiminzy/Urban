const fs = require('fs')
const path = require('path')
const Database = require('better-sqlite3')

const databasePath = path.join(__dirname, 'urban_harvest.db')
const schemaPath = path.join(__dirname, 'schema.sql')

const db = new Database(databasePath)
db.pragma('journal_mode = WAL')

const schema = fs.readFileSync(schemaPath, 'utf8')
db.exec(schema)

module.exports = db
