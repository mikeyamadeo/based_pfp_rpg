'use client'
import { Box } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

import BossMenu from '@views/boss-menu'
import SwagReveal from '@views/swag-reveal'
// import Menu from '@ui/menu'
import state from './state'
// import { engine } from './engine'
import bosses from '@data/bosses'

const Main = () => {
  const { stage, getSwagOptions, triggerSwagRoll, swagRolls, boss, reset } = state.use()
  const [bosses, setBossList] = useState([])

  useEffect(() => {
    const options = getBossList()
    setBossList(options) // transform
  }, [stage])

  const onBossSelect = (boss) => {
    const params = new URLSearchParams(window.location.search)
    const quota = params.get('quota')
    const individualWeight = Number(quota || 0)
    // maybe run engine
    triggerSwagRoll(boss, individualWeight)
  }

  return (
    <Box h='calc(100vh - 70px)'>
      {stage === 'BOSS_MENU' && <BossMenu options={bosses} getSwagOptions={getSwagOptions} onSelect={onBossSelect} />}
      {stage === 'BOSS_CUSTOM' && <boss.custom.Stage />}
      {stage === 'SWAG_MENU' && <SwagReveal boss={boss} rolls={swagRolls} onClose={reset} />}
    </Box>
  )
}

const Shell = () => {
  return (
    <state.Provider>
      <Main />
    </state.Provider>
  )
}

export default Shell

const getBossList = () => shuffleArray(bosses.list).slice(0, 6)
// const getBossList = () => bosses.list

function shuffleArray (array) {
  const shuffledArray = [...array]

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }

  return shuffledArray
}
