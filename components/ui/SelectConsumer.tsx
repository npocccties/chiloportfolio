import { useState } from 'react'
import { Select } from "@chakra-ui/react";
import { ConsumerBadges } from '../response/OkutepResponse';

type Props = {
  consumers: string[],
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
}

export const SelectConsumer = ({ consumers, handleChange }: Props) => {
  return (
    <div>
      <Select placeholder="選択してください" onChange={handleChange}>
        {consumers.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </div>
  )
}

