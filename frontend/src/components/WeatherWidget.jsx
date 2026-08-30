import { useEffect, useState } from 'react'

const WEATHER_API_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=6.9271&longitude=79.8612&current_weather=true'

function WeatherWidget() {
  const [weather, setWeather] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const fetchWeather = async () => {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch(WEATHER_API_URL, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Weather request failed.')
        }

        const data = await response.json()

        if (!data.current_weather) {
          throw new Error('Weather data is unavailable.')
        }

        setWeather(data.current_weather)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError('Unable to load Colombo weather right now.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchWeather()

    return () => controller.abort()
  }, [])

  return (
    <section
      className="app-panel overflow-hidden"
      aria-labelledby="weather-widget-heading"
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div>
        <p className="section-kicker">
          Colombo weather
        </p>
        <h2 id="weather-widget-heading" className="mt-2 font-display text-2xl font-medium text-[color:var(--text)]">
          Current growing conditions
        </h2>
        </div>
        <p className="badge">
          Live API
        </p>
      </div>

      {isLoading && (
        <p className="mt-4 text-[color:var(--muted)]" role="status">
          Loading weather information...
        </p>
      )}

      {error && (
        <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-800" role="alert">
          {error}
        </p>
      )}

      {weather && !isLoading && !error && (
        <dl className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="stat-card">
            <dt className="text-sm font-medium text-[color:var(--muted)]">Temperature</dt>
            <dd className="mt-1 text-2xl font-semibold text-[color:var(--text)]">
              {weather.temperature}&deg;C
            </dd>
          </div>
          <div className="stat-card">
            <dt className="text-sm font-medium text-[color:var(--muted)]">Wind speed</dt>
            <dd className="mt-1 text-2xl font-semibold text-[color:var(--text)]">
              {weather.windspeed} km/h
            </dd>
          </div>
          <div className="stat-card">
            <dt className="text-sm font-medium text-[color:var(--muted)]">Weather code</dt>
            <dd className="mt-1 text-2xl font-semibold text-[color:var(--text)]">
              {weather.weathercode}
            </dd>
          </div>
        </dl>
      )}
    </section>
  )
}

export default WeatherWidget
