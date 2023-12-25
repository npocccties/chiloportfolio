import { textColor } from "@/constants/color";
import { Box, Spinner, Text } from "@chakra-ui/react";
import React from "react";
export const Loading: React.VFC = () => {
  return (
    <Box>
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="green.400" size="xl" />
      <Text color={textColor} mt="4">Loading...</Text>
    </Box>
  );
};
