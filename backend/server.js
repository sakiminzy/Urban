const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

const productsRoutes = require('./routes/products')
const eventsRoutes = require('./routes/events')
const workshopsRoutes = require('./routes/workshops')
const bookingsRoutes = require('./routes/bookings')
const subscriptionsRoutes = require('./routes/subscriptions')
const reviewsRoutes = require('./routes/reviews')
const { seedCatalogIfEmpty } = require('./database/seed')
const errorHandler = require('./middleware/errorHandler')

dotenv.config()
seedCatalogIfEmpty()

const app = express()
const PORT = process.env.SERVER_PORT || process.env.PORT || 5000
const frontendDistPath = path.join(__dirname, '..', 'frontend', 'dist')
const frontendIndexPath = path.join(frontendDistPath, 'index.html')

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Urban Harvest API is running',
  })
})

app.use('/api/products', productsRoutes)
app.use('/api/events', eventsRoutes)
app.use('/api/workshops', workshopsRoutes)
app.use('/api/bookings', bookingsRoutes)
app.use('/api/subscriptions', subscriptionsRoutes)
app.use('/api/reviews', reviewsRoutes)

app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found',
  })
})

if (fs.existsSync(frontendIndexPath)) {
  app.use(express.static(frontendDistPath))

  app.use((req, res) => {
    res.sendFile(frontendIndexPath)
  })
} else {
  app.get('/', (req, res) => {
    res.status(503).json({
      success: false,
      message: 'Frontend build not found. Run npm install and npm run build in the frontend folder.',
    })
  })
}

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found',
  })
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Urban Harvest API running on port ${PORT}`)
})
