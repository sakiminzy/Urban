export function isNotificationSupported() {
  return 'Notification' in window
}

export function getNotificationPermission() {
  if (!isNotificationSupported()) {
    return 'unsupported'
  }

  return Notification.permission
}

export async function requestNotificationPermission() {
  if (!isNotificationSupported()) {
    return 'unsupported'
  }

  return Notification.requestPermission()
}

export function sendNotification(title, options = {}) {
  if (!isNotificationSupported() || Notification.permission !== 'granted') {
    return false
  }

  new Notification(title, {
    icon: '/icons/icon-192.svg',
    badge: '/icons/icon-192.svg',
    ...options,
  })

  return true
}
