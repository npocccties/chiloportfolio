import { messageFailedToUserInfo } from "@/constants/messages";
import { useRouter } from "next/router";

const JwtError = () => {
  const router = useRouter();
  if (typeof window !== 'undefined') {
    window.alert(messageFailedToUserInfo)
    if (router.pathname.indexOf('http://localhost') == -1) {
      router.back();
    }
  }
  return null
};

export default JwtError;
