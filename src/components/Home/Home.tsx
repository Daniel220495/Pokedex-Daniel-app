import { useRef, useState, useEffect } from 'react'
import { KeyboardEvent } from 'react' 
import { useName } from '../../context/nameContext'
import { Link, useNavigate } from 'react-router'  
import './Home.css'

function Home() {
  const [error, setError] = useState<string | null>(null)
  const [showContent, setShowContent] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { name, getName } = useName()

  const handleSetName = () => {
    const value = inputRef.current?.value.trim()
    setError(null)
    if (!value) {
      setError('El nombre no puede estar vacío')
      return
    }
    getName(value)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    navigate('/pokedex')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSetName()
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="home-container">
      <div className="home-background" />
      <div className="home-overlay" />
      <div className="home-content-wrapper">
        <div className={`home-content ${showContent ? 'show' : ''}`}>
          {!name ? (
            <>
              <h1 className="home-title">¡Bienvenid@ Entrenador!</h1>
              <p className="home-subtitle">Para comenzar, ingresa tu nombre:</p>
              <input
                type="text"
                ref={inputRef}
                placeholder="Escribe tu nombre"
                aria-label="Nombre de entrenador"
                onKeyDown={handleKeyDown}
                className="home-input"
              />
              <button onClick={handleSetName} className="home-button">
                Comenzar
              </button>
            </>
          ) : (
            <h2 className="home-greeting">
              ¡Hola de nuevo <span className="highlight">{name}</span>! Ir a tu{' '}
              <Link to="/pokedex" className="pokedex-link">
                Pokedex
              </Link>
            </h2>
          )}
          {error && <p className="home-error">{error}</p>}
        </div>
      </div>
    </div>
  )
}

export default Home