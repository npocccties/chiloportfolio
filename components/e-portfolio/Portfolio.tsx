import React, { useEffect, useState } from "react"
import { SelectConsumer, makeDisplayValue } from "./SelectConsumer"
import { getWalletBadgeList, getWalletBadgeListForTest } from "@/components/api/WalletApi"
import { decrypt, getCsvText, mergeBadgeDataWithConsumer, toConsumerBadges } from "@/util/Converter"
import { Button, FormLabel, Link, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure, Box, Flex, HStack } from "@chakra-ui/react"
import { BadgeList } from "@/components/e-portfolio/BadgeList"
import { KeyInput, KeyInputForm } from "./KeyInput"
import { useForm } from "react-hook-form"
import { BiKey } from "react-icons/bi";
import { ConsumerBadgesRequest, PortfolioBadgeData } from "@/models/PortfolioData"
import { Loading } from "../Loading"
import { getConsumerBadgeList, getConsumerGoalList, usePortalCategoryBadgesWithTrigger } from "../api/OkutepApi"
import { ConsumerBadge, ConsumerGoal, PortalCategoryBadges } from "../../models/OkutepData"
import { categoryColumnName, errorTitle, fieldColumnName } from "@/constants/e-portfolio"
import { WalletBadge } from "@/models/WalletData"
import { messageFailedToCallOkutepApi, messageFailedToCallWalletApi, detailReloadWallet, detailContactDeveloper } from "@/constants/messages"
import { ErrorDialog } from "../ErrorDialog"
import { buttonColor, textColor, whiteTextColor } from "@/constants/color"
import { sessionKeyInput, sessionPortfolio } from "@/constants/session"
import { postDecrypt } from "../api/PortfolioApi"

const csvFileName = process.env.NEXT_PUBLIC_CSV_FILE_NAME as string

