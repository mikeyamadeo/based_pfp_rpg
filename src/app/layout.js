'use client'
// import Head from 'next/head'
import { ChakraBaseProvider, Box } from '@chakra-ui/react'
// import './globals.css'
import theme from '@ui/theme'

// export const metadata = {
//   title: '🥄 ✨ Boostly pfp',
//   description: '🥄 ✨ Boostly pfp'
// }

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body>
        <Box minHeight='100vh' bg='white'>
          <ChakraBaseProvider theme={theme}>
            {children}
          </ChakraBaseProvider>
        </Box>
      </body>
    </html>
  )
}
