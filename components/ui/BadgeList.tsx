import { Box, Table, Tbody, Td, Th, Thead, Tr, Text, Flex } from '@chakra-ui/react'
import { PortfolioBadgeData } from '../data/PortfolioData'

type Props = {
  portfolioBadges: PortfolioBadgeData[],
  selectedConsumer: string,
}

export const BadgeList = ({ portfolioBadges, selectedConsumer }: Props) => {
  return (
    <>
      {/** desktop */}
      <Flex
        display={{ base: "none", sm: "flex" }}
        w="full"
        justify={"space-between"}
        direction={"row"}
        alignItems={"flex-end"}
      >
        <Box borderWidth='1px' rounded='md' bg='white'>
          <Table variant='simple'>
            <Thead position='sticky' top={-1} zIndex='docked'>
              <Tr bg='gray.100'>
                <Th whiteSpace='nowrap' borderWidth='1px' bg='green.400' color='#262626' fontSize='md' textAlign='center'>指標</Th>
                <Th whiteSpace='nowrap' borderWidth='1px' bg='green.400' color='#262626' fontSize='md' textAlign='center'>能力バッジ名</Th>
                <Th whiteSpace='nowrap' borderWidth='1px' bg='gray.200' color='#262626' fontSize='md' textAlign='center'>取得可能</Th>
                <Th whiteSpace='nowrap' borderWidth='1px' bg='gray.200' color='#262626' fontSize='md' textAlign='center'>取得予定</Th>
                <Th whiteSpace='nowrap' borderWidth='1px' bg='gray.200' color='#262626' fontSize='md' textAlign='center'>獲得済み</Th>
                <Th whiteSpace='nowrap' borderWidth='1px' bg='gray.200' color='#262626' fontSize='md' textAlign='center'>能力バッジ概要</Th>
              </Tr>
            </Thead>
            <Tbody>
              {portfolioBadges.map((row, index) => (
                <Tr key={index} display={selectedConsumer == row.consumer_name ? 'table-row' : 'none'}>
                  <Td whiteSpace='nowrap' borderWidth='1px' borderColor='gray.200' bg='white'>
                    {row.consumer_name}
                  </Td>
                  <Td borderWidth='1px' borderColor='gray.200' bg='white'>
                    {row.wisdom_badges_name}
                  </Td>
                  <Td borderWidth='1px' borderColor='gray.200' bg='white'>
                    <Text textAlign='center'>{row.knowledge_badges_count}</Text>
                  </Td>
                  <Td borderWidth='1px' borderColor='gray.200' bg='white'>
                    <Text textAlign='center'>{row.scheduled_badges_count}</Text>
                  </Td>
                  <Td borderWidth='1px' borderColor='gray.200' bg='white'>
                    <Text textAlign='center'>{row.acquired_badges_count}</Text>
                  </Td>
                  <Td borderWidth='1px' borderColor='gray.200' bg='white'>
                    {row.wisdom_badges_description}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>

      {/** smart phone */}
      <Flex
        display={{ base: "flex", sm: "none" }}
        w="full"
        justify={"space-between"}
        direction={"column"}
        alignItems={"center"}
      >
        <Box borderWidth='1px' rounded='md' bg='white'>
          <Table variant='simple'>
            <Thead position='sticky' top={-1} zIndex='docked'>
              <Tr bg='gray.100'>
                <Th whiteSpace='nowrap' borderWidth='1px' bg='green.400' color='#262626' fontSize='md' textAlign='center'>指標</Th>
                <Th whiteSpace='nowrap' borderWidth='1px' bg='green.400' color='#262626' fontSize='md' textAlign='center'>能力バッジ名</Th>
              </Tr>
            </Thead>
            <Tbody>
              {portfolioBadges.map((row, index) => (
                <Tr key={index} display={selectedConsumer == row.consumer_name ? 'table-row' : 'none'}>
                  <Td whiteSpace='nowrap' borderWidth='1px' borderColor='gray.200' bg='white'>
                    {row.consumer_name}
                  </Td>
                  <Td borderWidth='1px' borderColor='gray.200' bg='white'>
                    {row.wisdom_badges_name}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </>
  )
}