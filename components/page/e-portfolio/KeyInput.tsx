import { Input, Box, Button, VStack, Text, Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import { UseFormHandleSubmit, UseFormRegister, UseFormWatch, useForm } from "react-hook-form";
import SHA256 from "crypto-js/sha256"

const sha256Hash = process.env.NEXT_PUBLIC_KEY_SHA256_HASH as string

type Props = {
  register: UseFormRegister<KeyInputForm>,
  watch: UseFormWatch<KeyInputForm>,
  handleSubmit: UseFormHandleSubmit<KeyInputForm, undefined>,
  onClose: () => void,
  setValidPassword: React.Dispatch<React.SetStateAction<boolean>>,
}

export const KeyInput = ({register, watch, handleSubmit, onClose, setValidPassword}: Props) => {

  const isValid = (data: KeyInputForm) => {
    const outputHash = SHA256(data.password).toString().toLowerCase()
    if (outputHash != sha256Hash) {
      setErrorMessage('入力したキーが誤っております。')
      setValidPassword(false)
    } else {
      setErrorMessage('')
      setValidPassword(true)
      onClose()
    }
  };
  
  const isInvalid = (errors: any) => {
    setErrorMessage(errors.password.message)
  };
  
  const [errorMessage, setErrorMessage] = useState('');

  return (
   <VStack>
    <form onSubmit={handleSubmit(isValid, isInvalid)}>
      <Box p='3'>
        <Input name="password" type="password" {...register("password", { required: "キーを入力してください。" })}/>
        <Text color='red'>{errorMessage}</Text>
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
