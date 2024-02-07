import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { getWalletBadgeListForTest } from "@/components/api/WalletApi";
import { BadgeList } from "@/components/e-portfolio/BadgeList";
import { categoryColumnName, errorTitle, fieldColumnName } from "@/constants/e-portfolio";
import {
  messageFailedToCallOkutepApi,
  messageFailedToCallWalletApi,
  detailReloadWallet,
  detailContactDeveloper,
} from "@/constants/messages";
import { sessionKeyInput } from "@/constants/session";
import { getCategories } from "@/functions/categories";
import { CreateDataForConsumerGoalsPulldown } from "@/functions/consumers";
import { downloadCsvForPortfolio } from "@/functions/csv";
import { displayPortfolioBadges } from "@/functions/portfolioBadges";
import { WalletBadge } from "@/models/WalletData";

import { KeyInput } from "./KeyInput";
import { Operation } from "./Operation";
import { ConsumerBadge, ConsumerGoal, PortalCategoryBadges } from "../../models/OkutepData";
import { getConsumerBadgeList, getConsumerGoalList, getPortalCategoryBadges } from "../api/OkutepApi";
import { postDecrypt } from "../api/PortfolioApi";
import { ErrorDialog } from "../ErrorDialog";

const defaultSelectValue = -1;
export type SelectedValue = {
  consumerId: number;
  frameworkId: number;
  stageId: number;
};
const defaultSelectedObject = {
  consumerId: defaultSelectValue,
  frameworkId: defaultSelectValue,
  stageId: defaultSelectValue,
};

export const Portfolio = () => {
  const [decryptedSessionKey, setDecryptedSessionKey] = useState("");
  const [selectedValue, setSelectedValue] = useState<SelectedValue>(defaultSelectedObject);
  const [columnNameForFirst, setColumnNameForFirst] = useState(fieldColumnName);
  const [walletBadges, setWalletBadges] = useState<WalletBadge[]>();
  const [consumerGoals, setConsumerGoals] = useState<ConsumerGoal[]>();
  const [consumerBadges, setConsumerBadges] = useState<ConsumerBadge[]>();
  const [portalCategoryBadges, setPortalCategoryBadges] = useState<PortalCategoryBadges>();
  const [isErrors, setIsErrors] = useState({
    walletBadges: false,
    consumerGoals: false,
    consumerBadges: false,
    portalCategoryBadges: false,
  });

  // キー入力のダイアログとの連携
  const { isOpen, onClose, onOpen } = useDisclosure();

  const convertDecryptedSessionKey = async (encrypted: string | null | undefined) => {
    if (!encrypted || encrypted === "") return "";
    const res = await postDecrypt(encrypted);
    return res.result;
  };

  const isCsvDownloadDisabled = selectedValue.consumerId === defaultSelectValue;

  const portfolioBadges = displayPortfolioBadges({
    portalCategoryBadges,
    selectedConsumerId: selectedValue.consumerId,
    consumerBadges,
    walletBadges,
  });

  // 教員育成指標のプルダウン表示用のデータ作成
  const consumers = CreateDataForConsumerGoalsPulldown({
    consumerGoals,
  });

  // 教員育成指標のプルダウン選択時のハンドラ
  const onChangeConsumer = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const array = e.target.value.split(",");
    if (array.length == 1) {
      setConsumerBadges([] as ConsumerBadge[]);
      setPortalCategoryBadges(undefined);
      setSelectedValue(defaultSelectedObject);
      return;
    }
    const consumerId = Number(array[0]);
    const frameworkId = Number(array[1]);
    const stageId = Number(array[2]);
    console.log(`consumerId: ${consumerId} frameworkId: ${frameworkId} stageId: ${stageId}`);

    // カテゴリ選択時に、データ表示部、ヘッダー1列目のカラム名を「カテゴリ」にする
    if (consumerId === 0 && frameworkId === 0 && stageId === 0) {
      setColumnNameForFirst(categoryColumnName);
    } else {
      setColumnNameForFirst(fieldColumnName);
    }

    setSelectedValue({ consumerId, frameworkId, stageId });

    if (frameworkId > 0 && stageId > 0) {
      try {
        const { data: consumerBadgeList } = await getConsumerBadgeList(decryptedSessionKey, frameworkId, stageId);
        setIsErrors({ ...isErrors, consumerBadges: false });
        setConsumerBadges(consumerBadgeList as ConsumerBadge[]);
      } catch {
        setIsErrors({ ...isErrors, consumerBadges: true });
      }
    }

    try {
      const { data: portalCategoryBadges } = await getPortalCategoryBadges();
      setIsErrors({ ...isErrors, portalCategoryBadges: false });
      setPortalCategoryBadges(portalCategoryBadges as PortalCategoryBadges);
    } catch {
      setIsErrors({ ...isErrors, portalCategoryBadges: true });
    }

    // BadgeWalletからバッジ情報の取得
    try {
      const walletBadges = await getWalletBadgeList();
      setIsErrors({ ...isErrors, walletBadges: false });
      setWalletBadges(walletBadges.data as WalletBadge[]);
    } catch {
      setIsErrors({ ...isErrors, walletBadges: true });
    }
    //test
    // setWalletBadges(getWalletBadgeListForTest());
    //test
  };

  // CSVダウンロード
  const onCsvDownload = () => {
    const { consumerId, frameworkId, stageId } = selectedValue;
    const categories = getCategories(consumerId, frameworkId, stageId, consumerGoals, portalCategoryBadges);

    if (portfolioBadges.length === 0) {
      alert("出力するデータがありません");
      return;
    }

    downloadCsvForPortfolio({ columnName1: columnNameForFirst, categories, portfolioBadges });
  };

  useEffect(() => {
    (async () => {
      const enctyptedSessionKey = localStorage.getItem(sessionKeyInput);
      const decryptedSessionKey = await convertDecryptedSessionKey(enctyptedSessionKey);

      try {
        const { data: goalList } = await getConsumerGoalList(decryptedSessionKey);
        setIsErrors({ ...isErrors, consumerGoals: false });
        setConsumerGoals(goalList as ConsumerGoal[]);
      } catch {
        setIsErrors({ ...isErrors, consumerGoals: true });
      }

      setDecryptedSessionKey(decryptedSessionKey);
    })();
  }, []);

  if (isErrors.consumerGoals || isErrors.consumerBadges || isErrors.portalCategoryBadges) {
    return <ErrorDialog title={errorTitle} message={messageFailedToCallOkutepApi} detail={detailContactDeveloper} />;
  }
  if (isErrors.walletBadges) {
    return <ErrorDialog title={errorTitle} message={messageFailedToCallWalletApi} detail={detailReloadWallet} />;
  }
  return (
    <>
      <Operation
        consumers={consumers}
        onOpen={onOpen}
        onCsvDownload={onCsvDownload}
        onChangeConsumer={onChangeConsumer}
        isCsvDownloadDisabled={isCsvDownloadDisabled}
      />
      <Modal id="modal-dlg" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>取得キー入力</ModalHeader>
          <ModalBody>
            <KeyInput
              onClose={onClose}
              setDecryptedSessionKey={setDecryptedSessionKey}
              setConsumerGoals={setConsumerGoals}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      <BadgeList portfolioBadges={portfolioBadges} columnNameForFirst={columnNameForFirst} />
    </>
  );
};
