import { Input, Box, VStack, Text, Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { textColor } from "@/constants/color";
import { sessionKeyInput } from "@/constants/session";
import { ConsumerGoal } from "@/models/OkutepData";

import { getConsumerGoalList } from "../api/OkutepApi";
import { postEncrypt } from "../api/PortfolioApi";
import { PrimaryButton } from "../ui/button/PrimaryButton";
import { SecondaryButton } from "../ui/button/SecondaryButton";

type Props = {
  onClose: () => void;
  setDecryptedSessionKey: React.Dispatch<React.SetStateAction<string>>;
  setConsumerGoals: React.Dispatch<React.SetStateAction<ConsumerGoal[]>>;
};

export type KeyInputForm = {
  password: string;
};

export const KeyInput = ({ onClose, setDecryptedSessionKey, setConsumerGoals }: Props) => {
  const { register, handleSubmit } = useForm<KeyInputForm>();
  const [errorMessage, setErrorMessage] = useState("");

  const isValid = async (data: KeyInputForm) => {
    const { password } = data;
    let goalList: ConsumerGoal[];

    try {
      const res = await getConsumerGoalList(data.password);
      goalList = res.data;
    } catch (e) {
      console.error("request error: ", e.message);
      setErrorMessage("入力したキーが誤っています。");
      return;
    }

    try {
      const { result: encrypted } = await postEncrypt(password);
      localStorage.setItem(sessionKeyInput, encrypted);

      setDecryptedSessionKey(password);

      onClose();
    } catch (e) {
      console.error("encrypted error: ", e.message);
      setErrorMessage("入力したキーが誤っています。（暗号化に失敗）");
      return;
    }

    setConsumerGoals(goalList);
  };

  const isInvalid = (errors: any) => {
    setErrorMessage(errors.password.message);
  };

  return (
    <VStack>
      <form onSubmit={handleSubmit(isValid, isInvalid)}>
        <Box p="3">
          <Input
            type="password"
            placeholder="********"
            {...register("password", {
              required: "キーを入力してください。",
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
              <SecondaryButton w="32" onClick={onClose}>
                キャンセル
              </SecondaryButton>
            </GridItem>
            <GridItem>
              <PrimaryButton w="32" type="submit">
                送信
              </PrimaryButton>
            </GridItem>
          </Grid>
        </Box>
      </form>
    </VStack>
  );
};
