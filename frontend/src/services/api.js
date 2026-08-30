const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  const payload = await response.json()

  if (!response.ok) {
    throw new Error(payload.message || 'API request failed')
  }

  return payload.data ?? payload
}

export function getProducts() {
  return request('/products')
}

export function getProductById(id) {
  return request(`/products/${id}`)
}

export function getEvents() {
  return request('/events')
}

export function getEventById(id) {
  return request(`/events/${id}`)
}

export function getWorkshops() {
  return request('/workshops')
}

export function getWorkshopById(id) {
  return request(`/workshops/${id}`)
}

export function getBookings() {
  return request('/bookings')
}

export function createBooking(bookingData) {
  return request('/bookings', {
    method: 'POST',
    body: JSON.stringify(bookingData),
  })
}

export function getSubscriptions() {
  return request('/subscriptions')
}

export function createSubscription(subscriptionData) {
  return request('/subscriptions', {
    method: 'POST',
    body: JSON.stringify(subscriptionData),
  })
}

export function getReviewsByItem(itemType, itemId) {
  return request(`/reviews?itemType=${encodeURIComponent(itemType)}&itemId=${encodeURIComponent(itemId)}`)
}

export function createReview(reviewData) {
  return request('/reviews', {
    method: 'POST',
    body: JSON.stringify(reviewData),
  })
}

export function createProduct(productData) {
  return request('/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  })
}

export function updateProduct(id, productData) {
  return request(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  })
}

export function deleteProduct(id) {
  return request(`/products/${id}`, {
    method: 'DELETE',
  })
}

export function createEvent(eventData) {
  return request('/events', {
    method: 'POST',
    body: JSON.stringify(eventData),
  })
}

export function updateEvent(id, eventData) {
  return request(`/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify(eventData),
  })
}

export function deleteEvent(id) {
  return request(`/events/${id}`, {
    method: 'DELETE',
  })
}

export function createWorkshop(workshopData) {
  return request('/workshops', {
    method: 'POST',
    body: JSON.stringify(workshopData),
  })
}

export function updateWorkshop(id, workshopData) {
  return request(`/workshops/${id}`, {
    method: 'PUT',
    body: JSON.stringify(workshopData),
  })
}

export function deleteWorkshop(id) {
  return request(`/workshops/${id}`, {
    method: 'DELETE',
  })
}
