import React, { useState } from "react"
import { SelectConsumer } from "../ui/SelectConsumer"
import { useConsumerBadgesList, usePortalCategoryBadges, usePortalCategoryList } from "@/components/api/OkutepApi"
import { useWalletBadgeList } from "@/components/api/WalletApi"
import { getCsvText, mergeBadgeDataWithCategory, mergeBadgeDataWithConsumer } from "@/components/util/Converter"
import { Button, FormLabel, Link, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure, Box, Flex, HStack } from "@chakra-ui/react"
import { BadgeList } from "@/components/ui/BadgeList"
import { KeyInput, KeyInputForm } from "./KeyInput"
import { useForm } from "react-hook-form"
import jconv from "jconv"
import { BiKey } from "react-icons/bi";
import { PortfolioBadgeData } from "@/components/data/PortfolioData"
import { Loading } from "../Loading"
import { PortalCategory, PortalCategoryBadges } from "../data/OkutepData"
import { usePassword } from "../api/PortfolioApi"
const csvFileName = process.env.NEXT_PUBLIC_CSV_FILE_NAME as string

export const Portfolio = () => {

  const [portalCategory, setPortalCategory] = useState<PortalCategory>()
  // OKUTEPからポータルカテゴリ一覧取得
  const { portalCategories, isLoadingPCL, isErrorPCL } = usePortalCategoryList()
  // OKUTEPからポータルカテゴリに紐づくバッジ一覧取得
  const { portalCategoryBadges, isLoadingPCBL, isErrorPCBL } = usePortalCategoryBadges(portalCategory ? portalCategory.portal_category_id : 0)

  const [validPassword, setValidPassword] = useState('')
  const [password, setPassword] = useState('')
  // OKUTEPからバッジ情報の取得
  const { triggerConsumerBadges, consumerBadges, isMutatingConsumerBadges } = useConsumerBadgesList()
  triggerConsumerBadges(validPassword)

  // 入力キーの照合
  var { trigger, passwordResult, isMutating } = usePassword()
  console.log('passwordResult: ', passwordResult)

  // BadgeWalletからバッジ情報の取得
  const { walletBadges, isLoadingWB, isErrorWB } = useWalletBadgeList()

  // OKUTEPとBadgeWalletのバッジ情報をマージ
  var portfolioBadges: PortfolioBadgeData[] = []
  if (portalCategoryBadges && walletBadges && portalCategory && portalCategories) {
    portfolioBadges = mergeBadgeDataWithCategory(portalCategory, portalCategoryBadges, walletBadges)
    console.log('mergeBadgeDataWithCategory: ', portfolioBadges)
  }
  if (consumerBadges && walletBadges) {
    const results = mergeBadgeDataWithConsumer(consumerBadges, walletBadges)
    portfolioBadges = portfolioBadges.concat(results)
    console.log('mergeBadgeDataWithConsumer: ', portfolioBadges)
  }
  // 教員育成指標のプルダウン選択時のハンドラ
  const [selectedConsumer, setSelectedConsumer] = useState('')
  const [selectedFramework, setSelectedFramework] = useState('')
  const [selectedStage, setSelectedStage] = useState('')
  const onChangeConsumer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const array = e.target.value.split(' ')
    if (array.length == 1) {
      const targets = portalCategories?.filter(v => v.name == array[0])
      if (targets && targets.length != 0) {
        const portalCategory = targets[0]
        const portalCategoryId = portalCategory.portal_category_id
        console.log('portalCategoryId: ', portalCategoryId)
        setPortalCategory(portalCategory)
        setSelectedConsumer(portalCategory.name)
      }
      setSelectedFramework('')
      setSelectedStage('')
    } else {
      const consumerName = array[0]
      const frameworkName = array[1]
      const stageName = array[2]
      console.log(`consumerName: ${consumerName} frameworkName: ${frameworkName} stageName: ${stageName}`)
      setSelectedConsumer(consumerName)
      setSelectedFramework(frameworkName)
      setSelectedStage(stageName)
    }
  }

  // キー入力のダイアログとの連携
  const { isOpen, onClose, onOpen } = useDisclosure()
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<KeyInputForm>()

  // 教員育成指標選択のプルダウンの要素を収集
  const consumers = new Set<string>()
  portfolioBadges.map(v => {
    if (!v.stage_password || (validPassword && v.stage_password)) {
      const key = getKeyName(v)
      if (key) {
        consumers.add(key)
      }
    }
  })
  portalCategories?.map(v => {
    consumers.add(v.name?.trim())
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
    a.download = getCsvFileName(targets[0].consumer_name, targets[0].framework_name, targets[0].stage_name)
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
  console.log('selectedConsumer: ', selectedConsumer)
  console.log('selectedFramework: ', selectedFramework)
  console.log('selectedStage: ', selectedStage)

  if (isLoadingWB || isLoadingPCL || isLoadingPCBL) return <Loading/>
  if (isErrorWB || isErrorPCL || isErrorPCBL) return <div>failed to load</div>

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
            <SelectConsumer selectedConsumer={selectedConsumer} consumers={Array.from(consumers)} handleChange={onChangeConsumer} />
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
            <SelectConsumer selectedConsumer={selectedConsumer} consumers={Array.from(consumers)} handleChange={onChangeConsumer} />
            <Link onClick={onOpen}>
              <Text fontSize='40px'><BiKey/></Text>
            </Link>
          </HStack>
        </Box>
        <Box w={"full"} mt={8}>
          <Button w={"full"} colorScheme='blue' onClick={onCsvDownload}>CSVダウンロード</Button>
        </Box>
      </Flex>

      <Modal id='modal-dlg' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>取得キー入力</ModalHeader>
          <ModalBody>
            <KeyInput register={register} watch={watch} handleSubmit={handleSubmit} onClose={onClose} setPassword={setPassword} password={password}
              setValidPassword={setValidPassword} onKeyInputClosed={onKeyInputClosed} passwordResult={passwordResult} trigger={trigger}/>
          </ModalBody>
        </ModalContent>
      </Modal>

      <BadgeList portfolioBadges={portfolioBadges} selectedConsumer={selectedConsumer} selectedFramework={selectedFramework} selectedStage={selectedStage}/>
    </>
  )
}

function getKeyName(v: PortfolioBadgeData): string {
  if (v.consumer_name && v.framework_name && v.stage_name) {
    return `${v.consumer_name} ${v.framework_name} ${v.stage_name}`
  }
  return ""
}

function getCsvFileName(cosumerName: string, frameworkName: string, stageName: string): string {
  var fileName = csvFileName
  if (cosumerName?.trim()) {
    fileName += `_${cosumerName.trim()}`
  }
  if (frameworkName?.trim()) {
    fileName += `_${frameworkName.trim()}`
  }
  if (stageName?.trim()) {
    fileName += `_${stageName.trim()}`
  }
  fileName += '.csv'
   // 禁則文字の削除
  var newFileName = fileName.replace(/[\\\/:\*\?\"<>\|]/g, "")
  return newFileName
}

function setErrorMessage(errorMessage: string) {
  var element = document.getElementById('input-error-message') as HTMLElement
  if (element) {
    element.innerText = errorMessage
  }
}