import React, { useEffect, useState } from "react";

import { postJudge } from "@/components/api/PortfolioApi";
import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { PageTitle } from "@/components/ui/text/Pagetitle";
import { activationKey } from "@/constants/session";

import SignIn from "./signin";
import { Portfolio } from "../components/e-portfolio/Portfolio";

import type { NextPage } from "next";

const serviceName = process.env.NEXT_PUBLIC_SERVICE_NAME as string;
const serviceDescription = process.env.NEXT_PUBLIC_SERVICE_DESCRIPTION as string;

const Home: NextPage = () => {
  const [judgeHashResult, setJudgeHashResult] = useState(false);
  useEffect(() => {
    const session = localStorage.getItem(activationKey);
    console.log("session_portfolio:", session);

    const api = async () => {
      if (session) {
        const data = await postJudge(session);
        setJudgeHashResult(data.result == 1);
      }
    };
    api();
  });

  console.log("judgeHashResult", judgeHashResult);
  if (judgeHashResult) {
    return (
      <Layout maxW="6xl">
        <Metatag title={serviceName} description={serviceDescription} />
        <PageTitle title={serviceName} />
        <Portfolio />
      </Layout>
    );
  } else {
    return <SignIn />;
  }
};
export default Home;
