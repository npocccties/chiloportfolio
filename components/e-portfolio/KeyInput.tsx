import { Input, Box, Button, VStack, Text, Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import { UseFormHandleSubmit, UseFormRegister, UseFormWatch } from "react-hook-form";
import { TriggerWithArgs } from "swr/mutation";
import { ConsumerBadges } from "../data/OkutepData";

type Props = {
  register: UseFormRegister<KeyInputForm>,
  watch: UseFormWatch<KeyInputForm>,
  handleSubmit: UseFormHandleSubmit<KeyInputForm, undefined>,
  onClose: () => void,
  setValidPassword: React.Dispatch<React.SetStateAction<string>>,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  password: string,
  onKeyInputClosed: () => void,
  passwordResult: number,
  triggerConsumerBadges: TriggerWithArgs<ConsumerBadges[] | null, any, string, string>,
}

export const KeyInput = ({register, watch, handleSubmit, onClose, setPassword, setValidPassword, password, onKeyInputClosed, passwordResult, triggerConsumerBadges}: Props) => {

  const isValid = (data: KeyInputForm) => {
    if (passwordResult != -1) {
      if (passwordResult == 0) {
        setErrorMessage('入力したキーが誤っております。')
      } else {
        passwordResult = -1
        setErrorMessage('')
        onKeyInputClosed()
        setValidPassword(password)
        onClose()
      }
    }
  };

  const onChangePassword = (event): void => {
    setPassword(event.target.value);
    if (triggerConsumerBadges) {
      triggerConsumerBadges(event.target.value)
    }
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
        <Text id='input-error-message' color='red'>{errorMessage}</Text>
      </Box>
      <Box p='3'>
        <Grid templateColumns='repeat(4, 1fr)' gap={6}>
          <GridItem/>
          <GridItem/>
          <GridItem>
            <Button w='32' colorScheme='gray' onClick={onClose}>
              キャンセル
            </Button>
          </GridItem>
          <GridItem>
            <Button w='32' type="submit" colorScheme='blue' >
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

