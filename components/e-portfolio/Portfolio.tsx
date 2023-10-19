import React, { useState } from "react"
import { SelectConsumer } from "../ui/SelectConsumer"
import { useConsumerBadgesList } from "@/components/api/OkutepApi"
import { useWalletBadgeList } from "@/components/api/WalletApi"
import { getCsvText, mergeBadgeData } from "@/components/util/Converter"
import { Button, FormLabel, Link, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure, Box, Flex, HStack } from "@chakra-ui/react"
import { BadgeList } from "@/components/ui/BadgeList"
import { KeyInput, KeyInputForm } from "./KeyInput"
import { useForm } from "react-hook-form"
import jconv from "jconv"
import { BiKey } from "react-icons/bi";
import { PortfolioBadgeData } from "@/components/data/PortfolioData"
import { Loading } from "../Loading"
const csvFileName = process.env.NEXT_PUBLIC_CSV_FILE_NAME as string

export const Portfolio = () => {

  const [validPassword, setValidPassword] = useState(false)
  // OKUTEPからバッジ情報の取得
  const { consumerBadges, isLoading, isError } = useConsumerBadgesList(validPassword)

  // BadgeWalletからバッジ情報の取得
  const { walletBadges, isLoadingWB, isErrorWB } = useWalletBadgeList()

  // OKUTEPとBadgeWalletのバッジ情報をマージ
  var portfolioBadges: PortfolioBadgeData[] = []
  if (consumerBadges && walletBadges) {
    portfolioBadges = mergeBadgeData(consumerBadges, walletBadges)
  }
  // 教員育成指標のプルダウン選択時のハンドラ
  const [selectedConsumer, setSelectedConsumer] = useState('')
  const [selectedFramework, setSelectedFramework] = useState('')
  const [selectedStage, setSelectedStage] = useState('')
  const onChangeConsumer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const array = e.target.value.split(' ')
    const consumerName = array[0]
    const frameworkName = array[1]
    const stageName = array[2]
    console.log(`consumerName: ${consumerName} frameworkName: ${frameworkName} stageName: ${stageName}`)
    setSelectedConsumer(consumerName)
    setSelectedFramework(frameworkName)
    setSelectedStage(stageName)
  }

  // キー入力のダイアログとの連携
  const { isOpen, onClose, onOpen } = useDisclosure()
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<KeyInputForm>()


  const consumers = new Set<string>()
  portfolioBadges.map(v => {
    if (!v.stage_invisible || (validPassword && v.stage_invisible)) {
      consumers.add(getKeyName(v))
    }
  })
  console.log('consumers: ', consumers)

  // CSVダウンロード
  const onCsvDownload = () => {
    var targets = portfolioBadges.filter(v => v.consumer_name == selectedConsumer)
    var text = getCsvText(targets)
    text = jconv(text, "UTF8", "Shift_JIS")
    const blob = new Blob([text], {type: 'text/csv'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    document.body.appendChild(a)
    a.download = `${csvFileName}_${targets[0].consumer_name}_${targets[0].framework_name}_${targets[0].stage_name}.csv`
    a.href = url
    a.click()
    a.remove()
    URL.revokeObjectURL(url)    
  }

  const onKeyInputClosed = () => {
    // 教員育成指標のプルダウンを選択解除する
    var elements = document.getElementsByName('consumer')
    for (let i = 0; i < elements.length; i++){
      var obj = elements[i] as HTMLSelectElement;
      obj.selectedIndex = 0;
    }
    setSelectedConsumer('')
    setSelectedFramework('')
    setSelectedStage('')
  }

  if (isLoading || isLoadingWB) return <Loading/>
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
            教員育成指標選択
          </FormLabel>
          <HStack>
            <SelectConsumer consumers={Array.from(consumers)} handleChange={onChangeConsumer} />
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
            教員育成指標選択
          </FormLabel>
          <HStack>
            <SelectConsumer consumers={Array.from(consumers)} handleChange={onChangeConsumer} />
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
            <KeyInput register={register} watch={watch} handleSubmit={handleSubmit} onClose={onClose} setValidPassword={setValidPassword} onKeyInputClosed={onKeyInputClosed}/>
          </ModalBody>
        </ModalContent>
      </Modal>

      <BadgeList portfolioBadges={portfolioBadges} selectedConsumer={selectedConsumer} selectedFramework={selectedFramework} selectedStage={selectedStage}/>
    </>
  )
}

function getKeyName(v: PortfolioBadgeData): string {
  return `${v.consumer_name} ${v.framework_name} ${v.stage_name}`
}
