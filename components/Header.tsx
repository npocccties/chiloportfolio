import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import NextLink from "next/link";

import React from "react";

type Props = {
  onOpen: () => void;
};

export const Header: React.FC<Props> = ({ onOpen }) => {
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
          <HamburgerIcon w={6} h={6} cursor={"pointer"} onClick={() => onOpen()} />
        </Box>
        <NextLink href="/e-portfolio">
          <Text fontSize={"2xl"} fontWeight={"bold"}>e-Portfolio</Text>
        </NextLink>
        <Flex gap={"16px"}></Flex>
      </Flex>
    </Box>
  );
};
