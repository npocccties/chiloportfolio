import React from "react";

import type { NextPage } from "next";

import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { Portfolio } from "../components/e-portfolio/Portfolio";

const serviceName = process.env.NEXT_PUBLIC_SERVICE_NAME as string
const serviceDescription = process.env.NEXT_PUBLIC_SERVICE_DESCRIPTION as string

const Home: NextPage = () => {
  return (
    <Layout maxW="6xl">
      <Metatag title={serviceName} description={serviceDescription} />
      <Portfolio />
    </Layout>
  );
};

export default Home;
