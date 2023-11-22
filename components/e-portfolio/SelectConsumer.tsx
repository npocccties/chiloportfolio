import { Select } from "@chakra-ui/react";
import { PortfolioBadgeData } from "../data/PortfolioData";
import { ConsumerGoal } from "../data/OkutepData";

type Props = {
  selectedConsumerId: number,
  selectedFrameworkId: number,
  selectedStageId: number,
  consumers: ConsumerGoal[],
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
}

export const SelectConsumer = ({ selectedConsumerId, selectedFrameworkId, selectedStageId, consumers, handleChange }: Props) => {
  return (
    <div>
      <Select name='consumer' placeholder="選択してください" onChange={handleChange}>
        {consumers?.map((v, index) => (
          <option key={index} value={makeOptionValue(v)} selected={v.consumer_id && selectedConsumerId && v.framework_id == selectedFrameworkId && v.stage_id == selectedStageId ? true : undefined}>
            {makeDisplayValue(v)}
          </option>
        ))}
      </Select>
    </div>
  )
}

function makeOptionValue(v: ConsumerGoal): string {
  if (v.framework_id && v.stage_id) {
    return `${v.consumer_id},${v.framework_id},${v.stage_id}`
  }
  return ""
}

function makeDisplayValue(v: ConsumerGoal): string {
  if (v.consumer_name && v.framework_name && v.stage_name) {
    return `${v.consumer_name} ${v.framework_name} ${v.stage_name}`
  }
  return ""
}
