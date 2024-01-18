import { Box, Table, Tbody, Td, Th, Thead, Tr, Text, Flex } from "@chakra-ui/react";

import { headerColor, textColor, whiteTextColor } from "@/constants/color";

import { PortfolioBadgeData } from "../../models/PortfolioData";

type Props = {
  portfolioBadges: PortfolioBadgeData[];
  columnName1: string;
};

export const BadgeList = ({ columnName1, portfolioBadges }: Props) => {
  return (
    <>
      {/** desktop */}
      <Flex
        display={{ base: "none", md: "flex" }}
        w="full"
        justify={"space-between"}
        direction={"row"}
        alignItems={"flex-end"}
      >
        <Table id="badge-list" variant="simple">
          <Thead position="sticky" top={-1} zIndex="docked">
            <Tr bg={headerColor}>
              <Th whiteSpace="nowrap" w="52" borderWidth="1px" color={whiteTextColor} fontSize="md" textAlign="center">
                {columnName1}
              </Th>
              <Th whiteSpace="nowrap" w="52" borderWidth="1px" color={whiteTextColor} fontSize="md" textAlign="center">
                能力バッジ名
              </Th>
              <Th whiteSpace="nowrap" borderWidth="1px" color={whiteTextColor} fontSize="md" textAlign="center">
                取得可能
              </Th>
              <Th whiteSpace="nowrap" borderWidth="1px" color={whiteTextColor} fontSize="md" textAlign="center">
                取得済み
              </Th>
              <Th whiteSpace="nowrap" borderWidth="1px" color={whiteTextColor} fontSize="md" textAlign="center">
                能力バッジ概要
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {portfolioBadges.map((row, index) => (
              <Tr key={index}>
                <Td borderWidth="1px" borderColor="gray.200" bg="white">
                  {row.field1_name}
                </Td>
                <Td borderWidth="1px" borderColor="gray.200" bg="white">
                  {row.wisdom_badges_name}
                </Td>
                <Td borderWidth="1px" borderColor="gray.200" bg="white">
                  <Text color={textColor} textAlign="center">
                    {row.knowledge_badges_count != 0 ? row.knowledge_badges_count : "-"}
                  </Text>
                </Td>
                <Td borderWidth="1px" borderColor="gray.200" bg="white">
                  <Text color={textColor} textAlign="center">
                    {row.knowledge_badges_count != 0 ? row.acquired_badges_count : "-"}
                  </Text>
                </Td>
                <Td borderWidth="1px" borderColor="gray.200" bg="white" color={textColor}>
                  {row.wisdom_badges_description}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>

      {/** smart phone */}
      <Flex
        display={{ base: "flex", md: "none" }}
        w="full"
        justify={"space-between"}
        direction={"column"}
        alignItems={"center"}
      >
        <Table id="badge-list" variant="simple">
          <Thead position="sticky" top={-1} zIndex="docked">
            <Tr bg={headerColor}>
              <Th whiteSpace="nowrap" borderWidth="1px" color={whiteTextColor} fontSize="md" textAlign="center">
                {columnName1}
              </Th>
              <Th whiteSpace="nowrap" borderWidth="1px" color={whiteTextColor} fontSize="md" textAlign="center">
                能力バッジ名
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {portfolioBadges.map((row, index) => (
              <Tr key={index}>
                <Td whiteSpace="nowrap" borderWidth="1px" borderColor="gray.200" bg="white">
                  {row.field1_name}
                </Td>
                <Td borderWidth="1px" borderColor="gray.200" bg="white">
                  {row.wisdom_badges_name}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
    </>
  );
};
