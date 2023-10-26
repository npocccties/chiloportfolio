import { Select } from "@chakra-ui/react";

type Props = {
  selectedConsumer: string,
  consumers: string[],
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
}

export const SelectConsumer = ({ selectedConsumer, consumers, handleChange }: Props) => {
  return (
    <div>
      <Select name='consumer' placeholder="選択してください" onChange={handleChange}>
        <optgroup>
          {consumers.map((option, index) => (
            <option key={index} value={option} selected={option == selectedConsumer ? true : undefined}>
              {option}
            </option>
          ))}
        </optgroup>
      </Select>
    </div>
  )
}
