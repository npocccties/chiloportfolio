import { Box, Flex, Menu, MenuButton, MenuItem, MenuList, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaUserAlt } from "react-icons/fa";
import { MdHelp } from "react-icons/md";
import { BsWallet2 } from "react-icons/bs";
import { getCookieValue } from "@/lib/cookie";
import { getUserInfoFormJwt } from "@/lib/userInfo";
import React, { useEffect, useState } from "react";
import { headerColor, textColor, whiteTextColor } from "@/constants/color";
import { HamburgerIcon } from "@chakra-ui/icons";
import { linkStyle } from "@/constants/style";

const serviceName = process.env.NEXT_PUBLIC_SERVICE_NAME as string;
const helpLink = process.env.NEXT_PUBLIC_HELP_LINK as string;
const logoutLink = process.env.NEXT_PUBLIC_LOGOUT_LINK as string;
const walletUrl = process.env.NEXT_PUBLIC_WALLET_BASE_URL as string;

type Props = {
  showContents: boolean,
  onOpen: () => void;
};

export const Header: React.FC<Props> = ({ showContents, onOpen }) => {
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
  console.log('logoutLink:', logoutLink)

  return (
    <Box as="header" w={"100%"} zIndex={1000} bg={headerColor} color={whiteTextColor}>
      <Flex h={"64px"} alignItems={"center"} justifyContent={"space-between"} p={{ base: 8 }}>
        <Box>
          <Flex gap={2} alignItems={"center"}>
            <Link href={helpLink} style={linkStyle} isExternal={true} target="help">
              <Box flexDirection={"row"} alignItems={"center"} gap={2} display={{ base: "none", md: "flex" }}>
                <BsWallet2 size="24" />
                <Text fontSize={"md"}>バッジウォレットへ戻る</Text>
              </Box>
            </Link>
            <Box gap={1} display={{ base: "flex", md: "none" }}>
              <Menu>
                <MenuButton cursor={"pointer"} minW={0} transition="all 1s">
                  <BsWallet2 size="24" />
                </MenuButton>
                <MenuList>
                  <MenuItem color={textColor}>
                    <Link href={walletUrl} style={linkStyle}>
                      バッジウォレットへ戻る
                    </Link>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Flex>
        </Box>
        <Box
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <NextLink href="/">
            <Text fontSize={"2xl"} fontWeight={"bold"} style={linkStyle}>
              {serviceName}
            </Text>
          </NextLink>
        </Box>
        <Box>
          <Flex gap={"8px"} alignItems={"center"} display={{ base: "none", sm: "flex" }}>
            <Link href={helpLink} style={linkStyle} isExternal={true} target="help">
              <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={1}>
            <MdHelp size="24" />
              <Text fontSize={"xl"}>ヘルプ</Text>
              </Box>
            </Link>
            <Menu>
              <MenuButton cursor={"pointer"} minW={0} transition="all 1s">
            <FaUserAlt />
              </MenuButton>
              <MenuList>
                <MenuItem color={textColor}>{userName}</MenuItem>
                <MenuItem color={textColor}>
            <Link href={logoutLink} style={linkStyle}>
                    ログアウト
            </Link>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <Flex gap={"8px"} alignItems={"center"} display={{ base: "flex", sm: "none" }}>
            <Link href={helpLink} isExternal={true} target="help">
              <MdHelp size="24" />
            </Link>
            <Menu>
              <MenuButton cursor={"pointer"} minW={0} transition="all 1s">
                <FaUserAlt />
              </MenuButton>
              <MenuList>
                <MenuItem color={textColor}>{userName}</MenuItem>
                <MenuItem color={textColor}>
                  <Link href={logoutLink} style={linkStyle}>
                    ログアウト
                  </Link>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
