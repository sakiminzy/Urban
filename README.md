# Urban Harvest Hub

Urban Harvest Hub is a full-stack eco-friendly community platform for discovering sustainable products, local events, practical workshops, and community bookings. The project is designed as a modern web development assignment demonstrating a React SPA/PWA frontend, an Express REST API backend, SQLite persistence, API integration, offline support, and accessible user interface patterns.

## Technology Stack

### Frontend
- React
- Vite
- React Router
- Tailwind CSS
- Vite PWA

### Backend
- Node.js
- Express.js
- SQLite
- better-sqlite3

### Other Integrations
- Open-Meteo Weather API
- Browser Notifications
- Service Worker
- Progressive Web App manifest and offline caching

## Folder Structure

```text
Urban Harvest Hub/
  frontend/
    public/
    src/
      components/
      context/
      data/
      pages/
      services/
      utils/
    package.json
    vite.config.js

  backend/
    controllers/
    database/
      db.js
      schema.sql
      seed.js
      urban_harvest.db
    data/
    middleware/
    routes/
    package.json
    server.js
```

## Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## Run the Backend

```bash
cd backend
npm install
npm run db:init
npm run dev
```

Backend URL:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

## Environment Variables

### Frontend

Create or check `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Backend

Optional backend environment values:

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
```

## API Endpoints

### Products

```http
GET /api/products
GET /api/products/:id
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id
```

### Events

```http
GET /api/events
GET /api/events/:id
POST /api/events
PUT /api/events/:id
DELETE /api/events/:id
```

### Workshops

```http
GET /api/workshops
GET /api/workshops/:id
POST /api/workshops
PUT /api/workshops/:id
DELETE /api/workshops/:id
```

### Bookings

```http
GET /api/bookings
GET /api/bookings/:id
POST /api/bookings
PUT /api/bookings/:id
DELETE /api/bookings/:id
```

### Subscriptions

```http
GET /api/subscriptions
GET /api/subscriptions/:id
POST /api/subscriptions
PUT /api/subscriptions/:id
DELETE /api/subscriptions/:id
```

### Reviews

```http
GET /api/reviews
GET /api/reviews/:id
GET /api/reviews?itemType=<product|event|workshop>&itemId=<id>
POST /api/reviews
PUT /api/reviews/:id
DELETE /api/reviews/:id
```

## Testing the API

You can test simple `GET` routes directly in the browser:

```text
http://localhost:5000/api/products
http://localhost:5000/api/events
http://localhost:5000/api/workshops
http://localhost:5000/api/bookings
```

Use Postman or a similar API client to test `POST`, `PUT`, and `DELETE` routes.

Example booking request:

```http
POST http://localhost:5000/api/bookings
Content-Type: application/json
```

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "itemType": "workshop",
  "itemId": "composting-basics",
  "itemTitle": "Composting Basics",
  "bookingDate": "2026-06-08T10:00",
  "notes": "Testing booking API"
}
```

Example subscription request:

```http
POST http://localhost:5000/api/subscriptions
Content-Type: application/json
```

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "preference": "Weekly produce box",
  "frequency": "weekly",
  "notes": "Please include herbs"
}
```

Example review request:

```http
POST http://localhost:5000/api/reviews
Content-Type: application/json
```

```json
{
  "reviewerName": "Sam",
  "rating": 5,
  "comment": "Great quality!",
  "itemType": "product",
  "itemId": "balcony-herb-kit",
  "itemTitle": "Balcony Herb Starter Kit"
}
```

## Testing the GUI

Start both backend and frontend, then visit:

```text
http://localhost:5173
```

Check the following:
- Products page
- Events page
- Workshops page
- Detail pages for products, events, and workshops
- Search and category filtering
- Booking form validation
- Bookings summary page
- Subscribe page and subscription form
- Reviews on product/event/workshop detail pages
- Admin page for adding, editing, and deleting products/events/workshops
- Dark mode toggle
- WeatherWidget on the Home and Events pages
- Responsive layout on mobile and desktop screen sizes

## Testing PWA Features

For the most accurate PWA test, use the production preview build:

```bash
cd frontend
npm run build
npm run preview
```

Open:

```text
http://localhost:4173
```

In Chrome DevTools:
1. Open the **Application** tab.
2. Check **Manifest** for the app name, theme color, display mode, and icons.
3. Check **Service Workers** to confirm the service worker is registered.
4. Visit pages while online so they are cached.
5. In the **Network** tab, set the browser to **Offline**.
6. Refresh and confirm cached pages or the offline fallback message appear.
7. Test the install button or browser install icon.

Offline message:

```text
You are offline. Some content may be unavailable, but cached pages can still be viewed.
```

## Deployment

Local Frontend URL:

```text
http://localhost:5173
```

Local Backend URL:

```text
http://localhost:5000
```

Deployed Frontend URL:

```text
https://urban-t5kn.vercel.app/
```

Deployed Backend URL:

```text
https://your-deployed-backend.example
```

Note: the frontend is deployed and serving the built PWA. The backend is not yet hosted, so deployed pages
fall back to the bundled local dataset with a "Backend unavailable" notice — this is expected, not a bug,
and is exactly the fallback behaviour described under Data Handling.

## Submission Structure

This is one evolving codebase: Task 1's SPA became Task 2 & 3's PWA by adding a service worker, manifest, and
offline handling on top of the same routes and components — not a separate rebuild.

- **Task 1 — SPA**: `frontend/src` (`pages/`, `components/`, `context/`, routing in `App.jsx`). React Router,
  reusable components, client-side state via Context.
- **Task 2 & 3 — PWA, REST API, database, and frontend integration**:
  - PWA additions: `frontend/vite.config.js` (VitePWA/Workbox config), `frontend/public/offline.html`,
    `frontend/public/icons/`, `frontend/src/components/InstallPrompt.jsx`,
    `frontend/src/components/NotificationPrompt.jsx`, `frontend/src/utils/notifications.js`
  - REST API + database: all of `backend/` — routes, controllers, `database/schema.sql`, `database/seed.js`
  - Frontend integration: `frontend/src/services/api.js` and every page/component that consumes it

### Producing a clean submission zip

`node_modules`, `dist`, build output, and the local SQLite database file are already excluded via
`.gitignore` and are not tracked in git. To produce a zip containing only the tracked source
(no framework or build files):

```bash
git archive --format=zip --output=urban-harvest-hub-submission.zip HEAD
```

## Lighthouse

After deployment, run a Lighthouse audit in Chrome DevTools and capture the results for Performance, Accessibility, Best Practices, SEO, and PWA compliance. Update this README with the deployed URLs and audit scores once the app is live.

## Testing Notifications

On the Home page:
1. Find the PWA notifications card.
2. Click **Enable Notifications**.
3. Allow notifications in the browser prompt.
4. Confirm the test notification appears.
5. Click **Send Test Update** to trigger another notification.

Notification support depends on browser permissions and platform support. Notifications usually require `localhost` or HTTPS.

## Accessibility Features

The frontend includes:
- Semantic HTML elements such as `main`, `section`, `article`, `header`, `nav`, and `footer`
- ARIA labels where useful
- Keyboard-accessible buttons and links
- Visible focus states
- Form labels
- Validation messages
- `aria-live` status messages for notification feedback
- Responsive layouts for mobile and desktop users

## Known Limitations

- Deployment may require additional setup for environment variables, HTTPS, service worker scope, and backend hosting.
- SQLite is suitable for local development and assignment demonstration, but production hosting may require a managed database.
- SQLite booking data may reset depending on the hosting environment or if the database is re-seeded.
- Browser notification behavior varies across browsers and operating systems.
