import { Input, Box, Button, VStack, Text, Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import { UseFormHandleSubmit, UseFormRegister, UseFormWatch } from "react-hook-form";

import { buttonColor, textColor, whiteTextColor } from "@/constants/color";
import { sessionKeyInput } from "@/constants/session";

import { getConsumerGoalList } from "../api/OkutepApi";
import { postEncrypt } from "../api/PortfolioApi";

type Props = {
  register: UseFormRegister<KeyInputForm>;
  watch: UseFormWatch<KeyInputForm>;
  handleSubmit: UseFormHandleSubmit<KeyInputForm, undefined>;
  onClose: () => void;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  onKeyInputClosed: () => void;
  callOkutepApi: (password: string, frameworkId: number, stageId: number) => void;
  selectedFrameworkId: number;
  selectedStageId: number;
  setValidPassword: React.Dispatch<React.SetStateAction<string>>;
  session: string;
};

export const KeyInput = ({
  register,
  watch,
  handleSubmit,
  onClose,
  setPassword,
  password,
  onKeyInputClosed,
  callOkutepApi,
  selectedFrameworkId,
  selectedStageId,
  setValidPassword,
  session,
}: Props) => {
  const isValid = (data: KeyInputForm) => {
    getConsumerGoalList(data.password)
      .then((res) => {
        setErrorMessage("");
        postEncrypt(password)
          .then((res) => {
            const encrypted = res.result;
            sessionStorage.setItem(sessionKeyInput, encrypted);
            setValidPassword(encrypted);
            callOkutepApi(encrypted, selectedFrameworkId, selectedStageId);
            onKeyInputClosed();
            onClose();
          })
          .catch(({ res }) => {
            console.log("res1: ", res);
            setErrorMessage("入力したキーが誤っています。（暗号化に失敗）");
          });
      })
      .catch(({ res }) => {
        console.log("res2: ", res);
        setErrorMessage("入力したキーが誤っています。");
      });
  };

  const onChangePassword = (event): void => {
    setPassword(event.target.value);
  };

  const isInvalid = (errors: any) => {
    setErrorMessage(errors.password.message);
  };

  const [errorMessage, setErrorMessage] = useState("");

  return (
    <VStack>
      <form onSubmit={handleSubmit(isValid, isInvalid)}>
        <Box p="3">
          <Input
            type="password"
            placeholder="********"
            {...register("password", {
              required: "キーを入力してください。",
              onChange: (e) => onChangePassword(e),
            })}
            name="password"
          />
          <Text id="input-error-message" color={textColor}>
            {errorMessage}
          </Text>
        </Box>
        <Box p="3">
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            <GridItem />
            <GridItem />
            <GridItem>
              <Button w="32" bg={buttonColor} color={whiteTextColor} onClick={onClose}>
                キャンセル
              </Button>
            </GridItem>
            <GridItem>
              <Button w="32" bg={buttonColor} color={whiteTextColor} type="submit" colorScheme="blue">
                送信
              </Button>
            </GridItem>
          </Grid>
        </Box>
      </form>
    </VStack>
  );
};

export interface KeyInputForm {
  password: string;
}
