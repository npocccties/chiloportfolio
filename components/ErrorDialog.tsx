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
import { MouseEventHandler, ReactNode, useEffect, useRef, useState } from "react";

export const ErrorDialog = ({ title, message, detail, onClick, visibleCloseButton }: { title: string; message: string; detail: any, onClick: () => void, visibleCloseButton: boolean}) => {
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
            <Text fontSize={"lg"} mb={4}>
              {message}
            </Text>
            <Text fontSize={"md"}>詳細: {br(detail)}</Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            {visibleCloseButton &&
              <Button
                ml={3}
                colorScheme="red"
                onClick={onClick}
              >
                閉じる
              </Button>
            }
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