import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";

type SignInProps = {
  csrfToken?: string;
};

export default function SignIn({ csrfToken }: SignInProps) {
  const router = useRouter();
  const { error } = router.query;
  return (
    <form method="post" action="/api/auth/callback/credentials">
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex direction="column" rounded={6}>
          <Input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <Heading mb={6}>ログイン</Heading>
          <FormLabel htmlFor="username">ユーザ名</FormLabel>
          <Input type="text" name="username" variant="filled" mb={6} />
          <FormLabel htmlFor="password">パスワード</FormLabel>
          <Input type="password" name="password" placeholder="********" variant="filled" mb={6} />
          <Button type="submit" mb={6} colorScheme="teal">ログインする</Button>
          {error && <Text color="red">ユーザ名またはパスワードが正しくありません。</Text>}
        </Flex>
      </Flex>
    </form>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
};