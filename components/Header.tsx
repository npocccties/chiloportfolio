import { Box, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaUserAlt } from "react-icons/fa";
import { MdHelp } from "react-icons/md";
import { getCookieValue } from "@/lib/cookie";
import { getUserInfoFormJwt } from "@/lib/userInfo";
import React, { useEffect, useState } from "react";

const serviceName = process.env.NEXT_PUBLIC_SERVICE_NAME as string
const helpLink = process.env.NEXT_PUBLIC_HELP_LINK as string

type Props = {
  onOpen: () => void;
};

export const Header: React.FC<Props> = ({ onOpen }) => {
  const [userName, setUserName] = useState('Unknown')

  useEffect(() => {
    var errorDetail = ''
    const session_cookie = getCookieValue("session_cookie");
    if (!session_cookie) {
      errorDetail = 'Not found session_cookie.'
    } else {
      const userInfo = getUserInfoFormJwt(session_cookie);
      if (!userInfo) {
        errorDetail = 'Failed to decode.'
      } else {
        setUserName(userInfo.displayName)
      }
    }
    if (errorDetail) {
      console.log(errorDetail)
    }
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
        <Box
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <NextLink href="/">
            <Text fontSize={"2xl"} fontWeight={"bold"} style={{ textDecoration: "none" }}>
              {serviceName}
            </Text>
          </NextLink>
        </Box>
        <Box >
          <Flex gap={"16px"} alignItems={"center"} display={{ base: "none", sm: "flex" }}>
            <MdHelp size="24" />
            <NextLink href={helpLink}>ヘルプ</NextLink>
            <FaUserAlt />
            <Text fontSize={"xl"}>{userName}</Text>
          </Flex>
          <Flex gap={"16px"} alignItems={"center"} display={{ base: "flex", sm: "none" }}>
            <Link href={helpLink}><MdHelp size="24" /></Link>
            <Menu>
              <MenuButton cursor={"pointer"} minW={0} transition="all 1s">
                <FaUserAlt />
              </MenuButton>
              <MenuList>
                <MenuItem>{userName}</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
