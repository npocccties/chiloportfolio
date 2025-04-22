import {
  Flex,
  Box,
  Container,
  Stack,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import React from "react";


import { PortalHeader } from "@/components/portal_components/PortalHeader";
import { ReturnButton } from "@/components/ui/button/ReturnButton";
// import { Header } from "./Header"; 

import { Footer } from "./Footer";
import { SidebarContent } from "./Sidebar";


export interface LayoutProps {
  children: React.ReactNode;
  maxW?: string;
  textAlign?: "center";
  align?: string;
}

export const Layout: React.VFC<LayoutProps> = ({ children, maxW, textAlign, align }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const returnTo = process.env.RETURN_TO_DASHBOARD_URL as string;

  return (
    <Flex minHeight={"100vh"} direction={"column"} 
      justify={"center"}
      position={"relative"}
      align={"center"}
      overflow={"visible"}
      >
      <PortalHeader showContents={false} onOpen={onOpen} />
      <Box ml="-50%" mt="5">
        <ReturnButton 
          as="a"
          href={returnTo} 
          color={"black"}>
            戻る
        </ReturnButton>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent maxW={{ base: "full", sm: "xs" }}>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Box flex={2}>
        <Container maxW={maxW}>
          <Stack textAlign={textAlign} align={align} spacing={"14"} py={"14"}>
            {children}
          </Stack>
        </Container>
      </Box>
      <Footer />
    </Flex>
  );
};
