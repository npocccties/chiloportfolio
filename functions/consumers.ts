import { categoryColumnName } from "@/constants/e-portfolio";
import { ConsumerGoal } from "@/models/OkutepData";

export const CreateDataForConsumerGoalsPulldown = ({
  consumerGoals,
}: {
  consumerGoals?: ConsumerGoal[];
}): ConsumerGoal[] => {
  const consumers: ConsumerGoal[] = [];

  if (consumerGoals) {
    for (const [i, v] of consumerGoals.entries()) {
      const targets = consumers.filter(
        (v2) => v.consumer_id == v2.consumer_id && v.framework_id == v2.framework_id && v.stage_id == v2.stage_id,
      );
      if (targets.length != 0) {
        continue;
      }
      consumers.push(v);
    }
  }

  const categoryGoal: ConsumerGoal = {
    consumer_id: 0,
    consumer_name: categoryColumnName,
    framework_id: 0,
    framework_name: "",
    stage_id: 0,
    stage_name: "",
    field1_name: "",
  };
  consumers.push(categoryGoal);

  return consumers ?? [];
};
