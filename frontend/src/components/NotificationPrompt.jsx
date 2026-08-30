import { useState } from 'react'
import {
  getNotificationPermission,
  isNotificationSupported,
  requestNotificationPermission,
  sendNotification,
} from '../utils/notifications'

const permissionLabels = {
  default: 'Not enabled',
  granted: 'Enabled',
  denied: 'Blocked',
  unsupported: 'Not supported',
}

function NotificationPrompt() {
  const [permission, setPermission] = useState(getNotificationPermission)
  const [statusMessage, setStatusMessage] = useState(
    isNotificationSupported()
      ? 'Enable browser notifications to receive Urban Harvest updates.'
      : 'This browser does not support notifications.',
  )

  const handleEnableNotifications = async () => {
    const result = await requestNotificationPermission()
    setPermission(result)

    if (result === 'granted') {
      sendNotification('Urban Harvest Hub', {
        body: 'Notifications enabled! You will receive updates about events, workshops, and eco products.',
      })
      setStatusMessage('Notifications are enabled. A test notification was sent.')
      return
    }

    if (result === 'denied') {
      setStatusMessage('Notifications are blocked. You can re-enable them in your browser site settings.')
      return
    }

    if (result === 'unsupported') {
      setStatusMessage('This browser does not support notifications.')
      return
    }

    setStatusMessage('Notification permission was not changed.')
  }

  const handleSendTestUpdate = () => {
    const wasSent = sendNotification('New Urban Harvest Update', {
      body: 'A new eco-friendly workshop or event is available.',
    })

    setStatusMessage(
      wasSent
        ? 'Test update sent.'
        : 'Enable notifications first before sending a test update.',
    )
  }

  const isUnsupported = permission === 'unsupported'
  const isDenied = permission === 'denied'

  return (
    <section className="app-panel grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center" aria-labelledby="notification-heading">
      <div>
        <p className="section-kicker">PWA notifications</p>
        <h2 id="notification-heading" className="mt-2 font-display text-3xl font-medium text-[color:var(--text)]">
          Stay updated on fresh eco opportunities.
        </h2>
        <p className="mt-3 leading-6 text-[color:var(--muted)]">
          Demonstrate browser notifications for new workshops, community events,
          and sustainable product updates.
        </p>
      </div>

      <div className="rounded-2xl border border-[color:var(--border)] p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-[color:var(--muted)]">
              Permission status
            </p>
            <p className="mt-1 font-display text-2xl font-medium text-[color:var(--accent)]">
              {permissionLabels[permission] || permission}
            </p>
          </div>
          <span className="badge">
            Demo feature
          </span>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="btn-primary focus-ring"
            onClick={handleEnableNotifications}
            disabled={isUnsupported}
            aria-label="Enable Urban Harvest Hub notifications"
          >
            Enable Notifications
          </button>
          <button
            type="button"
            className="btn-secondary focus-ring"
            onClick={handleSendTestUpdate}
            disabled={isUnsupported || isDenied}
            aria-label="Send a test Urban Harvest Hub notification"
          >
            Send Test Update
          </button>
        </div>

        <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]" aria-live="polite">
          {statusMessage}
        </p>
      </div>
    </section>
  )
}

export default NotificationPrompt
