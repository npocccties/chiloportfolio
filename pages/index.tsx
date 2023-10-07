import React from "react";

import type { NextPage } from "next";

import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { Portfolio } from "@/components/page/e-portfolio/Portfolio";
import { SERVICE_NAME, SERVICE_DESCRITION } from "@/configs";

const Home: NextPage = () => {
  return (
    <Layout maxW="6xl">
      <Metatag title={SERVICE_NAME} description={SERVICE_DESCRITION} />
      <Portfolio />
    </Layout>
  );
};

export default Home;
