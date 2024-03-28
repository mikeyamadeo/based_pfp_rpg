import { Box, VStack, Text, Image, SimpleGrid, HStack } from '@chakra-ui/react'
import { useState } from 'react'
import { SplitContainer, RoundedMenu, Metatag } from '@ui/shared'
import Menu from '@ui/menu'
import LootDisplay from '@ui/loot-display'
import { FaHatWizard, FaShirt, FaFaceSmile, FaDiceOne, FaSkull, FaDiceSix } from 'react-icons/fa6'

const INTRO_CHAT = 'To get new swag, you’ll have to go through one of these characters. I wonder what kind of swag you can get them to drop.'

const rarityToColor = {
  Basic: '#e2c4a2',
  Rare: '#ffcf00',
  Unique: '#aa6ae4'
}
const tierToColor = {
  1: '#e2c4a2',
  2: '#ffcf00',
  3: '#aa6ae4',
  '-1': 'orange',
  '-2': 'orange',
  '-3': 'red'
}
const chanceTypeToIcon = {
  rollsplus: FaDiceSix,
  rollsminus: FaDiceOne,
  swagloss: FaSkull
}
const BossMenu = ({ options, getSwagOptions, onSelect }) => {
  const [selected, setSelected] = useState(null)

  const onBossSelect = () => {
    onSelect(selected)
  }

  const chat = selected
    ? '' /* selected.stories.intro */
    : '' /* INTRO_CHAT */

  return (
    <HStack justify='center'>
      {!selected && (
        <HStack pt='5%'>

          <SimpleGrid columns={3} spacing={5} maxWidth='1200px' margin='0 auto'>
            {options.map(boss => {
              const swagChances = calculateChances(boss.swag.chances)
              console.log(boss)
              return (
                <Box
                  key={boss.id} onClick={() => setSelected(boss)}
                  cursor='pointer'
                  border={`solid 5px ${tierToColor[boss.tier]}`}
                  width='350px'
                  height='275px'
                  borderRadius='12px'
                  px={4} py={2}
                >
                  <HStack h='100%'>
                    <VStack justify='end' w='60%' h='100%' pb={1}>
                      <Image src={boss.img.default} alt={`${boss.name} boss`} width='200px' />
                      <Text fontSize='xl' as='b'>
                        {boss.name}
                      </Text>
                    </VStack>
                    <VStack w='40%' h='100%' px={2} pt={4} gap={3} align='left'>
                      {/*  */}
                      <VStack align='left'>
                        <Text>Rarity Odds</Text>
                        <HStack align='left'>

                          {Object.keys(swagChances).map(key => {
                            const color = rarityToColor[key]
                            const label = swagChances[key].toFixed(0)
                            return (
                              <HStack key={key} w='30px' h='30px' bg={color} borderRadius='50%' color='white' justify='center'>
                                <Text as='b'>{label}</Text>
                              </HStack>
                            )
                          })}
                        </HStack>
                      </VStack>
                      <VStack align='left'>
                        <Text>Swag Types</Text>
                        <HStack align='left'>
                          {boss.swag.types.map(type => {
                            return (
                              <div key={type}>
                                {type === 'Hat' && <FaHatWizard size='25px' />}
                                {type === 'Shirt' && <FaShirt size='25px' />}
                                {type === 'Face' && <FaFaceSmile size='25px' />}
                              </div>
                            )
                          })}
                        </HStack>
                      </VStack>
                      <VStack align='left'>
                        <Text>Chance</Text>
                        <HStack align='left'>
                          {Object.keys(boss.chances || []).map(key => {
                            const Icon = chanceTypeToIcon[key]
                            const color = tierToColor[boss.chances[key]]
                            console.log({ color })
                            return (
                              <Icon key={key} size='25px' style={{ color }} />
                            )
                          })}
                        </HStack>
                      </VStack>
                    </VStack>

                  </HStack>
                </Box>
              )
            })}
          </SimpleGrid>
        </HStack>
      )}

      {selected && (
        <Boss {...selected} getSwagOptions={getSwagOptions} onClose={() => setSelected()} />
      )}

      <Menu chat={chat} cta={selected?.cta} action={onBossSelect} />

    </HStack>
  )
}

const Boss = ({ onClose, getSwagOptions, ...boss }) => {
  const swagChances = calculateChances(boss.swag.chances)
  const options = getSwagOptions(boss)
  const tags = [
    {
      label: 'Swag Tier Chances',
      value: Object.keys(swagChances)
        .map(key => `${key}: ${swagChances[key].toFixed(0)}%`)
        .join(', ')
    },
    {
      label: 'Collections',
      value: boss.swag.collections.join(', ').replace('_', ' ')
    },
    {
      label: 'Requirements',
      value: boss.requirements.length ? boss.requirements[0] : 'None'
    },
    {
      label: 'Risks',
      value: boss.risks.length ? boss.risks[0].script : 'None'
    },
    {
      label: 'Rewards',
      value: boss.rewards.length ? boss.rewards[0].script : 'None'
    }
  ]

  return (
    <SplitContainer>
      <VStack pb={12} align='center' style={{ overflow: 'scroll' }} width='100%'>
        <VStack align='center' py={4}>
          <Text fontSize='xl' as='b'>{`${boss.name} Loot Table`}</Text>
        </VStack>
        <SimpleGrid spacing={3} columns={{ sm: 1, md: 4, lg: 6, xl: 6 }}>
          {options.map((item, i) => (
            <Box key={i} style={{ position: 'relative' }}>
              <Text position='absolute' top='0' right='0'>{Number(swagChances[item.rarity]).toFixed()}%</Text>
              <LootDisplay {...item} size='125px' titleSize='m' subTitleSize='m' />
            </Box>
          ))}
        </SimpleGrid>
      </VStack>

      <RoundedMenu onClose={onClose}>
        <VStack py={2}>
          <Image src={boss.img.default} alt={`${boss.name} boss`} width='100px' />
          <Text fontSize='3xl'>{boss.name}</Text>
        </VStack>
        <VStack maxWidth='550px' w='100%' gap={3} style={{ overflow: 'scroll' }}>
          {tags.map((tag) => {
            return <Metatag key={tag.label} label={tag.label} value={tag.value} />
          })}
        </VStack>
      </RoundedMenu>
    </SplitContainer>
  )
}

export default BossMenu

const calculateChances = (weights) => {
  let totalWeight = 0
  const chances = {}

  // calculate the total weight
  for (const item in weights) {
    totalWeight += weights[item]
  }

  // calculate percentage chance for each item
  for (const item in weights) {
    chances[item] = (weights[item] / totalWeight) * 100
  }

  return chances
}
