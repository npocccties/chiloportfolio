import { Layout } from "@/components/Layout";
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type SignInProps = {
  csrfToken?: string
};

export default function SignIn({ csrfToken }: SignInProps) {
  const router = useRouter();
  const { error } = router.query;
  
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

