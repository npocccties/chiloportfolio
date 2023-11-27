import { Layout } from "@/components/Layout";
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { parseCookies } from 'nookies'

type SignInProps = {
  csrfToken?: string
  userName?: string
};

export default function SignIn({ csrfToken, userName }: SignInProps) {
  const router = useRouter();
  const { error } = router.query;
  const [savedUserName, setSavedUserName] = useState('')

  useEffect(() => {
    localStorage.setItem('userName', userName ?? '')
    setSavedUserName(userName ?? '')
  }, [])
  
  return (
    <Layout maxW="6xl">
      <form method="post" action="/api/auth/callback/credentials">
        <VStack spacing='5'>
          <Input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <Heading mb={6}>アクティベーション</Heading>
          <Flex direction="column" rounded={6}>
            <FormLabel htmlFor="password">利用キー</FormLabel>
            <Input type="password" name="password" placeholder="********" variant="filled" mb={6} />
            <Button type="submit" mb={6} colorScheme="teal">アクティベーションを行う</Button>
            {error && <Text color="red">利用キーが正しくありません。</Text>}
          </Flex>
        </VStack>
      </form>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = parseCookies(context)
  const userName = cookie['eppn'] ?? 'Unknown'
  return {
    props: {
      csrfToken: await getCsrfToken(context),
      userName: userName,
    },
  };
};