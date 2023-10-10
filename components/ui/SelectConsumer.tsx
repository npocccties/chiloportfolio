import { Select } from "@chakra-ui/react";

type Props = {
  w: string,
  consumers: string[],
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
}

export const SelectConsumer = ({ w, consumers, handleChange }: Props) => {
  return (
    <div>
      <Select w={w} placeholder="選択してください" onChange={handleChange}>
        {consumers.map((option, index) => (
          <option key={index} value={option} >
            {option}
          </option>
        ))}
      </Select>
    </div>
  )
}

