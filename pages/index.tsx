import React from "react";
import type { NextPage } from "next";
import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { Portfolio } from "../components/e-portfolio/Portfolio";
import { useSession, signIn, signOut } from "next-auth/react"
import { Loading } from "@/components/Loading";
import SignIn from "./auth/signin";

const serviceName = process.env.NEXT_PUBLIC_SERVICE_NAME as string
const serviceDescription = process.env.NEXT_PUBLIC_SERVICE_DESCRIPTION as string

const Home: NextPage = () => {
  // const { data: session, status } = useSession()
  // const loading = status === "loading"
  // if (loading) {
  //     return <Loading/>
  // }
  // if (session) {
    return (
      <Layout maxW="6xl">
        <Metatag title={serviceName} description={serviceDescription} />
        <Portfolio />
      </Layout>
    );
  // }
  // return (
  //   <SignIn/>
  // )
};

export default Home;
