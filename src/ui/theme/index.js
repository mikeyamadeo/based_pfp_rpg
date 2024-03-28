'use client'
import { extendBaseTheme } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'
import '@fontsource/figtree/400.css'

const { Spinner, SimpleGrid, Image, Heading, Text, Input, Button, Skeleton, Tag, Switch, Flex, Box } = chakraTheme.components
// picks up a nested color value using dot notation
// => `theme.colors.gray[50]`

const palette = {
  blue: '#28008f',
  blueDark: '#15004b',
  bluePurpleLight: '#f4f6fe',
  purpleLight: '#f7f4ff',
  goldLight: '#ebdda5',
  silverLight: '#e5e7eb'
}
export const colors = {
  buttonPrimary: palette.purpleLight,
  primary: palette.blueDark,
  magicSwag: palette.blue,
  rareSwag: palette.goldLight,
  uniqueSwag: palette.goldLight,
  secondary: '#f7f4ff'
}
const global = {
  'html, body': {
    backgroundColor: 'bg'
  }
}

const theme = extendBaseTheme({
  colors,
  components: {
    Image,
    Button,
    Text,
    Heading,
    Input,
    Skeleton,
    Tag,
    SimpleGrid,
    Switch,
    Spinner,
    Flex,
    Box
  },
  styles: {
    global
  },
  fonts: {
    heading: 'Figtree, sans-serif',
    body: 'Figtree, sans-serif'
  }
})

export default theme
