import {
  Image, Box, Spinner, Center, HStack, VStack, Text
} from '@chakra-ui/react'
const rarityToColor = {
  Basic: '#e2c4a2',
  Rare: '#ffcf00',
  Unique: '#aa6ae4'
}

const Display = ({ size = '250px', titleSize = 'xl', subTitleSize = 'lg', collection, name, img, rarity, type, ...$ }) => {
  // const size =
  const color = rarityToColor[rarity]
  const isLoaded = !!collection
  return (
    <Box>

      <Box bg='bg' w={size} borderRadius='12px' overflow='hidden'>
        <Center w={size} h={size} bg={color}>
          {isLoaded
            ? (
              <HStack align='top'>

                <Box width={size} height={size} position='relative' borderRadius='12px'>
                  <Box pos='absolute' top='0' left='0'>
                    <Image src='/bases/OUTLINE_CODE_CAT.png' alt='base' />
                  </Box>
                  <Box pos='absolute' top='0' left='0'>
                    <Image src={img.url} alt={name} />
                  </Box>
                </Box>

              </HStack>
              )
            : <Spinner />}
        </Center>

        <Center h='65px' bg='white' color='black'>
          <VStack spacing={0} justify='center'>
            <Text fontSize={titleSize} as='b'>{name}</Text>
            <Text fontSize={subTitleSize}>{collection}</Text>
          </VStack>
        </Center>
      </Box>

    </Box>
  )
}

export default Display
