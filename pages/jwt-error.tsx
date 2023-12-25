import { messageFailedToUserInfo } from "@/constants/messages";
import { useRouter } from "next/router";

const walletUrl = process.env.NEXT_PUBLIC_WALLET_BASE_URL as string

const JwtError = () => {
  const router = useRouter();
  if (typeof window !== 'undefined') {
    window.alert(messageFailedToUserInfo)
    // router.push(walletUrl);
    window.close()
  }
  return null
};

export default JwtError;
