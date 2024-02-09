import { Flex, Box, FormLabel, HStack, Link, Text, Spinner } from "@chakra-ui/react";
import { BiKey } from "react-icons/bi";

import { textColor } from "@/constants/color";
import { ConsumerGoal } from "@/models/OkutepData";

import { SelectConsumer } from "./SelectConsumer";
import { PrimaryButton } from "../ui/button/PrimaryButton";

const analyticsSheetLink = process.env.NEXT_PUBLIC_ANALYTICS_SHEET_LINK as string;

type Props = {
  consumers: ConsumerGoal[];
  onOpen: () => void;
  onCsvDownload: () => void;
  onChangeConsumer: (e: React.ChangeEvent<HTMLSelectElement>) => Promise<void>;
  isCsvDownloadDisabled: boolean;
};
export const Operation = ({ consumers, onOpen, onCsvDownload, onChangeConsumer, isCsvDownloadDisabled }: Props) => {
  const isLoading = consumers.length > 1;
  return (
    <>
      {/** desktop */}
      <Flex
        display={{ base: "none", md: "flex" }}
        w="full"
        justify={"space-between"}
        direction={"row"}
        alignItems={"flex-end"}
      >
        <Box mt={4}>
          <FormLabel mb={2} fontSize={"md"}>
            教員育成指標選択
          </FormLabel>
          {isLoading ? (
            <>
              <HStack>
                <SelectConsumer consumers={consumers} handleChange={onChangeConsumer} />
                <Link onClick={onOpen}>
                  <Text fontSize="40px" color={textColor}>
                    <BiKey />
                  </Text>
                </Link>
              </HStack>
            </>
          ) : (
            <Box textAlign="center">
              <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary.500" size="lg" />
            </Box>
          )}
        </Box>
        <HStack mt={4}>
          <PrimaryButton onClick={onCsvDownload} isDisabled={isCsvDownloadDisabled}>
            CSVダウンロード
          </PrimaryButton>
          <PrimaryButton>
            <Link href={analyticsSheetLink} download="e-Portfolio-analytics.xlsx" _hover={{ textDecoration: "none" }}>
              分析シートダウンロード
            </Link>
          </PrimaryButton>
        </HStack>
      </Flex>

      {/** smart phone */}
      <Flex
        display={{ base: "flex", md: "none" }}
        w="full"
        justify={"space-between"}
        direction={"column"}
        alignItems={"center"}
      >
        <Box w={"full"} mt={7}>
          <FormLabel mb={2} fontSize={"md"}>
            教員育成指標選択
          </FormLabel>
          <HStack>
            <SelectConsumer consumers={consumers} handleChange={onChangeConsumer} />
            <Link onClick={onOpen}>
              <Text fontSize="40px" color={textColor}>
                <BiKey />
              </Text>
            </Link>
          </HStack>
        </Box>
        <Box w={"full"} mt={8}>
          <PrimaryButton w={"full"} onClick={onCsvDownload} isDisabled={isCsvDownloadDisabled}>
            CSVダウンロード
          </PrimaryButton>
        </Box>
        <Box w={"full"} mt={8}>
          <PrimaryButton w={"full"}>
            <Link href={analyticsSheetLink} download="e-Portfolio-analytics.xlsx" _hover={{ textDecoration: "none" }}>
              分析シートダウンロード
            </Link>
          </PrimaryButton>
        </Box>
      </Flex>
    </>
  );
};
