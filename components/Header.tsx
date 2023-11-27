import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Center, Flex, Link, Spacer, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaUserAlt } from "react-icons/fa";

import React, { useEffect, useState } from "react";
import { getCookieValue } from "./lib/cookie";
import { getUserInfoFormJwt } from "./lib/userInfo";

const serviceName = process.env.NEXT_PUBLIC_SERVICE_NAME as string

type Props = {
  onOpen: () => void;
};

export const Header: React.FC<Props> = ({ onOpen }) => {

  var displayName = 'Unknown'
  if (process.browser) {
    var errorDetail = ''
    const session_cookie = getCookieValue("session_cookie");
    if (!session_cookie) {
      errorDetail = 'Not found session_cookie.'
    } else {
      const userInfo = getUserInfoFormJwt(session_cookie);
      if (!userInfo) {
        errorDetail = 'Failed to decode.'
      } else {
        displayName = userInfo.displayName
      }
    }
    if (errorDetail) {
      console.log(errorDetail)
    }
  }

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
          <Text fontSize={"xl"}>{displayName}</Text>
        </Flex>
        <Flex gap={"16px"} alignItems={"center"} display={{ base: "flex", sm: "none" }}>
        </Flex>
      </Flex>
    </Box>
  );
};
