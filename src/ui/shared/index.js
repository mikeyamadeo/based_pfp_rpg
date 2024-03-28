import { Box, Flex, VStack, HStack, Text } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

export const Metatag = ({ label, value }) => (
  <VStack borderRadius='12px' bg='white' border='solid 1px' p={3} borderColor='primary' w='100%'>
    <Text textTransform='uppercase' fontWeight='200'>{label}</Text>
    <Text fontWeight='bold'>{value}</Text>
  </VStack>
)

export const SplitContainer = ({ children }) => {
  return (
    <Flex
      width='100vw'
      height='100%'
      direction={{ base: 'column', md: 'row' }}
    >
      <Flex width={{ base: '100%', md: '50%' }} justify='center'>
        {children[0]}
      </Flex>
      <Flex width={{ base: '100%', md: '50%' }} justify='center'>
        {children[1]}
      </Flex>
    </Flex>
  )
}

export const RoundedMenu = ({ children, onClose }) => (
  <VStack
    m={3} w='100%' borderRadius='12px' bg='#f4f6fe'
    p={4}
  >
    <HStack w='100%' pt={8} pr={10} justify='end'>
      <Box onClick={onClose} cursor='pointer'>
        <CloseIcon boxSize={7} />
      </Box>

    </HStack>
    {children}
  </VStack>
)
