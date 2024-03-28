import { createContext, useContext, useEffect, useState } from 'react'
import api from '../../api/'
import { getRolls, getModifiers, weightedRandom, getRandomElement } from './engine'

const State = createContext()

const stages = {
  BOSS_MENU: 'BOSS_MENU',
  SWAG_MENU: 'SWAG_MENU',
  BOSS_CUSTOM: 'BOSS_CUSTOM'
}

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
  const [swag, setSwag] = useState({})
  const [boss, setBoss] = useState({})
  const [swagRolls, setSwagRolls] = useState({})
  const [stage, setStage] = useState(stages.BOSS_MENU)

  const getSwagOptions = (boss) => {
    let swagOptions = filterByCollection(boss.swag.collections, swag)
    swagOptions = filterByRarity(Object.keys(boss.swag.chances), swagOptions)
    swagOptions = filterByType(boss.swag.types, swagOptions)

    return swagOptions
  }
  const triggerSwagRoll = (boss) => {
    if (boss.custom && boss.custom.handle()) {
      setBoss(boss)
      setStage(stages.BOSS_CUSTOM)
      return
    }

    // filter for collection, traits, and rarity
    const swagOptions = getSwagOptions(boss)

    // get modifiers
    const modifiers = getModifiers(boss, null)

    // determine rolls
    // for each roll
    // 1. determine rarity
    // 2. determine swag
    const rollCount = getRolls(modifiers)
    const swagItems = []
    for (let i = 0; i < rollCount; i++) {
      const rarity = weightedRandom(boss.swag.chances)
      const options = filterByRarity([rarity], swagOptions)
      swagItems.push(getRandomElement(options))
    }

    setBoss(boss)
    setSwagRolls(swagItems)
    setStage(stages.SWAG_MENU)
  }

  const reset = () => {
    setBoss({})
    setSwagRolls({})
    setStage(stages.BOSS_MENU)
  }

  useEffect(() => {
    // load from airtable
    async function fetchData () {
      const swag = await api.traits.load()
      setSwag(swag)
    }
    fetchData()
  }, [])

  return (
    <State.Provider value={{
      boss,
      stage,
      triggerSwagRoll,
      swag,
      swagRolls,
      getSwagOptions,
      reset
    }}
    >
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
