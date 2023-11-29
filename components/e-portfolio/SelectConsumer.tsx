import { Select } from "@chakra-ui/react";
import { ConsumerGoal } from "../../models/OkutepData";

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
  return `${v.consumer_id},${v.framework_id},${v.stage_id}`
}

function makeDisplayValue(v: ConsumerGoal): string {
  var displayValue = ''
  if (v.consumer_name) {
    displayValue += `${v.consumer_name}`
  }
  if (v.framework_name) {
    displayValue += ` ${v.framework_name}`
  }
  if (v.stage_name) {
    displayValue += ` ${v.stage_name}`
  }
  return displayValue
}
