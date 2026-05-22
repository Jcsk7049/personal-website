import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, state } = useLocation()
  useEffect(() => {
    // Skip scroll when opening a modal (background state = card click from home)
    if (!state?.background) window.scrollTo(0, 0)
  }, [pathname, state])
  return null
}
