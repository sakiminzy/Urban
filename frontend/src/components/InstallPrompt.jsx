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
      className="rounded-full bg-harvestGreen px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-harvestGreen-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvestGreen focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
      onClick={handleInstall}
      aria-label="Install Urban Harvest Hub app"
    >
      Install App
    </button>
  )
}

export default InstallPrompt
