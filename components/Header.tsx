import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import Head from "next/head"

import React from "react";

type Props = {
  onOpen: () => void;
};

export const Header: React.FC<Props> = ({ onOpen }) => {
  return (
    <Box>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      </Head>
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
        <NextLink href="/">
          <Text fontSize={"2xl"} fontWeight={"bold"}>e-Portfolio</Text>
        </NextLink>
        <Flex gap={"16px"}></Flex>
      </Flex>
    </Box>
  );
};
