import { buttonColor, textColor, whiteTextColor } from "@/constants/color";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useRef } from "react";
import { useRouter } from "next/router";

export const ErrorDialog = ({ title, message, detail }: { title: string; message: string; detail: any}) => {
  const router = useRouter();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { onClose } = useDisclosure();

  return (
    <AlertDialog isOpen={true} onClose={onClose} leastDestructiveRef={cancelRef}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="xl" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text color={textColor} fontSize={"lg"} mb={4}>
              {message}
            </Text>
            <Text color={textColor} fontSize={"md"}>詳細: {br(detail)}</Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ml={3}
              bg={buttonColor}
              color={whiteTextColor}
              onClick={() => {
                router.back();
              }}
            >
              前のページに戻る
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

function br(msg: string) {
  const texts = msg.split("\n").map((item, index) => {
    // <></> は key を設定できないので、<React.Fragment /> を使う
    return (
      <React.Fragment key={index}>{item}<br /></React.Fragment>
    );
  });
  return <div>{texts}</div>;
}