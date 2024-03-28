import { Flex, Box, Button, Image } from '@chakra-ui/react'
import Chat from './chat'

const Menu = ({ cta, chat, action }) => {
  return (
    <>
      {chat && <Chat text={'  ' + chat} />}
      <Flex
        position='fixed'
        bottom='0'
        left='0'
        h='70px'
        w='100%'
        bg='primary'
        justify='space-between'
        align='center'
        px={6}
      >
        <Box flex='1' display='flex' alignItems='center' pr='8'>
          <Image src='/logoiconwhite.svg' alt='Boostly Logo' boxSize='50px' />
        </Box>
        <Box flex='1' display='flex' justifyContent='center' alignItems='center' position='relative'>
          <Image src='/bluecatlogo.png' alt='Blue Cat Logo' boxSize='90px' position='absolute' bottom='-5' />
        </Box>
        <Box flex='1' display='flex' justifyContent='end' alignItems='center' pr='8'>
          {cta && <Button bg='secondary' onClick={action} w='151px' h='48px'>{cta}</Button>}
        </Box>
      </Flex>

    </>
  )
}

export default Menu
