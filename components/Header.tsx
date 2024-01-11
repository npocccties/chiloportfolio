import { Box, Flex, Menu, MenuButton, MenuItem, MenuList, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaUserAlt } from "react-icons/fa";
import { MdLogout, MdHelp } from "react-icons/md";
import { BsWallet2 } from "react-icons/bs";
import { getCookieValue } from "@/lib/cookie";
import { getUserInfoFormJwt } from "@/lib/userInfo";
import React, { useEffect, useState } from "react";
import { headerColor, textColor, whiteTextColor } from "@/constants/color";
import { linkStyle } from "@/constants/style";
import { HamburgerIcon } from "@chakra-ui/icons";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";

const serviceName = process.env.NEXT_PUBLIC_SERVICE_NAME as string;
const helpLink = process.env.NEXT_PUBLIC_HELP_LINK as string;
const logoutLink = process.env.NEXT_PUBLIC_LOGOUT_LINK as string;
const walletUrl = process.env.NEXT_PUBLIC_WALLET_BASE_URL as string;

type Props = {
  showContents: boolean;
  onOpen: () => void;
};

export const Header: React.FC<Props> = ({ showContents, onOpen }) => {
  const [userName, setUserName] = useState("Unknown");

  useEffect(() => {
    var errorDetail = "";
    const session_cookie = getCookieValue("session_cookie");
    if (!session_cookie) {
      errorDetail = "Not found session_cookie.";
    } else {
      const userInfo = getUserInfoFormJwt(session_cookie);
      if (!userInfo) {
        errorDetail = "Failed to decode.";
      } else {
        setUserName(userInfo.displayName);
      }
    }
    if (errorDetail) {
      console.log(errorDetail);
    }
  }, []);
  console.log("logoutLink:", logoutLink);

  return (
    <Box as="header" w={"100%"} zIndex={1000} bg={headerColor} color={whiteTextColor}>
      <Flex
        h={"64px"}
        alignItems={"center"}
        justifyContent={"space-between"}
        backgroundColor={"basic.black"}
        p={{ base: 8 }}
      >
        <Box display={{ base: "block", md: "none" }}>
          <HamburgerIcon color={"basic.white"} w={6} h={6} cursor={"pointer"} onClick={() => onOpen()} />
        </Box>
        <Box display={{ base: "none", md: "block" }}>
          <Flex gap={"8px"} alignItems={"center"} color={"basic.white"} display={{ base: "none", md: "flex" }}>
            <Link href={walletUrl} style={linkStyle}>
              <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={1}>
                <BsWallet2 size="24" />
                <Text mr={2} fontSize={"xl"}>
                  マイウォレット
                </Text>
              </Box>
            </Link>
            <NextLink href="/" style={{ textDecoration: "none" }}>
              <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={1}>
                <TbDeviceDesktopAnalytics size="20" />
                <Text mr={2} fontSize={"xl"}>
                  分析
                </Text>
              </Box>
            </NextLink>
            <Link href={helpLink} style={linkStyle} isExternal={true} target="help">
              <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={1}>
                <MdHelp size="24" />
                <Text mr={2} fontSize={"xl"}>
                  ヘルプ
                </Text>
              </Box>
            </Link>
          </Flex>
        </Box>
        <Box
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        ></Box>
        <Box display={{ base: "none", sm: "block" }}>
          <Flex gap={"8px"} alignItems={"center"} color={"basic.white"}>
            <Link fontSize={"xl"} href={logoutLink} style={{ textDecoration: "none" }}>
              <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={1}>
                <MdLogout size="24" />
                <Text>ログアウト</Text>
              </Box>
            </Link>
          </Flex>
        </Box>
        <Box display={{ base: "block", sm: "none" }}>
          <Flex gap={"8px"} alignItems={"center"}>
            <Link fontSize={"xl"} href={logoutLink} style={{ textDecoration: "none" }}>
              <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={1}>
                <MdLogout size="24" />
                <Text>ログアウト</Text>
              </Box>
            </Link>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
