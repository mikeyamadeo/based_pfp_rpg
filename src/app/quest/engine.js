import { MODIFIER_TYPES } from '@data/_enums'

const BASE_ROLLS = 3
export const getRolls = (modifiers) => {
  const rollCount = BASE_ROLLS + modifiers.rolls

  return rollCount
}

/**
 * Transform Weighted Modifier
 * @param {boolean} isWeighted - whether or not there are calculations to be made
 * @param {object} weights - the weighted values
 * @param {object} options - list weight:value pairs
 * @param {number} options.value - single value corresponding to a single weight
 * @param {string} options.script - description of result
 */
const xWeightedModifier = (modifier) => {
  if (modifier.isWeighted) {
    const weightedValue = weightedRandom(modifier.weights)
    const result = modifier.options[weightedValue]
    return {
      ...modifier,
      ...result // value, script
    }
  }

  return modifier
}

/**
 * Add up magic find and rolls
 * @param {strong} modifiers.type - property being modified (e.g. MAGIC_FIND, ROLLS)
 * @param {number} modifiers.value - modifier value (e.g. -1,0,2)
 *
 * @return {number} mf - magic find percent
 * @return {number} rolls - roll count
 */
const calcModifiers = (modifiers) => {
  return modifiers.reduce((totals, modifier) => {
    if (modifier.type === MODIFIER_TYPES.mf) {
      return {
        ...totals,
        mf: totals.mf + modifier.value
      }
    } else if (modifier.type === MODIFIER_TYPES.rolls) {
      return {
        ...totals,
        rolls: totals.rolls + modifier.value
      }
    } else {
      return totals
    }
  }, {
    mf: 0,
    rolls: 0
  })
}

export const getModifiers = (boss, player) => {
  // pre conditions (e.g. losing hat)

  // rolls
  // mf
  // tiers
  // collections

  // determine & create swag pool (collections, types), organize by tier
  // const collections = boss.swag.collections
  // const types = boss.swag.types

  // determine # of rolls (base + player modifiers + boss modifiers)
  const rewardModifiers = (boss.rewards || []).map(xWeightedModifier)
  const riskModifiers = (boss.risks || []).map(xWeightedModifier)
  const playerModifiers = []

  const modifiers = calcModifiers([
    ...rewardModifiers,
    ...riskModifiers,
    ...playerModifiers
  ])

  return modifiers

  // for each roll
  // decide tier
  // decide item in tier
}

export const weightedRandom = (weights) => {
  let totalWeight = 0
  for (const tier in weights) {
    totalWeight += weights[tier]
  }

  let randomNum = Math.random() * totalWeight
  for (const tier in weights) {
    if (randomNum <= weights[tier]) {
      return tier
    }
    randomNum -= weights[tier]
  }
}

export const getRandomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}
