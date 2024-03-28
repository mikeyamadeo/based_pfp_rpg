'use client'
import { useState, useEffect } from 'react'
import {
  Flex,
  Image,
  Box,
  SimpleGrid,
  Spinner,
  HStack,
  VStack,
  Text,
  Container,
  Tabs,
  TabList,
  TabPanels,
  TabPanel
} from '@chakra-ui/react'
import { getBackgroundColor } from '@data/pfp'
import api from '../../api/'
import { useSearchParams } from 'next/navigation'
import { CheckIcon } from '@chakra-ui/icons'
import { FaHatWizard, FaShirt, FaFaceSmile } from 'react-icons/fa6'
import { keyframes } from '@emotion/react'
const spin = keyframes`
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
`

const ItemBox = ({ onClick, size = '150px', isActive, ...item }) => {
  const rarityToColor = {
    Basic: '#e2c4a2',
    Rare: '#ffcf00',
    Unique: '#aa6ae4'
  }
  const color = rarityToColor[item.rarity] || 'gray.200'

  return (
    <Box position='relative' style={{ cursor: 'pointer' }}>
      {/* {isActive && (
        <Flex justify='center' zIndex={1} align='center' position='absolute' top='-1' right='-1' bg='green.500' w='25px' h='25px' borderRadius='50%'>
          <CheckIcon w={4} h={4} color='white' />
        </Flex>
      )} */}
      <VStack
        onClick={onClick}
        borderWidth='5px'
        borderRadius='lg'
        borderColor={color}
        boxShadow='md'
        width='175px'
        height='200px'
        position='relative'
        justify='end'
      >
        <HStack py={2}>
          {item.type === 'Hat' && <FaHatWizard />}
          {item.type === 'Shirt' && <FaShirt />}
          {item.type === 'Face' && <FaFaceSmile />}
          <Text as='b'>{item.name}</Text>
        </HStack>
        <Box
          width='90%'
          height='100%'
          position='relative'
          align='center'
          css={{
            animation: isActive ? `${spin} 5s infinite linear` : ''
          }}
        >
          <Box pos='absolute' bottom='0' left='0'>
            <Image src='/bases/OUTLINE_CODE_CAT.png' alt='base' />
          </Box>
          <Box pos='absolute' bottom='0' left='0'>
            <Image src={item.img.url} alt={item.name} />
          </Box>
        </Box>
      </VStack>
    </Box>
  )
}

function CharacterCustomizer (profile) {
  const [stash, setStash] = useState([])

  const [active, setActive] = useState({
    bg: getBackgroundColor(profile),
    shirt: profile.shirt,
    hat: profile.hat,
    face: profile.face,
    base: profile.base
  })

  const updateActive = (key, item) => {
    setActive(($) => ({
      ...$,
      [key]: item
    }))
  }

  useEffect(() => {
    const stashIds = [
      ...profile.shirtIds,
      ...profile.hatIds,
      ...profile.faceIds
    ]
    async function fetchData () {
      const data = await api.traits.find(stashIds)

      const _stash = data.reduce((_, item) => {
        const type = item.type.toLowerCase()
        const key = type + 's'
        return {
          ..._,
          [key]: [...(_[key] || []), item]
        }
      }, {})

      setStash(_stash)
    }

    fetchData()
  }, [])

  const size = '610px'
  const dimensions = {
    width: '100%',
    maxWidth: size,
    height: '100%',
    maxHeight: size
  }
  return (
    <Flex w='100%' h='100vh' gap={4} justify='center' align='center'>
      <Box flex='1' {...dimensions}>
        {/* Character Image */}
        <Character {...active} size='100%' />
      </Box>

      <Box
        flex='1'
        bg='white'
        overflow='scroll'
        {...dimensions}
        border='solid 1px #E6EBED'
        borderRadius='12px'
      >
        {/* Stash Tabs */}
        <Tabs isFitted variant='enclosed'>
          <TabList>
            {/* <HStack gap={4} h='70px' px={4}>

              <Tab>Hat</Tab>
              <Tab>Shirt</Tab>

            </HStack> */}
          </TabList>
          <TabPanels>
            <TabPanel>
              <SimpleGrid columns={3} spacing={5} p={4}>
                {stash?.faces?.map(($) => {
                  return (
                    <ItemBox
                      isActive={active.face.id === $.id}
                      onClick={() => updateActive('face', $)}
                      key={$.id}
                      {...$}
                    />
                  )
                })}
                {stash?.shirts?.map(($) => {
                  console.log({ activeId: active.shirt.id, id: $.id })
                  return (
                    <ItemBox
                      isActive={active.shirt.id === $.id}
                      onClick={() => updateActive('shirt', $)}
                      key={$.id}
                      {...$}
                    />
                  )
                })}
                {stash?.hats?.map(($) => {
                  return (
                    <ItemBox
                      isActive={active.hat.id === $.id}
                      onClick={() => updateActive('hat', $)}
                      key={$.id}
                      {...$}
                    />
                  )
                })}
              </SimpleGrid>
            </TabPanel>
            <TabPanel />
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  )
}

export default function Page () {
  const search = useSearchParams()
  const [profile, setProfile] = useState()

  useEffect(() => {
    const userId = search.get('userId')

    async function fetchData () {
      const data = await api.team.find({ userId })
      setProfile(data)
    }
    fetchData()
  }, [])

  const isLoaded = !!profile

  return (
    <>
      <Container
        px={4}
        position='relative'
        bg='#28008f'
        minHeight='100vh'
        h='100%'
        w='100%'
      >
        <VStack py={5} w='100%'>
          {!isLoaded && <Spinner />}
          {isLoaded && <CharacterCustomizer {...profile} />}
        </VStack>
      </Container>
    </>
  )
}

const Character = ({ bg, shirt, base, face, hat, size = '250px' }) => {
  return (
    <Box position='relative' w={size} h={size} bg={bg} borderRadius='6px'>
      <Box pos='absolute' top='0' left='0'>
        <Image src={base.url} alt={base.name} />
      </Box>
      <Box pos='absolute' top='0' left='0'>
        <Image src={shirt.url} alt={shirt.name} />
      </Box>

      <Box pos='absolute' top='0' left='0'>
        <Image src={face.url} alt={face.name} />
      </Box>
      <Box pos='absolute' top='0' left='0'>
        <Image src={hat.url} alt={hat.name} />
      </Box>
    </Box>
  )
}
