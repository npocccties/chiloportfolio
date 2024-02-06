import { useRouter } from "next/router";

import { messageFailedToUserInfo } from "@/constants/messages";

const walletUrl = process.env.NEXT_PUBLIC_WALLET_BASE_URL as string;

const JwtError = () => {
  const router = useRouter();
  if (typeof window !== "undefined") {
    window.alert(messageFailedToUserInfo);
    router.push(walletUrl);
  }
  return null;
};

export default JwtError;
