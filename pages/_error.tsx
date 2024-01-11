import { WarningIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { NextPageContext } from "next";
import { useRouter } from "next/router";

import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { buttonColor, textColor, whiteTextColor } from "@/constants/color";

const serviceName = process.env.NEXT_PUBLIC_SERVICE_NAME as string;
const serviceDescription = process.env.NEXT_PUBLIC_SERVICE_DESCRIPTION as string;

function ErrorPage({ statusCode, errorMessage }) {
  const router = useRouter();
  const errorLabel = statusCode === 500 ? "500: Internal Server Error" : `${statusCode} Not Found`;

  const handleBack = () => {
    router.back();
  };

  return (
    <Layout maxW="2xl">
      <Metatag title={serviceName} description={serviceDescription} />
      <VStack justifyContent={"center"} gap={16} mt={8}>
        <WarningIcon w={16} h={16} color={"red.500"} />
        <Text fontSize={"xl"} color={textColor}>
          {errorLabel}
        </Text>
        <Text fontSize={"md"} color={textColor}>
          {errorMessage}
        </Text>

        <HStack>
          <Box>
            <Button bg={buttonColor} color={whiteTextColor} onClick={handleBack}>
              前のページに戻る
            </Button>
          </Box>
        </HStack>
      </VStack>
    </Layout>
  );
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const errorMessage = err ? err.message : "お探しのページは見つかりませんでした。";

  return { statusCode, errorMessage };
};

export default ErrorPage;
