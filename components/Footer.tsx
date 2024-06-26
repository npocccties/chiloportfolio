import { Flex, Link } from "@chakra-ui/react";
import React from "react";

import { headerColor, whiteTextColor } from "@/constants/color";
const copyrightLink = process.env.NEXT_PUBLIC_COPYRIGHT_LINK as string;
const copyright = process.env.NEXT_PUBLIC_COPYRIGHT as string;

export const Footer: React.VFC = () => {
  return (
    <Flex
      minH={"64px"}
      alignItems={"center"}
      justifyContent={"center"}
      p={{ base: 4 }}
      gap={"16px"}
      bg={headerColor}
      color={whiteTextColor}
    >
      <Link href={copyrightLink} fontSize={"sm"} fontWeight={"medium"}>
        {copyright}
      </Link>
    </Flex>
  );
};
