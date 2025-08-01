import React, { useEffect, useState } from 'react'
import { useName } from '../../context/nameContext'
import axios from 'axios'
import List from '../List'
import './Pokedex.css'

type DefaultType = {
  [key: string]: string
}

const defaultType: DefaultType = {
  ghost: 'Fantasma',
  dark: 'Siniestro',
  electric: 'Eléctrico',
  normal: 'Normal',
  fire: 'Fuego',
  psychic: 'Psíquico',
  flying: 'Volador',
  steel: 'Acero',
  poison: 'Veneno',
  dragon: 'Dragón',
  water: 'Agua',
  ice: 'Hielo',
  rock: 'Roca',
  fighting: 'Lucha',
  grass: 'Planta',
  bug: 'Bicho',
  ground: 'Tierra',
  fairy: 'Hada',
}

 

type Pokemon = {
  name: string
  url: string
}

type TypeFiltered = {
  pokemon: {
    name: string
    url: string
  }
  slot: number
}

const baseUrl = 'https://pokeapi.co/api/v2/'

function Pokedex() {
  const { name } = useName()

  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [typeFiltered, setTypeFiltered] = useState<Pokemon[]>([])
  const [value, setValue] = useState<string>('')
  const [type, setType] = useState<string>('')

  useEffect(() => {
    axios.get(`${baseUrl}/pokemon?limit=649`).then(res => {
      setPokemons(res.data.results)
    })
  }, [])

  useEffect(() => {
    if (!type) {
      return
    }

    axios.get(`${baseUrl}/type/${type}`).then(res => {
      const filteredNames = res.data.pokemon.map((e: TypeFiltered) => e.pokemon.name)
      setTypeFiltered(pokemons.filter(p => filteredNames.includes(p.name)))
    })
  }, [type])

  const filtered = (type ? typeFiltered : pokemons).filter(p =>
    p.name.toLowerCase().includes(value.toLowerCase())
  )

  return (
    <div className="Header-container">
      <header>
        <h2>Hola {name}, bienvenido a tu pokedex</h2>
      </header>

      <form>
        <input
          type="text"
          placeholder="Search..."
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        />

        <select
          value={type}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value)}
          aria-label="Filter by type"
        >
          <option value="">All</option>
          {Object.keys(defaultType).map(type => (
            <option key={type} value={type}>
              {defaultType[type]}
            </option>
          ))}
        </select>
      </form>

      <List pokemons={filtered} />
    </div>
  )
}

export default Pokedex