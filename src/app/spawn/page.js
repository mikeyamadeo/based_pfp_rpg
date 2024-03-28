'use client'
import { Box, Image, Flex, Text, VStack, SimpleGrid, HStack } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { SplitContainer, RoundedMenu } from '@ui/shared'
import Menu from '@ui/menu'
import state from './state'

// import state from './state'
const Container = ({ children }) => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      minH='100%'
      mx='auto'
      boxSizing='border-box'
      p='15px'
      gap={2}
    >
      {children}
    </Box>
  )
}

const Main = () => {
  const { traits } = state.use()
  const [stage, setStage] = useState('DETAILS')
  console.log({ traits })
  return (
    <Box h='calc(100vh - 70px)'>
      {stage === 'DETAILS' && <SpawnDetails options={traits} />}
      {/* {stage === 'SPAWN' && <Spawn />} */}
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

const getRandomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

const SpawnDetails = ({ options, onSelect }) => {
  const [selected, setSelected] = useState(null)

  return (
    <>
      {!selected && (
        <>
          <Container>
            {[
              { name: 'Success Squatch', url: '/bases/OUTLINE_SQUATCH.png', img: { url: '/bases/SASS_SQUATCH.png' }, intro: 'Success Squatch, the MVP. They often carry the world on their shoulders' },
              { name: 'Growth Goblin', url: '/bases/OUTLINE_GROWTH_GOBLIN.png', img: { url: '/bases/GROWTH_GOBLIN.png' }, intro: 'Growth Goblins are vital members of the team. Some say the "life blood". They are well respected members of the Order' },
              { name: 'Code Cat', url: '/bases/OUTLINE_CODE_CAT.png', img: { url: '/bases/CODE_CAT.png' }, intro: 'These cats build. Sometimes considered wizards' }
            ].map($ => (
              <Box key={$.name} onClick={() => setSelected($)} cursor='pointer' border='solid 1px' borderColor='primary'>
                <Image src={$.url} alt={`${$.name}`} width='300px' />
              </Box>
            ))}
          </Container>
          <Menu chat='What role do we want to spawn?' />
        </>
      )}

      {selected && (
        <SetupData {...selected} onClose={() => setSelected()} options={options} />
      )}

    </>
  )
}

const Character = ({ bg = '#e2c4a2', shirt, base, face, hat, size = '250px' }) => {
  return (
    <HStack align='top' pb={15}>

      <Box position='relative' w={size} h={size} bg={bg}>
        <Box pos='absolute' top='0' left='0'>
          <Image src={base.img.url} alt={base.name} />
        </Box>

        <Box pos='absolute' top='0' left='0'>
          <Image src={shirt.img.url} alt={shirt.name} />
        </Box>
        <Box pos='absolute' top='0' left='0'>
          <Image src={hat.img.url} alt={hat.name} />
        </Box>
        <Box pos='absolute' top='0' left='0'>
          <Image src={face.img.url} alt={face.name} />
        </Box>
      </Box>
      {/* <VStack align='left'>
        {[head, face, hat, shirt].map(trait => console.log({ trait }) || (
          <Tag size='lg' key={trait.id} variant='solid' colorScheme='teal'>
            {trait.type}: {trait.name}
          </Tag>
        ))}
      </VStack> */}

    </HStack>
  )
}

const SetupData = ({ options, onSpawn, onClose, ...base }) => {
  const [rolls, setRolls] = useState([])

  // const onBossSelect = () => {
  //   onSelect(selected)
  // }
  useEffect(() => {
    const _ = []
    ;[1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(() => {
      _.push({
        base,
        face: getRandomElement(options.faces),
        shirt: getRandomElement(options.shirts),
        hat: getRandomElement(options.hats)

      })
      setRolls(_)
    })
  }, [])

  console.log({ rolls })
  const [values, setValues] = useState({
    first: '',
    last: '',
    title: ''
  })

  const handleCreate = () => {

  }

  const handleChange = (key) => (e) => {
    setValues($ => ({
      ...$,
      [key]: e.target.value
    }))
  }

  const inputs = [
    { label: 'First Name', id: 'first' },
    { label: 'Last Name', id: 'last' },
    { label: 'Title', id: 'title' }
  ]

  return (
    <>
      {/* <SplitContainer>
        <Flex justify='center' align='center'>
          <Box border='solid 1px' borderColor='primary'>

            <Image src={base.url} alt={`${base.name} base`} width='500px' />
          </Box>
        </Flex>

        <RoundedMenu onClose={onClose}>
          <Flex py={2}>
            <Text fontSize='3xl'>{base.name}</Text>
          </Flex>
          <VStack maxWidth='350px' w='100%' gap={3} align='start'> */}
      {/* {inputs.map((inp) => {
              return (
                <VStack key={inp.id} align='start' w='100%'>
                  <Text>{inp.label}</Text>
                  <Input bg='white' value={values[inp.id]} onChange={handleChange(inp.id)} />
                </VStack>
              )
            })} */}
      <VStack>

        <SimpleGrid spacing={5} columns={{ sm: 1, md: 3, lg: 3, xl: 3 }}>
          {rolls.map((roll, i) => (
            <Character key={i} {...roll} />
          ))}
        </SimpleGrid>
      </VStack>
      <Box h='40px' />
      {/* </VStack>
        </RoundedMenu>
      </SplitContainer> */}
      <Menu chat='' cta='Spawn' action={handleCreate} />
    </>
  )
}
