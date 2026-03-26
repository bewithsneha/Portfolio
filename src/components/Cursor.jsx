import { useEffect, useState } from 'react'
import './Cursor.css'

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState({ x: 0, y: 0 })
  const [clicking, setClicking] = useState(false)

  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY })
    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  useEffect(() => {
    let raf
    const animate = () => {
      setTrail(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.12,
        y: prev.y + (pos.y - prev.y) * 0.12,
      }))
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [pos])

  return (
    <>
      <div
        className={`cursor-dot ${clicking ? 'clicking' : ''}`}
        style={{ left: pos.x, top: pos.y }}
      />
      <div
        className="cursor-ring"
        style={{ left: trail.x, top: trail.y }}
      />
    </>
  )
}
