import { Box, Spinner, Text } from "@chakra-ui/react";
import React from "react";

import { textColor } from "@/constants/color";
export const Loading: React.VFC = () => {
  return (
    <Box>
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary.500" size="xl" />
      <Text color={textColor} mt="4">
        Loading...
      </Text>
    </Box>
  );
};
