import { Box, ChakraProvider, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Text } from '@chakra-ui/react'
import { ConsumerBadges } from '../data/OkutepData'

type Props = {
    consumerBadges: ConsumerBadges[],
    selectedConsumer: string,
}

export const BadgeList = ({ consumerBadges, selectedConsumer }: Props) => {
    return (
    <Box borderWidth="1px" boxShadow='xl' p='6' rounded='md' bg='white'>
        <Table variant="simple">
            <Thead position="sticky" top={-1} zIndex="docked">
                <Tr bg="gray.100">
                    <Th whiteSpace="nowrap" borderWidth="1px" bg="green.400" color='#262626' fontSize='md' textAlign='center'>指標</Th>
                    <Th whiteSpace="nowrap" borderWidth="1px" bg="green.400" color='#262626' fontSize='md' textAlign='center'>能力バッジ名</Th>
                    <Th whiteSpace="nowrap" borderWidth="1px" bg="gray.200" color='#262626' fontSize='md' textAlign='center'>取得可能</Th>
                    <Th whiteSpace="nowrap" borderWidth="1px" bg="gray.200" color='#262626' fontSize='md' textAlign='center'>取得予定</Th>
                    <Th whiteSpace="nowrap" borderWidth="1px" bg="gray.200" color='#262626' fontSize='md' textAlign='center'>獲得済み</Th>
                    <Th whiteSpace="nowrap" borderWidth="1px" bg="gray.200" color='#262626' fontSize='md' textAlign='center'>能力バッジ概要</Th>
                </Tr>
            </Thead>
            <Tbody>
            {consumerBadges.map((row) => (
                <Tr  display={selectedConsumer == row.consumer_name ? 'table-row' : 'none'}>
                    <Td whiteSpace="nowrap" borderWidth="1px" borderColor="gray.200" bg="white">
                        {row.consumer_name}
                    </Td>
                    <Td borderWidth="1px" borderColor="gray.200" bg="white">
                        {row.wisdome_badges_name}
                    </Td>
                    <Td borderWidth="1px" borderColor="gray.200" bg="white">
                        <Text textAlign='center'>{row.knowledge_badges_count}</Text>
                    </Td>
                    <Td borderWidth="1px" borderColor="gray.200" bg="white">
                        <Text textAlign='center'>0</Text>
                    </Td>
                    <Td borderWidth="1px" borderColor="gray.200" bg="white">
                        <Text textAlign='center'>0</Text>
                    </Td>
                    <Td borderWidth="1px" borderColor="gray.200" bg="white">
                        {row.wisdome_badges_description}
                    </Td>
                </Tr>
            ))}
            </Tbody>
        </Table>
    </Box>
    )
}