export const Portfolio = () => {

  const [validPassword, setValidPassword] = useState('')
  const [password, setPassword] = useState('')
  const [selectedConsumerId, setSelectedConsumerId] = useState(-1)
  const [selectedFrameworkId, setSelectedFrameworkId] = useState(-1)
  const [selectedStageId, setSelectedStageId] = useState(-1)
  const [selectedName, setSelectedName] = useState('')
  const [columnName1, setColumnName1] = useState(fieldColumnName)
  const [walletBadges, setWalletBadges] = useState<WalletBadge[]>()
  const [isErrorWalletBadge, setErrorWalletBadge] = useState(false)
  var [consumerGoals, setConsumerGoals] = useState<ConsumerGoal[]>()
  const [isErrorConsumerGoals, setErrorConsumerGoals] = useState(false)
  var [consumerBadges, setConsumerBadges] = useState<ConsumerBadge[]>()
  const [isErrorConsumerBadges, setErrorConsumerBadges] = useState(false)
  const [session, setSession] = useState('')
  useEffect(() => {
    const session = sessionStorage.getItem(sessionPortfolio)
    if (session) {
      setSession(session)
    }
  }, [])
  useEffect(() => {
    const pass = sessionStorage.getItem(sessionKeyInput)
    if (pass) {
      console.log('session_key-input:', pass)
      setValidPassword(pass)
    }
    callOkutepApi(pass ?? '', selectedFrameworkId, selectedStageId)
  }, [])
  console.log('validPassword:', validPassword)

  const callOkutepApi = (encrypted: string, frameworkId: number, stageId: number) => {
    postDecrypt(encrypted).then((res) => {
      const password = res.result
      // OKUTEPから教員育成指標のプルダウン表示用のデータ取得
      getConsumerGoalList(password).then((res) => {
        setErrorConsumerGoals(false)
        setConsumerGoals(res.data as ConsumerGoal[])
      })
      .catch(({res}) => {
        setErrorConsumerGoals(true)
      });
      // OKUTEPから教員育成指標のプルダウン選択時のデータ取得
      if (frameworkId > 0 && stageId > 0) {
        getConsumerBadgeList(password, frameworkId, stageId).then((res) => {
          setErrorConsumerBadges(false)
          setConsumerBadges(res.data as ConsumerBadge[])
        })
        .catch(({res}) => {
          setErrorConsumerBadges(true)
        });
      }    
    }).catch(({res}) => {
      console.log('res3: ', res)
    });
  }

  // イベントに応じて呼び出されるOKUTEPへのリクエスト群
  const { triggerPortalCategoryBadges, portalCategoryBadges, isMutatingPortalCategoryBadges } = usePortalCategoryBadgesWithTrigger()

  useEffect(() => {
    // BadgeWalletからバッジ情報の取得
    getWalletBadgeList().then((res) => {
      setWalletBadges(res.data as WalletBadge[])
    })
    .catch(({res}) => {
      console.log(res)
      setErrorWalletBadge(true)
    });
    //test
    // setWalletBadges(getWalletBadgeListForTest())
    //test
  }, [])
  console.log('walletBadges: ', walletBadges)

  var portfolioBadges: PortfolioBadgeData[] = []
  if (selectedConsumerId != -1) {
    if (selectedConsumerId != 0) {
      // ウォレットのバッジ情報とOKUTEPのバッジ情報をマージ
      if (consumerBadges && consumerBadges.length != 0 && walletBadges && walletBadges.length != 0) {
        portfolioBadges = mergeBadgeDataWithConsumer(consumerBadges, walletBadges)
        console.log('portfolioBadges: ', portfolioBadges)
      }
    } else {
      // OKUTEPのポータルカテゴリに紐づくバッジ情報をマージ
      if (portalCategoryBadges && portalCategoryBadges.badges.length != 0 && walletBadges && walletBadges.length != 0) {
        portfolioBadges = mergeBadgeDataWithConsumer(toConsumerBadges(portalCategoryBadges.badges), walletBadges)
        console.log('portfolioBadges: ', portfolioBadges)
      }
    }
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
  var categoryGoal: ConsumerGoal = {
    consumer_id: 0,
    consumer_name: categoryColumnName,
    framework_id: 0,
    framework_name: '',
    stage_id: 0,
    stage_name: '',
    field1_name: ''
  }
  consumers.push(categoryGoal)
  console.log('consumers: ', consumers)

  // 教員育成指標のプルダウン選択時のハンドラ
  const onChangeConsumer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const array = e.target.value.split(',')
    if (array.length == 1) {
      setConsumerBadges([] as ConsumerBadge[])
      return
    }
    var consumerId = Number(array[0])
    var frameworkId = Number(array[1])
    var stageId = Number(array[2])
    console.log(`consumerId: ${consumerId} frameworkId: ${frameworkId} stageId: ${stageId}`)

    if (consumerId == 0 && frameworkId == 0 && stageId == 0) {
      // OKUTEPからポータルカテゴリに紐づくバッジ情報の取得
      triggerPortalCategoryBadges()
      setColumnName1(categoryColumnName)
    } else {
      setColumnName1(fieldColumnName)
    }

    setSelectedConsumerId(consumerId)
    setSelectedFrameworkId(frameworkId)
    setSelectedStageId(stageId)

    console.log('callOkutepApi2:', validPassword, selectedFrameworkId, selectedStageId)
    callOkutepApi(validPassword, frameworkId, stageId)

    const targets = consumers.filter(v => v.consumer_id == consumerId && v.framework_id == frameworkId && v.stage_id == stageId)
    if (targets.length != 0) {
      const name = makeDisplayValue(targets[0])
      setSelectedName(name)
      console.log('selectedName: ', name)
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

  // CSVダウンロード
  const onCsvDownload = () => {
    const categories = getCategories(selectedConsumerId, consumerGoals, portalCategoryBadges)
    const v = portfolioBadges[0]
    var text = getCsvText(columnName1, categories, portfolioBadges)
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

  if (isMutatingPortalCategoryBadges) {
     return <Loading/>
  }
  if (isErrorConsumerGoals) {
    return <ErrorDialog title={errorTitle} message={messageFailedToCallOkutepApi} detail={detailContactDeveloper}/>
  }
  if (isErrorWalletBadge) {
    return <ErrorDialog title={errorTitle} message={messageFailedToCallWalletApi} detail={detailReloadWallet}/>
  }
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
            <SelectConsumer selectedName={selectedName} consumers={consumers} handleChange={onChangeConsumer} />
            <Link onClick={onOpen}>
              <Text fontSize='40px' color={textColor}><BiKey/></Text>
            </Link>
          </HStack>
        </Box>
        <Box mt={4}>
          <Button bg={buttonColor} color={whiteTextColor} onClick={onCsvDownload} isDisabled={selectedConsumerId == -1}>CSVダウンロード</Button>
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
            <SelectConsumer selectedName={selectedName} consumers={consumers} handleChange={onChangeConsumer} />
            <Link onClick={onOpen}>
              <Text fontSize='40px' color={textColor}><BiKey/></Text>
            </Link>
          </HStack>
        </Box>
        <Box w={"full"} mt={8}>
          <Button w={"full"} bg={buttonColor} color={whiteTextColor} onClick={onCsvDownload} isDisabled={selectedConsumerId == -1}>CSVダウンロード</Button>
        </Box>
      </Flex>

      <Modal id='modal-dlg' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>取得キー入力</ModalHeader>
          <ModalBody>
            <KeyInput register={register} watch={watch} handleSubmit={handleSubmit} onClose={onClose} setPassword={setPassword} password={password}
              onKeyInputClosed={onKeyInputClosed} callOkutepApi={callOkutepApi} selectedFrameworkId={selectedFrameworkId} selectedStageId={selectedStageId}
              setValidPassword={setValidPassword} session={session}/>
          </ModalBody>
        </ModalContent>
      </Modal>

      <BadgeList columnName1={columnName1} portfolioBadges={portfolioBadges}/>
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

function getCategories(
  selectedConsumerId: number
  , consumerGoals: ConsumerGoal[] | undefined | null
  , portalCategoryBadges: PortalCategoryBadges | undefined | null): Array<string>
{
  var categories = new Set<string>()
  if (selectedConsumerId != 0) {
    if (consumerGoals) {
      for (const [i, v] of consumerGoals.entries()) {
        categories.add(v.field1_name)
      }
    }
  } else {
    if (portalCategoryBadges) {
      for (const [i, v] of portalCategoryBadges.badges.entries()) {
        categories.add(v.portal_category_name)
      }
    }
  }
  return Array.from(categories).sort((a: string, b: string) => { if (a > b) { return 1 } else { return -1 }})
}