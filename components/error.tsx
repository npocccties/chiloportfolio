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
import { useRouter } from "next/router";
import { ReactNode, useEffect, useRef, useState } from "react";

export const ErrorDialog = ({ title, message, detail }: { title: string; message: string; detail: any }) => {
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
            <Text fontSize={"lg"} mb={4}>
              {message}
            </Text>
            <Text fontSize={"md"}>詳細: {detail}</Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ml={3}
              colorScheme="red"
              onClick={() => {
                router.reload();
              }}
            >
              閉じる
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
