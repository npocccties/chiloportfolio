import jsonwebtoken from "jsonwebtoken";

type UserInfo = {
  eppn: string;
  displayName: string;
};

export const getUserInfoFormJwt = (jwt: string): UserInfo | null => {
  try {
    const decodeJwt = <UserInfo>jsonwebtoken.decode(jwt);
    jsonwebtoken.verify(jwt, )

    if (!decodeJwt) {
      return null
    }

    return decodeJwt;
  } catch (e) {
    console.log('exception:', e)
    return null
  }
};
