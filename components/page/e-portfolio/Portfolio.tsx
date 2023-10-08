import React, { useState } from "react"
import { SelectConsumer } from "../../ui/SelectConsumer"
import { useConsumerBadgesList } from "@/components/api/OkutepApi"
import { useWalletBadgeList } from "@/components/api/WalletApi"
import { getCsvText, mergeBadgeData } from "@/components/util/Converter"
import { Button, FormLabel, Grid, WrapItem, Link, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, Wrap, useDisclosure, VStack } from "@chakra-ui/react"
import { BadgeList } from "@/components/ui/BadgeList"
import { KeyInput, KeyInputForm } from "./KeyInput"
import { useForm } from "react-hook-form"
import jconv from "jconv"

export const Portfolio = () => {

  // OKUTEPからバッジ情報の取得
  const { consumerBadges, isLoading, isError } = useConsumerBadgesList()
  const consumerSet = new Set(consumerBadges.map(obj => obj.consumer_name))
  const consumers = []
  consumerSet.forEach(v => consumers.push(v))

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
      <Text mb={2} fontWeight={"bold"}>教育指標選択</Text>
      <Wrap spacing='5'>
        <WrapItem>
          <SelectConsumer consumers={consumers} handleChange={onChangeConsumer} />
        </WrapItem>
        <WrapItem>
          <Link onClick={onOpen}>
            <span className="material-symbols-outlined"><Text fontSize='40px'>vpn_key</Text></span>
          </Link>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>取得キー入力</ModalHeader>
              <ModalBody>
                <KeyInput register={register} watch={watch} handleSubmit={handleSubmit} onClose={onClose} setValidPassword={setValidPassword}/>
              </ModalBody>
            </ModalContent>
          </Modal>
        </WrapItem>
        <WrapItem>
          <Button colorScheme='blue' onClick={onCsvDownload}>CSVダウンロード</Button>
        </WrapItem>
      </Wrap>
      <BadgeList portfolioBadges={portfolioBadges} selectedConsumer={selectedConsumer} validPassword={validPassword} />
      {/* <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              handlePrev={handleClickPrev}
              handleNext={handleClickNext}
              handleMove={handleClickMove}
            /> */}
    </>
  )
}
