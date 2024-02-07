import { useEffect } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

import { recoilAtomKeys } from "@/share/store/keys";
import { postAuth, postJudge } from "@/components/api/PortfolioApi";
import { activationKey } from "@/constants/session";
import { AuthResult } from "@/models/OkutepData";

export type ActivateStateGetters = {
  useActivateState: () => boolean | undefined;
};

export type ActivateStateActions = {
  useSetActivate: () => void;
  useSetInitializeActivate: () => {
    setInitializeActivate: (password: string) => Promise<AuthResult>;
  };
};

const activateState = atom<boolean>({
  key: recoilAtomKeys.activate,
  default: undefined,
});

const useActivateState = () => {
  return useRecoilValue(activateState);
};

export const activateStateGetters: ActivateStateGetters = {
  useActivateState,
};

/**
 * 画面表示時の状態取得Action
 */
const useSetActivate = () => {
  const setState = useSetRecoilState(activateState);

  const setResult = async () => {
    const session = localStorage.getItem(activationKey);
    if (session) {
      const data = await postJudge(session);
      setState(data.result == 1);
    } else {
      setState(false);
    }
  };

  useEffect(() => {
    setResult();
  }, []);
};

/**
 * 利用キー入力時のAction
 */
const useSetInitializeActivate = () => {
  const setState = useSetRecoilState(activateState);

  const setInitializeActivate = async (password: string) => {
    const authResult = await postAuth(password);
    if (typeof window !== undefined) {
      localStorage.setItem(activationKey, authResult.result);
    }

    setState(authResult.result !== "");
    return authResult;
  };

  return { setInitializeActivate };
};

export const activateActions: ActivateStateActions = {
  useSetActivate,
  useSetInitializeActivate,
};
