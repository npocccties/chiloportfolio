import { Input, Box, Button, VStack, Text, Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import { UseFormHandleSubmit, UseFormRegister, UseFormWatch } from "react-hook-form";
import { TriggerWithArgs } from "swr/mutation";
import { ConsumerGoal } from "../../models/OkutepData";
import { getConsumerGoalList } from "../api/OkutepApi";
import { buttonColor, textColor, whiteTextColor } from "@/constants/color";
import { sessionKeyInput } from "@/constants/session";

type Props = {
  register: UseFormRegister<KeyInputForm>,
  watch: UseFormWatch<KeyInputForm>,
  handleSubmit: UseFormHandleSubmit<KeyInputForm, undefined>,
  onClose: () => void,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  password: string,
  onKeyInputClosed: () => void,
}

export const KeyInput = ({register, watch, handleSubmit, onClose, setPassword, password, onKeyInputClosed}: Props) => {

  const isValid = (data: KeyInputForm) => {
    getConsumerGoalList(data.password).then((res) => {
      setErrorMessage('')
      sessionStorage.setItem(sessionKeyInput, password)
      onKeyInputClosed()
      onClose()
    })
    .catch(({res}) => {
      setErrorMessage('入力したキーが誤っております。')
    });
  };

  const onChangePassword = (event): void => {
    setPassword(event.target.value);
  }

  const isInvalid = (errors: any) => {
    setErrorMessage(errors.password.message)
  };
  
  const [errorMessage, setErrorMessage] = useState('');

  return (
   <VStack>
    <form onSubmit={handleSubmit(isValid, isInvalid)}>
      <Box p='3'>
        <Input type="password" placeholder="********" {...register("password", { 
          required: "キーを入力してください。",
          onChange: (e) => onChangePassword(e)
        })} name="password" />
        <Text id='input-error-message' color={textColor}>{errorMessage}</Text>
      </Box>
      <Box p='3'>
        <Grid templateColumns='repeat(4, 1fr)' gap={6}>
          <GridItem/>
          <GridItem/>
          <GridItem>
            <Button w='32' bg={buttonColor} color={whiteTextColor} onClick={onClose}>
              キャンセル
            </Button>
          </GridItem>
          <GridItem>
            <Button w='32' bg={buttonColor} color={whiteTextColor} type="submit" colorScheme='blue' >
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

