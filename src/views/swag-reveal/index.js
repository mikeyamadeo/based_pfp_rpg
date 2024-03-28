import { Flex, Image, Grid } from '@chakra-ui/react'
import { SplitContainer, RoundedMenu } from '@ui/shared'
import Menu from '@ui/menu'
import Display from '@ui/loot-display'

import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

const LesGoh = () => {
  const { width, height } = useWindowSize()

  return (
    <Confetti
      width={width}
      height={height}
    />
  )
}

const Main = ({ rolls, boss, onClose }) => {
  return (
    <>

      <SplitContainer>
        <Flex justify='center' align='center'>
          <Image src={boss.img.default} alt='Mikey Boss' width='300px' />
        </Flex>

        <RoundedMenu onClose={onClose}>
          <LesGoh />
          <Grid templateColumns='repeat(3, 1fr)' gap={6} pt={5}>
            {rolls.map(($, i) => (
              <Display key={i} {...$} />
            ))}
          </Grid>
        </RoundedMenu>
      </SplitContainer>
      <Menu />
    </>
  )
}

export default Main
