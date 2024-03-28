import { createContext, useContext, useEffect, useState } from 'react'
import api from '../../api/'
import { SWAG_TIERS, TRAIT_TYPES } from '@data/_enums'

const State = createContext()

const filterBy = (prop) => (values, list) => {
  return list.filter(item => {
    const value = item[prop]
    if (values.some($ => $ === value)) {
      return true
    }
    return false
  })
}

const filterByCollection = filterBy('collection')
const filterByRarity = filterBy('rarity')
const filterByType = filterBy('type')
const Provider = ({ children }) => {
  const [traits, setTraits] = useState({})

  useEffect(() => {
    // load from airtable
    async function fetchData () {
      const traits = await api.traits.load()
      console.log({ traits })
      const basic = filterByRarity(['Basic'], traits)
      setTraits({
        hats: filterByType([TRAIT_TYPES.hat], basic),
        shirts: filterByType([TRAIT_TYPES.shirt], basic),
        faces: filterByType([TRAIT_TYPES.face], basic),
        bases: filterByType([TRAIT_TYPES.base], basic)
      })
    }
    fetchData()
  }, [])

  return (
    <State.Provider value={{ traits }}>
      {children}
    </State.Provider>
  )
}

export default {
  use: () => {
    return useContext(State)
  },
  Provider
}
