import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { Portfolio } from "../components/e-portfolio/Portfolio";
import SignIn from "./signin";
import { PasswordResult } from "@/models/PortfolioData";

const serviceName = process.env.NEXT_PUBLIC_SERVICE_NAME as string
const serviceDescription = process.env.NEXT_PUBLIC_SERVICE_DESCRIPTION as string

const Home: NextPage = () => {
  const [judgeHashResult, setJudgeHashResult] = useState(false)
  useEffect(() => {
    const session = sessionStorage.getItem('session_portfolio')
    console.log('session_portfolio:', session)

    const api = async() => {
      const res = await fetch('/api/judge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ session }),
      })
      const data = await res.json() as PasswordResult
      setJudgeHashResult(data.result == 1)
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
