import { useState, useEffect } from 'react'

const useTypingEffect = (text, typingSpeed = 100, delayBeforeTyping = 0) => {
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    let timeouts = []
    let cursor = 0

    const clearAllTimeouts = () => {
      timeouts.forEach((timeout) => clearTimeout(timeout))
      timeouts = []
    }

    const type = () => {
      if (cursor < text.length) {
        setDisplayText((prevDisplayText) => prevDisplayText + text.charAt(cursor))
        cursor += 1
        timeouts.push(setTimeout(type, typingSpeed))
      }
    }

    clearAllTimeouts()
    setDisplayText('')
    timeouts.push(setTimeout(type, delayBeforeTyping))

    return () => clearAllTimeouts()
  }, [text, typingSpeed, delayBeforeTyping])

  return displayText
}

export default useTypingEffect
