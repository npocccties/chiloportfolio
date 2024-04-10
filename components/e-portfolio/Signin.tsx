import { Button, Flex, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";

import { buttonColor, textColor, whiteTextColor } from "@/constants/color";
import { AuthResult } from "@/models/OkutepData";
import { activateActions } from "@/share/store/activate";

export const SignIn = () => {
  const [password, setPassword] = useState("");
  const [postedData, setPostedData] = useState<AuthResult>();
  const { setInitializeActivate } = activateActions.useSetInitializeActivate();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const authResult = await setInitializeActivate(password);
    setPostedData(authResult);
  };
  return (
    <>
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
    </>
  );
};
