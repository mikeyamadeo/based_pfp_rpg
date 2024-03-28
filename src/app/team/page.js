'use client'
import { useState, useEffect } from 'react'
import { Image, Box, SimpleGrid, Spinner, Center, HStack, VStack, Text, Tag, Skeleton, Container, Button } from '@chakra-ui/react'
import { getBackgroundColor } from '@data/pfp'
import Link from 'next/link'
import api from '../../api/'

export default function Page () {
  const [team, setTeam] = useState([])
  // const [data, setData] = useState(null)

  useEffect(() => {
    async function fetchData () {
      const data = await api.team.load()

      setTeam(data)
    }
    fetchData()
  }, [])

  return (
    <>
      <Container px={4} position='relative' bg='primary' minHeight='100vh' h='100%' w='100%'>

        <VStack py={5} w='100%'>

          <SimpleGrid spacing={5} columns={{ sm: 1, md: 4, lg: 6, xl: 6 }}>
            {team.map((member, i) => (
              <Link key={i} href={`/profile?userId=${member.id}`}>

                <Member {...member} />
              </Link>
            ))}
          </SimpleGrid>

        </VStack>
      </Container>
    </>
  )
}

const Member = ({ firstName, lastName, start, title, ...$ }) => {
  const size = '250px'
  const bg = getBackgroundColor({ start, ...$ })
  const isLoaded = !!$.shirt.id
  return (
    <Box>

      <Box bg='bg' w={size} borderRadius='12px' overflow='hidden'>
        <Center w={size} h={size} bg={bg}>
          {isLoaded
            ? (
              <Character bg={bg} {...$} size={size} />
              )
            : <Spinner />}
        </Center>

        <Center h='50px' bg='white' color='black'>
          <VStack spacing={0}>
            <Text fontSize='2xl' as='b'>{firstName} {lastName}</Text>
          </VStack>
        </Center>
      </Box>

    </Box>
  )
}

const Character = ({ bg, shirt, base, face, hat, size = '250px' }) => {
  console.log({ shirt, face, base, hat })
  return (
    <HStack align='top'>

      <Box position='relative' w={size} h={size} bg={bg}>
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

    </HStack>
  )
}
