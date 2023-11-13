import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Center, Flex, Link, Spacer, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaUserAlt } from "react-icons/fa";

import React, { useEffect, useState } from "react";
const serviceName = process.env.NEXT_PUBLIC_SERVICE_NAME as string

type Props = {
  onOpen: () => void;
};

export const Header: React.FC<Props> = ({ onOpen }) => {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const userName = window.localStorage.getItem('userName');
    setUserName(userName ?? '')
  }, [])

  return (
    <Box>
      <Flex
        h={"64px"}
        alignItems={"center"}
        justifyContent={"space-between"}
        backgroundColor={"gray.200"}
        p={{ base: 8 }}
      >
        <Box >
        </Box>
        <NextLink href="/">
          <Text fontSize={"2xl"} fontWeight={"bold"} style={{ textDecoration: "none" }}>
            {serviceName}
          </Text>
        </NextLink>
        <Flex gap={"16px"} alignItems={"center"} display={{ base: "none", sm: "flex" }}>
          <FaUserAlt />
          <Text fontSize={"xl"}>{userName}</Text>
        </Flex>
        <Flex gap={"16px"} alignItems={"center"} display={{ base: "flex", sm: "none" }}>
        </Flex>
      </Flex>
    </Box>
  );
};
