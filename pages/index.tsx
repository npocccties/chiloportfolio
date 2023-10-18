import React from "react";

import type { NextPage } from "next";

import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { Text } from "@chakra-ui/react";

const serviceName = process.env.NEXT_PUBLIC_SERVICE_NAME as string
const serviceDescription = process.env.NEXT_PUBLIC_SERVICE_DESCRIPTION as string

const Home: NextPage = () => {
  return (
    <Layout maxW="6xl">
      <Metatag title={serviceName} description={serviceDescription} />
      <Text>This is root page.</Text>
    </Layout>
  );
};

export default Home;
