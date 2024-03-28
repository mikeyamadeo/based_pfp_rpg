'use client'
import { SWAG_TIERS, SWAG_COLLECTIONS, SWAG_TYPES, MODIFIER_TYPES } from './_enums'
import { Box, Image } from '@chakra-ui/react'
import styles from './bosses.module.css'
import Menu from '@ui/menu'

const bosslist = [
  {
    id: 'pokesaur',
    name: 'Pokesaur',
    cta: 'Show Badges',
    tier: 1,
    img: { default: '/bosses/bulba.png' },
    stories: {
      intro: 'With the right badges, Pokesaur gives out Pocket Monster swag',
      success: ''
    },
    swag: {
      // tiers: [SWAG_TIERS.basic],
      chances: {
        [SWAG_TIERS.basic]: 100,
        [SWAG_TIERS.rare]: 25,
        [SWAG_TIERS.unique]: 5
      },
      collections: [SWAG_COLLECTIONS.pokes],
      types: [...Object.values(SWAG_TYPES)]
    },
    requirements: [],
    risks: [],
    rewards: []
    // chances: [{}]
  },
  {
    id: 'mikey',
    name: 'Chief Wagmi',
    cta: 'Ask for Swag',
    tier: 1,
    img: { default: '/bosses/mikey.png' },
    stories: {
      intro: 'Hey it’s me, Mikey. I only give out basic swag atm, but all you need is ask',
      success: ''
    },
    swag: {
      chances: {
        [SWAG_TIERS.basic]: 100
      },
      collections: [SWAG_COLLECTIONS.coolcats],
      types: [...Object.values(SWAG_TYPES)]
    },
    requirements: [],
    risks: [],
    rewards: [
      {
        type: MODIFIER_TYPES.rolls,
        isWeighted: true,
        script: 'Chance to gain +1-4 rolls',
        weights: {
          plusone: 50,
          plustwo: 25,
          plusthree: 25,
          plusfour: 10
        },
        options: {
          plusone: { value: 1, script: '+1 Roll!' },
          plustwo: { value: 2, script: '+2 Roll!' },
          plusthree: { value: 3, script: '+3 Roll!' },
          plusfour: { value: 4, script: '+4 Roll!' }
        }
      }
    ],
    chances: {
      rollsplus: 3
      // rollsminus: 0,
      // swagloss: -3
    }
  },
  {
    id: 'glitchy',
    name: 'Glitchy',
    cta: 'Debug',
    tier: 2,
    img: { default: '/bosses/glitchman.png' },
    stories: {
      intro: 'Uhoh, it’s a glitch. Those are formidable. Looks like there is a chance you’ll get extra rolls… or nothing at all.',
      success: ''
    },
    swag: {
      chances: {
        [SWAG_TIERS.basic]: 100,
        [SWAG_TIERS.rare]: 10
      },
      collections: [SWAG_COLLECTIONS.coolcats],
      types: [...Object.values(SWAG_TYPES)]
    },
    requirements: [],
    risks: [
      {
        type: MODIFIER_TYPES.rolls,
        isWeighted: true,
        script: 'Chance to lose 1 roll',
        weights: {
          // minustwo: 10,
          minusone: 50,
          zero: 50
        },
        options: {
          minusone: { value: -1, script: '-1 Roll!' },
          zero: { value: 0, script: 'No roll decrease' }
        }
      }
    ],
    rewards: [
      {
        type: MODIFIER_TYPES.rolls,
        isWeighted: true,
        script: 'Chance to gain +1-3 rolls',
        weights: {
          zero: 50,
          plusone: 25,
          plustwo: 25,
          plusthree: 25
        },
        options: {
          plusone: { value: 1, script: '+1 Roll!' },
          pluplustwosone: { value: 2, script: '+2 Roll!' },
          plusthree: { value: 3, script: '+2 Roll!' },
          zero: { value: 0, script: 'No roll increase' }
        }
      }
    ],
    chances: {
      rollsplus: 2,
      rollsminus: -1
      // swagloss: -3
    }
  },
  {
    id: 'kadabra',
    name: 'Kadabra',
    tier: 3,
    cta: 'Duel!',
    img: { default: '/bosses/kadabra.png' },
    stories: {
      intro: 'A Shadow Wolf, known as The Grand Wizard Kadabra. Defeat him and he has a high chance of dropping rare swag. But there is a 1 in 4 chance you lose and he takes your Hat.',
      success: ''
    },
    swag: {
      chances: {
        [SWAG_TIERS.basic]: 100,
        [SWAG_TIERS.rare]: 15,
        [SWAG_TIERS.unique]: 7
      },
      collections: [SWAG_COLLECTIONS.coolcats],
      types: [...Object.values(SWAG_TYPES)]
    },
    requirements: [],
    risks: [{ script: '25% Chance of Losing Hat' }],
    rewards: [{ script: 'Increase to Magic Find' }, {
      type: MODIFIER_TYPES.rolls,
      isWeighted: true,
      script: 'Chance to gain +1 roll',
      weights: {
        // minustwo: 10,
        one: 75,
        zero: 25
      },
      options: {
        one: { value: 1, script: '+1 Roll!' },
        zero: { value: 0, script: 'No roll decrease' }
      }
    }],
    custom: {
      handle: () => {
        const rand = Math.floor(Math.random() * 4)
        const shouldHandle = [true, false, false, false][rand]
        return shouldHandle
      },
      Stage: () => {
        return (
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            minH='100%'
            mx='auto'
            boxSizing='border-box'
            p='15px'
          >
            <div
              className={styles.circlePath} style={{
                position: 'absolute',
                top: '50%',
                right: '50%',
                transform: 'translateY(-315px) translateX(-180px)'
              }}
            >
              <div className={styles.floating}>
                <img src='/bosses/CAP_STOLEN.png' alt='Stolen Cap' width='100%' />
              </div>
            </div>
            <div
              className={styles.zoomContainer} style={{
                position: 'absolute',
                top: '50%',
                right: '50%',
                transform: 'translateY(-5px) translateX(100px) scale(1.5)'
              }}
            >
              <div className={styles.zoom}>
                <img src='/bosses/CAP_STOLEN2.png' alt='Cap 3' width='100%' />
              </div>
            </div>
            <Image src='/bosses/kadabra.gif' alt='Kadabra' width='300px' />
            <Menu chat='Oh dear, looks like you have permanently lost your hat' />
            <div style={{
              position: 'absolute',
              top: '50%',
              right: '50%',
              transform: 'translateY(-100px) translateX(200px)'
            }}
            >
              <div className={styles.levitate}>
                <img src='/bosses/CAP_STOLEN4.png' alt='hat' width='100%' />
              </div>
            </div>
          </Box>
        )
      }
    },
    chances: {
      rollsplus: 1,
      swagloss: -3
    }
  },
  {
    id: 'apecat',
    name: 'Ape Cat',
    tier: 2,
    cta: 'Get Facelift',
    img: { default: '/bosses/demonape.png' },
    stories: {
      intro: 'Sour face gives facelifts',
      success: ''
    },
    swag: {
      chances: {
        [SWAG_TIERS.basic]: 69,
        [SWAG_TIERS.rare]: 20
      },
      collections: [...Object.values(SWAG_COLLECTIONS)],
      types: ['Face']
    },
    requirements: [],
    risks: [],
    rewards: []
  },
  {
    id: 'demonbones',
    name: 'Demon Bones',
    tier: 3,
    cta: 'Make Demon Deal',
    img: { default: '/bosses/demonbones.png' },
    stories: {
      intro: 'Demon Bones is the guardian of epic loot',
      success: ''
    },
    swag: {
      chances: {
        [SWAG_TIERS.rare]: 90,
        [SWAG_TIERS.unique]: 10
      },
      collections: [...Object.values(SWAG_COLLECTIONS)],
      types: [...Object.values(SWAG_TYPES)]
    },
    requirements: [],
    risks: [],
    rewards: []
  },
  {
    id: 'cowboy',
    name: 'Crafting Cowboy',
    tier: 3,
    cta: 'Craft',
    img: { default: '/bosses/cowboy.png' },
    stories: {
      intro: 'Turn the stuff you don\'t want into stuff you do want',
      success: ''
    },
    swag: {
      chances: {
        [SWAG_TIERS.basic]: 100,
        [SWAG_TIERS.rare]: 15,
        [SWAG_TIERS.unique]: 5
      },
      collections: [...Object.values(SWAG_COLLECTIONS)],
      types: [...Object.values(SWAG_TYPES)]
    },
    requirements: ['Three swag items'],
    risks: [],
    rewards: [{
      type: MODIFIER_TYPES.rolls,
      isWeighted: true,
      script: 'chance for +1 - 4 rolls',
      weights: {
        pluszero: 10,
        plusone: 20,
        plustwo: 30,
        plusthree: 40,
        plusfour: 30
      },
      options: {
        pluszero: { value: 0, script: 'No additional rolls' },
        plusone: { value: 1, script: '+1 Roll!' },
        plustwo: { value: 2, script: '+2 Roll!' },
        plusthree: { value: 3, script: '+3 Roll!' },
        plusfour: { value: 4, script: '+4 Roll!' }
      }
    }],
    chances: {
      rollsplus: 3
      // rollsminus: 0,
      // swagloss: -3
    }
  }

]

const bossmap = bosslist.reduce((list, $) => ({
  [$.id]: $
}))

export default {
  list: bosslist,
  map: bossmap
}
