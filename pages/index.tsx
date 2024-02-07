import React from "react";

import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { PageTitle } from "@/components/ui/text/Pagetitle";
import dynamic from "next/dynamic";

import type { NextPage } from "next";
import { activateActions } from "@/share/store/activate";
const TopPage = dynamic(() => import("@/components/pages/Top").then((mod) => mod.TopPage), {
  ssr: false,
});

const serviceName = process.env.NEXT_PUBLIC_SERVICE_NAME as string;
const serviceDescription = process.env.NEXT_PUBLIC_SERVICE_DESCRIPTION as string;

const Home: NextPage = () => {
  activateActions.useSetActivate();

  return (
    <Layout maxW="6xl">
      <Metatag title={serviceName} description={serviceDescription} />
      <PageTitle title={serviceName} />
      <TopPage />
    </Layout>
  );
};
export default Home;
