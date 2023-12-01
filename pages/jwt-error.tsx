import { messageFailedToUserInfo } from "@/constants/messages";

const JwtError = () => {
  if (typeof window !== 'undefined') {
    window.alert(messageFailedToUserInfo)
    window.close()
  }
  return null
};

export default JwtError;
