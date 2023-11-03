import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaUserAlt } from "react-icons/fa";

import React from "react";

type Props = {
  onOpen: () => void;
};

export const Header: React.FC<Props> = ({ onOpen }) => {
  // TODO: ログインユーザーの情報を取得する
  const userName = "○○太郎";
  return (
    <Box>
      <Flex
        h={"64px"}
        alignItems={"center"}
        justifyContent={"space-between"}
        backgroundColor={"gray.200"}
        p={{ base: 8 }}
      >
        <Box>
        </Box>
        <NextLink href="/e-portfolio">
          <Text fontSize={"2xl"} fontWeight={"bold"}>e-ポートフォリオ</Text>
        </NextLink>
        <Flex gap={"16px"} alignItems={"center"} display={{ base: "none", sm: "flex" }}>
          <FaUserAlt />
          <Text fontSize={"xl"}>{userName}</Text>
        </Flex>
      </Flex>
    </Box>
  );
};
