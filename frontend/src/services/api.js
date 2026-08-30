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
