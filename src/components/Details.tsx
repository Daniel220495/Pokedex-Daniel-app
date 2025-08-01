import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import axios from 'axios'
import './Details.css'

type Types = {
  type: {
    name: string
  }
}

type Abilities = {
  ability: {
    name: string
  }
}

type Moves = {
  move: {
    name: string
  }
}

type Stats = {
  hp: number
  attack: number
  defense: number
  speed: number
}

type Pokemon = {
  id: number
  name: string
  types: string[]
  abilities: string[]
  moves: string[]
  image: string | null
  stats: Stats
}

const baseUrl = 'https://pokeapi.co/api/v2/'

function Details() {
  const { name } = useParams<{ name: string }>()
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)

  useEffect(() => {
    if (!name) return

    axios.get(`${baseUrl}/pokemon/${name}`)
      .then(res => {
        setPokemon({
          id: res.data.id,
          name: res.data.name,
          types: res.data.types.map((t: Types) => t.type.name),
          abilities: res.data.abilities.map((a: Abilities) => a.ability.name),
          moves: res.data.moves.map((m: Moves) => m.move.name).slice(0, 20),
          image: res.data.sprites.other.dream_world.front_default ?? res.data.sprites.front_default,
          stats: {
            hp: res.data.stats[0].base_stat,
            attack: res.data.stats[1].base_stat,
            defense: res.data.stats[2].base_stat,
            speed: res.data.stats[5].base_stat
          }
        })
      })
  }, [name])

  if (!pokemon) return <p>Cargando Pokémon...</p>

  return (
    <div className="details-container">
      <header className="header">
        <Link to="/pokedex" className="back-link">← Volver</Link>
      </header>

      <div className="card">
        <span className="poke-id">#{pokemon.id.toString().padStart(3, '0')}</span>
        <h1 className="poke-name">{pokemon.name.toUpperCase()}</h1>
        <img src={pokemon.image ?? ''} alt={pokemon.name} className="poke-image" />
      </div>

      <div className="card-section">
        <h2>Tipos</h2>
        <ul className="type-list">
          {pokemon.types.map((t) => (
            <li key={t} className={`type ${t.toLowerCase()}`}>{t}</li>
          ))}
        </ul>
      </div>

      <div className="card-section">
        <h2>Habilidades</h2>
        <ul>
          {pokemon.abilities.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>

      <div className="card-section">
        <h2>Movimientos</h2>
        <ol>
          {pokemon.moves.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ol>
      </div>

      <div className="card-section">
        <h2>Estadísticas</h2>
        <div className="stat"><span>HP</span><div className="bar"><div className="fill" style={{ width: `${pokemon.stats.hp}%` }} /></div><span>{pokemon.stats.hp}</span></div>
        <div className="stat"><span>Ataque</span><div className="bar"><div className="fill" style={{ width: `${pokemon.stats.attack}%` }} /></div><span>{pokemon.stats.attack}</span></div>
        <div className="stat"><span>Defensa</span><div className="bar"><div className="fill" style={{ width: `${pokemon.stats.defense}%` }} /></div><span>{pokemon.stats.defense}</span></div>
        <div className="stat"><span>Velocidad</span><div className="bar"><div className="fill" style={{ width: `${pokemon.stats.speed}%` }} /></div><span>{pokemon.stats.speed}</span></div>
      </div>
    </div>
  )
}

export default Details