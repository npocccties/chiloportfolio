import { Input, Box, Button, VStack, Text, Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import { UseFormHandleSubmit, UseFormRegister, UseFormWatch, useForm } from "react-hook-form";
 
type Props = {
  register: UseFormRegister<KeyInputForm>,
  watch: UseFormWatch<KeyInputForm>,
  handleSubmit: UseFormHandleSubmit<KeyInputForm, undefined>,
  onClose: () => void,
  setValidPassword: React.Dispatch<React.SetStateAction<boolean>>,
}

export const KeyInput = ({register, watch, handleSubmit, onClose, setValidPassword}: Props) => {

  const isValid = (data: KeyInputForm) => {
    console.log(data);
    if (data.password != 'pass') {
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
        <Input name="password" type="password" {...register("password", { required: "キーを入力してください" })}/>
        <Text color='red'>{errorMessage}</Text>
      </Box>
      <Grid templateColumns='repeat(4, 1fr)' gap={6}>
        <GridItem/>
        <GridItem/>
        <GridItem>
          <Button background="gray.300" color="black" _hover={{ background: "gray.400"}} onClick={onClose}>
            キャンセル
          </Button>
        </GridItem>
        <GridItem>
          <Button type="submit" background="blue.300" color="white" _hover={{ background: "blue.400" }}>
            送信
          </Button>
        </GridItem>
      </Grid>
    </form>
   </VStack>
 );
};

export interface KeyInputForm {
  password: string;
}
