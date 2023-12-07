import { Layout } from "@/components/Layout";
import { Button, Flex, FormLabel, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { AuthResult } from "@/models/OkutepData";
import { postAuth } from "@/components/api/PortfolioApi";
import { buttonColor, textColor, whiteTextColor } from "@/constants/color";

type SignInProps = {
};

export default function SignIn({}: SignInProps) {
  const [password, setPassword] = useState('')
  const [postedData, setPostedData] = useState<AuthResult>()

  const onChangeHandler = (e) => {
    setPassword(e.target.value)
  }

  const router = useRouter()
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    const authResult = await postAuth(password)
    setPostedData(authResult)
    sessionStorage.setItem('session_portfolio', authResult.result)
    if (authResult.result != "") {
      router.push('/')
    }
  }
  return (
    <Layout maxW="6xl">
      <form onSubmit={onSubmitHandler} action='/api/auth' method='POST'>
        <VStack spacing='5'>
          <Heading mb={6}>アクティベーション</Heading>
          <Flex direction="column" rounded={6}>
            <FormLabel htmlFor="password">利用キー</FormLabel>
            <Input type="password" name="password" onChange={onChangeHandler} placeholder="********" mb={6} />
            <Button type="submit" mb={6} bg={buttonColor} color={whiteTextColor}>アクティベーションを行う</Button>
            {postedData && postedData.result == "" && <Text color={textColor}>利用キーが正しくありません。</Text>}
          </Flex>
        </VStack>
      </form>
    </Layout>
  );
}
