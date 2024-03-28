'use client'
import api from '../../api/'
import { useState, useEffect } from 'react'
import {
  Image, Box, SimpleGrid, Accordion, AccordionItem, AccordionButton, AccordionPanel, Spinner, Center, HStack, VStack, Text, Container
} from '@chakra-ui/react'
import { SWAG_COLLECTIONS, SWAG_TYPES } from '../../data/_enums'
import { sortByRarity, sortByRarityAndType } from './utils'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import Display from '@ui/loot-display'

// const Swag = ({ img, rarity, name, size = '250px' }) => {
//   return (

//   )
// }

const filterBy = (prop) => (values, list) => {
  return list.filter(item => {
    const value = item[prop]
    if (values.some($ => $ === value)) {
      return true
    }
    return false
  })
}

const vals = ($) => Object.values($)
const filterByType = filterBy('type')
const NO_BASE_FILTER = ['Face', ...vals(SWAG_TYPES)]

const filterByCollection = filterBy('collection')

const FILTER_DEFAULTS = {
  types: {
    hat: true,
    shirt: true,
    face: true
  },
  collections: {
    coolcats: true,
    pokes: true
  },
  rarity: {
    basic: true,
    rare: true,
    unique: true
  }
}
// order

const useSwag = () => {
  const [swag, set] = useState([])
  useEffect(async () => {
    const $ = await api.traits.load()
    set($)
  }, [])
  return swag
}

export const LootDisplay = ({ swag }) => {
  // const [loot, setLoot] = useState([])
  const [collections, setCollections] = useState([])
  const [ACTIVE_PANEL, setActivePanel] = useState('')
  useEffect(() => {
    if (!swag) return
    // load from airtable
    async function fetchData () {
      const _swag = swag.filter($ => !!$.collection)

      const uniqueCollections = [...new Set(_swag.map(item => item.collection.toLowerCase()))]

      // Sort collections alphabetically
      uniqueCollections.sort()

      // For each collection, filter and sort the items
      const sortedCollection = uniqueCollections.flatMap(collectionName => {
        return _swag
          .filter(item => item.collection.toLowerCase() === collectionName)
          .sort(sortByRarityAndType)
      })

      const sortedCollections = uniqueCollections.map(collectionName => {
        return {
          name: collectionName,
          items: _swag
            .filter(item => item.collection.toLowerCase() === collectionName)
            .sort(sortByRarityAndType)
        }
      })

      const collections = [...new Set(sortedCollection.map(item => item.collection.toLowerCase()))]

      console.log({ collections })
      // setLoot(sortedCollection)
      setCollections(sortedCollections)
    }
    fetchData()
  }, [swag.length])

  const togglePanelOpen = (name) => {
    setActivePanel((active) => {
      if (active === name) {
        return ''
      }
      return name
    })
  }

  return (
    <>
      <Container p={4} width='100%' position='relative' bg='primary' minHeight='100vh' h='100%' w='100%'>

        <Accordion allowToggle borderRadius='25px' overflow='hidden'>
          {collections.map((collection) => {
            return (
              <AccordionItem key={collection.name} border='solid 1px rgba(18, 18, 18, 0.12)'>
                <h2>
                  <AccordionButton
                    p={5} bg='rgb(253, 253, 253)' _expanded={{ bg: '#8353FF', color: 'white' }}
                    borderRadius='md'
                    padding={4}
                    onClick={() => togglePanelOpen(collection.name)}
                  >
                    <Box flex='1' display='flex' alignItems='center'>
                      <Image src={collectionToLogo[collection.name.toLowerCase()]} boxSize='24px' marginRight={4} alt='Collection logo' />

                      {collection.name.toUpperCase()}
                    </Box>
                    <Box>
                      {collection.name === ACTIVE_PANEL ? <FaChevronUp boxsize={6} /> : <FaChevronDown boxsize={6} />}
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel p={4}>
                  {/* {collection.items.map((item, index) => (
                    <Text key={index}>
                      {item.name}
                    </Text>
                  ))} */}
                  <SimpleGrid spacing={3} columns={{ sm: 1, md: 4, lg: 6, xl: 6 }}>
                    {collection.items.map((item, i) => (
                      <Display key={i} {...item} />
                    ))}
                  </SimpleGrid>

                </AccordionPanel>
              </AccordionItem>
            )
          })}
        </Accordion>
        {/* <VStack py={5} w='100%'>

          <SimpleGrid spacing={3} columns={{ sm: 1, md: 4, lg: 6, xl: 6 }}>
            {loot.map((item, i) => (
              <Display key={i} {...item} />
            ))}
          </SimpleGrid>

        </VStack> */}
      </Container>
    </>
  )
}

const collectionToLogo = {
  'cool cats': '/bosses/mikey.png',
  pokemon: '/bosses/bulba.png',
  street: '/bosses/glitchman.png',
  based: '/bosses/demonape.png'
}

// categories
// - faces
// - collections
// - bases

const LootLoader = () => {
  const swag = useSwag()

  return <LootDisplay swag={swag} />
}

export default LootLoader
