import { Select } from "@chakra-ui/react";
import { ConsumerGoal } from "../../models/OkutepData";
import { placeholderSelect } from "@/constants/messages";

type Props = {
  selectedName: string,
  consumers: ConsumerGoal[],
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
}

export const SelectConsumer = ({ selectedName, consumers, handleChange }: Props) => {
  return (
    <div>
      <Select name='consumer' placeholder={placeholderSelect} onChange={handleChange}>
        {consumers?.map((v, index) => (
          <option key={index} value={makeOptionValue(v)} selected={makeDisplayValue(v) == selectedName}>
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

export function makeDisplayValue(v: ConsumerGoal): string {
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
