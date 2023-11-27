import jsonwebtoken from "jsonwebtoken";

type UserInfo = {
  eppn: string;
  displayName: string;
};

export const getUserInfoFormJwt = (session_cookie: string): UserInfo | null => {
  try {
    const decodeJwt = <UserInfo>jsonwebtoken.decode(session_cookie);

    if (!decodeJwt) {
      return null
    }

    return decodeJwt;
  } catch (e) {
    console.log('exception:', e)
    return null
  }
};
