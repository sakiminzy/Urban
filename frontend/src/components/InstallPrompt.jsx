import { useEffect, useState } from 'react'

function InstallPrompt() {
  const [installEvent, setInstallEvent] = useState(null)
  const [isInstalled, setIsInstalled] = useState(() =>
    window.matchMedia('(display-mode: standalone)').matches,
  )

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault()
      setInstallEvent(event)
    }

    const handleAppInstalled = () => {
      setIsInstalled(true)
      setInstallEvent(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstall = async () => {
    if (!installEvent) {
      return
    }

    installEvent.prompt()
    const choice = await installEvent.userChoice

    if (choice.outcome === 'accepted') {
      setIsInstalled(true)
    }

    setInstallEvent(null)
  }

  if (!installEvent || isInstalled) {
    return null
  }

  return (
    <button
      type="button"
      className="btn-primary focus-ring text-sm"
      onClick={handleInstall}
      aria-label="Install Urban Harvest Hub app"
    >
      Install App
    </button>
  )
}

export default InstallPrompt
