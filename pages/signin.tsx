import { Button, Flex, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

import { postAuth } from "@/components/api/PortfolioApi";
import { Layout } from "@/components/Layout";
import { PageTitle } from "@/components/ui/text/Pagetitle";
import { buttonColor, textColor, whiteTextColor } from "@/constants/color";
import { activationKey } from "@/constants/session";
import { AuthResult } from "@/models/OkutepData";

type SignInProps = {};

const serviceName = process.env.NEXT_PUBLIC_SERVICE_NAME as string;

export default function SignIn({}: SignInProps) {
  const [password, setPassword] = useState("");
  const [postedData, setPostedData] = useState<AuthResult>();

  const onChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const router = useRouter();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const authResult = await postAuth(password);
    setPostedData(authResult);
    localStorage.setItem(activationKey, authResult.result);
    if (authResult.result != "") {
      router.push("/");
    }
  };
  return (
    <Layout maxW="6xl">
      <PageTitle title={serviceName} />
      <form onSubmit={onSubmitHandler} action="/api/auth" method="POST">
        <VStack spacing="5">
          <Flex direction="column" rounded={6}>
            <FormLabel htmlFor="password">利用キー</FormLabel>
            <Input type="password" name="password" onChange={onChangeHandler} placeholder="********" mb={6} />
            <Button type="submit" mb={6} bg={buttonColor} color={whiteTextColor}>
              アクティベーションを行う
            </Button>
            {postedData && postedData.result == "" && <Text color={textColor}>利用キーが正しくありません。</Text>}
          </Flex>
        </VStack>
      </form>
    </Layout>
  );
}
