import { Flex, Link } from "@chakra-ui/react";
import React from "react";
const copyright = process.env.NEXT_PUBLIC_COPYRIGHT as string

export const Footer: React.VFC = () => {
  return (
    <Flex
      minH={"64px"}
      alignItems={"center"}
      justifyContent={"center"}
      p={{ base: 4 }}
      gap={"16px"}
    >
      <Link
        href="https://github.com/block-base/openbadge-vc-converter"
        fontSize={"sm"}
        fontWeight={"medium"}
      >
        {copyright}
      </Link>
    </Flex>
  );
};
