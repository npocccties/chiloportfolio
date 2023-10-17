import React, { useState } from "react"
import { SelectConsumer } from "../ui/SelectConsumer"
import { getJSON, useConsumerBadgesList } from "@/components/api/OkutepApi"
import { useWalletBadgeList } from "@/components/api/WalletApi"
import { getCsvText, mergeBadgeData } from "@/components/util/Converter"
import { Button, FormLabel, Link, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure, Box, Flex, HStack, Spinner } from "@chakra-ui/react"
import { BadgeList } from "@/components/ui/BadgeList"
import { KeyInput, KeyInputForm } from "./KeyInput"
import { useForm } from "react-hook-form"
import jconv from "jconv"
import { BiKey } from "react-icons/bi";
import { PortfolioBadgeData } from "@/components/data/PortfolioData"
import axios from "axios"
const csvFileName = process.env.NEXT_PUBLIC_CSV_FILE_NAME as string

export const Portfolio = () => {

  const [json, setJson] = useState(null)
  React.useEffect(() => {
    const url = "https://yesno.wtf/api";
    axios.get(url).then((response) =>{
      setJson(response.data)
      console.log(response.data)
    })
  }, []);

  if (!json) return <Spinner/>
  return (
    <>
    OK
    </>
  )
}

function getKeyName(v: PortfolioBadgeData): string {
  return `${v.consumer_name} ${v.framework_name} ${v.stage_name}`
}
