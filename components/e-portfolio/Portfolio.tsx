import React, { useState } from "react"
import { SelectConsumer } from "./SelectConsumer"
import { useWalletBadgeList } from "@/components/api/WalletApi"
import { getCsvText, mergeBadgeDataWithConsumer } from "@/components/util/Converter"
import { Button, FormLabel, Link, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure, Box, Flex, HStack } from "@chakra-ui/react"
import { BadgeList } from "@/components/e-portfolio/BadgeList"
import { KeyInput, KeyInputForm } from "./KeyInput"
import { useForm } from "react-hook-form"
import jconv from "jconv"
import { BiKey } from "react-icons/bi";
import { ConsumerBadgesRequest, PortfolioBadgeData } from "@/components/data/PortfolioData"
import { Loading } from "../Loading"
import { useConsumerBadgesWithTrigger, useConsumerGoals, useConsumerGoalsWithTrigger, usePasswordCheckWithTrigger } from "../api/OkutepApi"
import { ConsumerGoal } from "../data/OkutepData"
const csvFileName = process.env.NEXT_PUBLIC_CSV_FILE_NAME as string

export const Portfolio = () => {

  const [validPassword, setValidPassword] = useState('')
  const [password, setPassword] = useState('')
  const [passwordResult, setPasswordResult] = useState(-1)
  const [selectedConsumerId, setSelectedConsumerId] = useState(0)
  const [selectedFrameworkId, setSelectedFrameworkId] = useState(0)
  const [selectedStageId, setSelectedStageId] = useState(0)

  // OKUTEPから教員育成指標のプルダウン表示用のデータ取得
  var { consumerGoals, isLoadingConsumerGoals, isErrorConsumerGoals} = useConsumerGoals()

  // イベントに応じて呼び出されるOKUTEPへのリクエスト群
  const { triggerConsumerGoals, consumerGoalsEx, isMutatingConsumerGoals } = useConsumerGoalsWithTrigger()
  var { triggerConsumerBadges, consumerBadgesEx, isMutatingConsumerBadges } = useConsumerBadgesWithTrigger()
  const { triggerPasswordCheck, isMutatingPasswordCheck } = usePasswordCheckWithTrigger(setPasswordResult)

  console.log('consumerGoalsEx: ', consumerGoalsEx)
  console.log('consumerBadgesEx: ', consumerBadgesEx)
  console.log('passwordResult: ', passwordResult)

  // トリガー指定のリクエスト結果があれば、それを優先する
  consumerGoals = consumerGoalsEx ? consumerGoalsEx : consumerGoals

  // BadgeWalletからバッジ情報の取得
  const { walletBadges, isLoadingWB, isErrorWB } = useWalletBadgeList()

  var portfolioBadges: PortfolioBadgeData[] = []
  // ウォレットのバッジ情報とOKUTEPのバッジ情報をマージ
  if (consumerBadgesEx && walletBadges && walletBadges.length != 0) {
    portfolioBadges = mergeBadgeDataWithConsumer(consumerBadgesEx, walletBadges)
    console.log('portfolioBadges: ', portfolioBadges)
  }

  // 教員育成指標のプルダウン表示用のデータ作成
  var consumers: ConsumerGoal[] = []
  if (consumerGoals) {
    for (const [i, v] of consumerGoals.entries()) {
      const targets = consumers.filter(v2 => v.consumer_id == v2.consumer_id && v.framework_id == v2.framework_id && v.stage_id == v2.stage_id)
      if (targets.length != 0) {
        continue
      }
      consumers.push(v)
    }
  }
  console.log('consumers: ', consumers)

  // 教員育成指標のプルダウン選択時のハンドラ
  const onChangeConsumer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const array = e.target.value.split(',')
    if (array.length == 1) {
      // テーブルの内容をクリアする
      var tb = document.getElementById('badge-list') as HTMLTableElement
      console.log('tb.rows.length', tb.rows.length)
      while(tb.rows.length > 1) {
        tb.deleteRow(1);
      }
      return
    }
    const consumerId = Number(array[0])
    const frameworkId = Number(array[1])
    const stageId = Number(array[2])
    console.log(`consumerId: ${consumerId} frameworkId: ${frameworkId} stageId: ${stageId}`)

    const pass = getPassword(validPassword, password)
    console.log('pass:', pass)
    // OKUTEPから教員育成指標のプルダウン表示用のデータ取得（トリガー指定）
    triggerConsumerGoals(pass)
    const consumerBadgesRequest: ConsumerBadgesRequest = {
      password: pass,
      framework_id: frameworkId,
      stage_id: stageId,
    }
    // OKUTEPからテーブル表示用のデータ取得（トリガー指定）
    triggerConsumerBadges(consumerBadgesRequest)

    setSelectedConsumerId(consumerId)
    setSelectedFrameworkId(frameworkId)
    setSelectedStageId(stageId)
  }

  // キー入力のダイアログとの連携
  const { isOpen, onClose, onOpen } = useDisclosure()
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<KeyInputForm>()

  // CSVダウンロード
  const onCsvDownload = () => {
    if (!consumerGoals || consumerGoals.length == 0) {
      return
    }
    const v = portfolioBadges[0]
    var text = getCsvText(consumerGoals, portfolioBadges)
    var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const blob = new Blob([bom, text], {type: 'text/csv'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    document.body.appendChild(a)
    a.download = getCsvFileName(v.consumer_name, v.framework_name, v.stage_name)
    a.href = url
    a.click()
    a.remove()
    URL.revokeObjectURL(url)    
  }

  const onKeyInputClosed = () => {
  }
  console.log('selectedConsumerId: ', selectedConsumerId)
  console.log('selectedFrameworkId: ', selectedFrameworkId)
  console.log('selectedStageId: ', selectedStageId)

  if (isLoadingConsumerGoals || isLoadingWB || isMutatingConsumerBadges || isMutatingConsumerGoals) return <Loading/>
  if (isErrorConsumerGoals || isErrorWB) return <div>failed to load</div>

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
            <SelectConsumer selectedConsumerId={selectedConsumerId} selectedFrameworkId={selectedFrameworkId} selectedStageId={selectedStageId} consumers={consumers} handleChange={onChangeConsumer} />
            <Link onClick={onOpen}>
              <Text fontSize='40px'><BiKey/></Text>
            </Link>
          </HStack>
        </Box>
        <Box mt={4}>
          <Button colorScheme='blue' onClick={onCsvDownload} isDisabled={selectedConsumerId == 0}>CSVダウンロード</Button>
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
            <SelectConsumer selectedConsumerId={selectedConsumerId} selectedFrameworkId={selectedFrameworkId} selectedStageId={selectedStageId} consumers={consumers} handleChange={onChangeConsumer} />
            <Link onClick={onOpen}>
              <Text fontSize='40px'><BiKey/></Text>
            </Link>
          </HStack>
        </Box>
        <Box w={"full"} mt={8}>
          <Button w={"full"} colorScheme='blue' onClick={onCsvDownload} isDisabled={selectedConsumerId == 0}>CSVダウンロード</Button>
        </Box>
      </Flex>

      <Modal id='modal-dlg' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>取得キー入力</ModalHeader>
          <ModalBody>
            <KeyInput register={register} watch={watch} handleSubmit={handleSubmit} onClose={onClose} setPassword={setPassword} password={password}
              setValidPassword={setValidPassword} onKeyInputClosed={onKeyInputClosed} passwordResult={passwordResult} triggerPasswordCheck={triggerPasswordCheck}
              triggerConsumerGoals={triggerConsumerGoals}/>
          </ModalBody>
        </ModalContent>
      </Modal>

      <BadgeList portfolioBadges={portfolioBadges}/>
    </>
  )
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

function getPassword(validPassword: string, password: string): string {
  return validPassword && password == validPassword ? validPassword : ''
}
