import { Select } from "@chakra-ui/react";

type Props = {
  consumers: string[],
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
}

export const SelectConsumer = ({ consumers, handleChange }: Props) => {
  return (
    <div>
      <Select  w={'270px'} placeholder="選択してください" onChange={handleChange}>
        {consumers.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </div>
  )
}

