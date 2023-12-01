import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { Portfolio } from "../components/e-portfolio/Portfolio";
import SignIn from "./signin";
import { PasswordResult } from "@/models/PortfolioData";
import { postJudge } from "@/components/api/PortfolioApi";

const serviceName = process.env.NEXT_PUBLIC_SERVICE_NAME as string
const serviceDescription = process.env.NEXT_PUBLIC_SERVICE_DESCRIPTION as string

const Home: NextPage = () => {
  const [judgeHashResult, setJudgeHashResult] = useState(false)
  useEffect(() => {
    const session = sessionStorage.getItem('session_portfolio')
    console.log('session_portfolio:', session)

    const api = async() => {
      if (session) {
        const data = await postJudge(session)
        setJudgeHashResult(data.result == 1)
      }
    }
    api()
  })

  console.log('judgeHashResult', judgeHashResult)
  if (judgeHashResult) {
    return (
      <Layout maxW="6xl">
        <Metatag title={serviceName} description={serviceDescription} />
        <Portfolio />
      </Layout>
    );
  } else {
    return (
      <SignIn/>
    )
  }
};
export default Home;
