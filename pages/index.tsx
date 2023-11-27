import React from "react";
import type { NextPage } from "next";
import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { Portfolio } from "../components/e-portfolio/Portfolio";
import { useSession, signIn, signOut } from "next-auth/react"
import { Loading } from "@/components/Loading";
import SignIn from "./auth/signin";
import { GetServerSideProps } from "next";
import { loggerInfo } from "@/components/util/Logger";
import { verifyOrthrosJwt } from "@/components/lib/verifyJwt";

const serviceName = process.env.NEXT_PUBLIC_SERVICE_NAME as string
const serviceDescription = process.env.NEXT_PUBLIC_SERVICE_DESCRIPTION as string

type HomeProps = {
};

const Home: NextPage = ({}: HomeProps) => {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  if (loading) {
      return <Loading/>
  }
  if (session) {
    return (
      <Layout maxW="6xl">
        <Metatag title={serviceName} description={serviceDescription} />
        <Portfolio />
      </Layout>
    );
  }
  return (
    <SignIn/>
  )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const errorPath = '/jwt-error'
  const session_cookie = context.req.cookies["session_cookie"];
  if (session_cookie == null) {
    loggerInfo(`Not found session_cookie.`);
    return {
      redirect: {
        destination: errorPath,
        permanent: false,
      }
    }
  }
  const verify = await verifyOrthrosJwt(session_cookie);
  if (!verify) {
    loggerInfo(`Failed to verification (session_cookie).`);
    return {
      redirect: {
        destination: errorPath,
        permanent: false,
      }
    }
  }
  return {
    props: {},
  };
};

export default Home;
