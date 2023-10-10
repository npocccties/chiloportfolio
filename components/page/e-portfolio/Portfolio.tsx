import React, { useState } from "react"
import { SelectConsumer } from "../../ui/SelectConsumer"
import { useConsumerBadgesList } from "@/components/api/OkutepApi"
import { useWalletBadgeList } from "@/components/api/WalletApi"
import { getCsvText, mergeBadgeData } from "@/components/util/Converter"
import { Button, FormLabel, Grid, WrapItem, Link, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, Wrap, useDisclosure, Box, Flex, HStack } from "@chakra-ui/react"
import { BadgeList } from "@/components/ui/BadgeList"
import { KeyInput, KeyInputForm } from "./KeyInput"
import { useForm } from "react-hook-form"
import jconv from "jconv"
import { BiKey } from "react-icons/bi";

export const Portfolio = () => {

  // OKUTEPからバッジ情報の取得
  const { consumerBadges, isLoading, isError } = useConsumerBadgesList()

  // BadgeWalletからバッジ情報の取得
  const { walletBadges, isLoadingWB, isErrorWB } = useWalletBadgeList()

  // OKUTEPとBadgeWalletのバッジ情報をマージ
  const portfolioBadges = mergeBadgeData(consumerBadges, walletBadges)
  
  // 教育指標のプルダウン選択時のハンドラ
  const [selectedConsumer, setSelectedConsumer] = useState('')
  const onChangeConsumer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const consumerName = e.target.value
    console.log('consumerName: ', consumerName)
    setSelectedConsumer(consumerName)
  }

  // キー入力のダイアログとの連携
  const { isOpen, onClose, onOpen } = useDisclosure()
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<KeyInputForm>()
  const [validPassword, setValidPassword] = useState(false)

  const consumers = new Set<string>()
  consumerBadges.map(v => {
    if (!v.invisible || (validPassword && v.invisible)) {
      consumers.add(v.consumer_name)
    }
  })
  console.log('consumerDatas: ', consumers)

  // CSVダウンロード
  const onCsvDownload = () => {
    var targets = portfolioBadges.filter(v => v.consumer_name == selectedConsumer)
    var text = getCsvText(targets)
    text = jconv(text, "UTF8", "Shift_JIS")
    const blob = new Blob([text], {type: 'text/csv'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    document.body.appendChild(a)
    a.download = 'e-Portfolio.csv'
    a.href = url
    a.click()
    a.remove()
    URL.revokeObjectURL(url)    
  }

  if (isLoading || isLoadingWB) return <div>loading...</div>
  if (isError || isErrorWB) return <div>failed to load</div>
  return (
    <>
      {/** desktop */}
      <Flex
        display={{ base: "none", sm: "flex" }}
        w="full"
        justify={"space-between"}
        direction={"row"}
        alignItems={"flex-end"}
      >
        <Box mt={4}>
          <FormLabel mb={2} fontSize={"md"}>
            教育指標選択
          </FormLabel>
          <HStack>
            <SelectConsumer w={"64"} consumers={Array.from(consumers)} handleChange={onChangeConsumer} />
            <Link onClick={onOpen}>
              <Text fontSize='40px'><BiKey/></Text>
            </Link>
          </HStack>
        </Box>
        <Box mt={4}>
          <Button colorScheme='blue' onClick={onCsvDownload}>CSVダウンロード</Button>
        </Box>
      </Flex>

      {/** smart phone */}
      <Flex
        display={{ base: "flex", sm: "none" }}
        w="full"
        justify={"space-between"}
        direction={"column"}
        alignItems={"center"}
      >
        <Box w={"full"} mt={7}>
          <FormLabel mb={2} fontSize={"md"}>
            教育指標選択
          </FormLabel>
          <HStack>
            <SelectConsumer w={"60"} consumers={Array.from(consumers)} handleChange={onChangeConsumer} />
            <Link onClick={onOpen}>
              <Text fontSize='40px'><BiKey/></Text>
            </Link>
          </HStack>
        </Box>
        <Box w={"full"} mt={8}>
          <Button w={"full"} colorScheme='blue' onClick={onCsvDownload}>CSVダウンロード</Button>
        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>取得キー入力</ModalHeader>
          <ModalBody>
            <KeyInput register={register} watch={watch} handleSubmit={handleSubmit} onClose={onClose} setValidPassword={setValidPassword}/>
          </ModalBody>
        </ModalContent>
      </Modal>

      <BadgeList portfolioBadges={portfolioBadges} selectedConsumer={selectedConsumer} />
    </>
  )
}
