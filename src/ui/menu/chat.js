import { Box, Text } from '@chakra-ui/react'
import useTypingEffect from './use-typing-effect'

const Chat = ({ text, typingSpeed = 40 }) => {
  const currentText = useTypingEffect(text, typingSpeed)
  return (
    <Box
      position='fixed'
      bottom='105px'
      left='50%'
      maxW='650px'
      w='95vw'
      p='20px'
      backgroundColor='rgba(21, 0, 75, 0.9)'
      borderRadius='15px'
      transform='translateX(-50%)'
      boxSizing='border-box'
      textAlign='center'
      zIndex={1}
    >
      {/* Added triangle box */}
      <Box
        position='absolute'
        bottom='-20px'
        left='50%'
        w='0'
        h='0'
        borderLeft='15px solid transparent'
        borderRight='15px solid transparent'
        borderTop='20px solid rgba(21, 0, 75, 0.3)'
        transform='translateX(-50%)'
      />
      <Text
        w='100%'
        fontFamily="'Open Sans'"
        m='0'
        color='#ffffff'
        fontSize='18px'
        lineHeight='1.4'
        whiteSpace='pre-wrap'
      >
        {currentText}
      </Text>
    </Box>
  )
}

export default Chat
