import { useEffect, useState } from 'react'
import axios from 'axios'
import './Item.css'

type Pokemon = {
  id: number
  name: string
  types: string[]
  image: string
}

type Type = {
  slot: number
  type: {
    name: string
    url: string
  }
}

function Item({ url }: { url: string }) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)

  useEffect(() => {
    axios.get(url)
      .then((res) => {
        setPokemon({
          id: res.data.id,
          name: res.data.name,
          types: res.data.types.map((t: Type) => t.type.name),
          image: res.data.sprites.other.dream_world.front_default ??
                 res.data.sprites.front_default
        })
      })
  }, [url])

  if (!pokemon) return <div className="card loading">Cargando...</div>

  return (
    <div className="card">
      <img className="card-img" src={pokemon.image} alt={pokemon.name} />
      <span className="card-id">#{pokemon.id.toString().padStart(3, '0')}</span>
      <h2 className="card-name">{pokemon.name.toUpperCase()}</h2>
      <div className="card-types">
        {pokemon.types.map(t => (
          <span key={t} className={`type-tag ${t.toLowerCase()}`}>{t}</span>
        ))}
      </div>
    </div>
  )
}

export default Item