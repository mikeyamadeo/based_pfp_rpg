'use client'
import {
  Image, Box, SimpleGrid, Center, VStack, Text
} from '@chakra-ui/react'
import Link from 'next/link'

export default function Home () {
  const size = '250px'
  const bg = 'white'
  return (
    <Center bg='primary' height='100vh'>
      <SimpleGrid spacing={3} columns={{ sm: 2, md: 2, lg: 4, xl: 4 }}>
        {[
          { img: '/bases/team.png', label: 'Team', path: 'team', bg: palette.beige },
          { img: '/bosses/demonapepfp.png', label: 'Quest', path: 'quest', bg: palette.red },
          { img: '/bases/OUTLINE_CODE_CAT.png', label: 'Spawn', path: 'spawn', bg: palette.yellow },
          { img: '/swag/rilla_loot.png', label: 'Loot', path: 'loot', bg: palette.purple }
        ].map((view, i) => (
          <Link key={view.label} href={`/${view.path}`}>
            <Box w={size} borderRadius='12px' overflow='hidden'>

              <Center w={size} h={size} bg='#EFE9FF'>
                <Image src={view.img} width={size} height={size} />
              </Center>

              <Center h='70px' bg={view.bg} color='white'>
                <VStack spacing={0}>
                  <Text fontSize='2xl' as='b'>{view.label}</Text>
                </VStack>
              </Center>
            </Box>
          </Link>

        ))}
      </SimpleGrid>
    </Center>
  )
}

const palette = {
  beige: '#e2c4a2',
  yellow: '#ffcf00',
  purple: '#aa6ae4',
  red: '#ff1167'
}
