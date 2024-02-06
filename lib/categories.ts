import { ConsumerGoal, PortalCategoryBadges } from "@/models/OkutepData";

export function getCategories(
  selectedConsumerId: number,
  selectFrameworkId: number,
  selectStageId: number,
  consumerGoals: ConsumerGoal[] | undefined | null,
  portalCategoryBadges: PortalCategoryBadges | undefined | null,
): Array<string> {
  var categories = new Set<string>();
  if (selectedConsumerId != 0) {
    if (consumerGoals) {
      const selectConsumerCoals = consumerGoals.filter(
        (x) =>
          x.consumer_id === selectedConsumerId && x.framework_id === selectFrameworkId && x.stage_id === selectStageId,
      );

      for (const [i, v] of selectConsumerCoals.entries()) {
        categories.add(v.field1_name);
      }
    }
  } else {
    if (portalCategoryBadges) {
      for (const [i, v] of portalCategoryBadges.badges.entries()) {
        categories.add(v.portal_category_name);
      }
    }
  }

  return Array.from(categories).sort((a: string, b: string) => {
    if (a > b) {
      return 1;
    } else {
      return -1;
    }
  });
}
