import { ConsumerBadge, PortalCategoryBadges } from "@/models/OkutepData";
import { PortfolioBadgeData } from "@/models/PortfolioData";
import { WalletBadge } from "@/models/WalletData";
import { toConsumerBadges, mergeBadgeDataWithConsumer } from "@/util/Converter";

export const displayPortfolioBadges = ({
  portalCategoryBadges,
  selectedConsumerId,
  consumerBadges,
  walletBadges,
}: {
  portalCategoryBadges?: PortalCategoryBadges;
  selectedConsumerId: number;
  consumerBadges?: ConsumerBadge[];
  walletBadges?: WalletBadge[];
}): PortfolioBadgeData[] => {
  let portfolioBadges: PortfolioBadgeData[] = [];

  const allBadges = portalCategoryBadges ? toConsumerBadges(portalCategoryBadges.badges) : [];
  if (selectedConsumerId != -1) {
    if (selectedConsumerId != 0) {
      // ウォレットのバッジ情報とOKUTEPのバッジ情報をマージ
      if (consumerBadges && consumerBadges.length != 0 && walletBadges && walletBadges.length != 0) {
        portfolioBadges = mergeBadgeDataWithConsumer(consumerBadges, walletBadges, allBadges);
      }
    } else {
      // OKUTEPのポータルカテゴリに紐づくバッジ情報をマージ
      if (portalCategoryBadges && portalCategoryBadges.badges.length != 0 && walletBadges && walletBadges.length != 0) {
        portfolioBadges = mergeBadgeDataWithConsumer(allBadges, walletBadges, allBadges);
      }
    }
  }

  return portfolioBadges;
};
