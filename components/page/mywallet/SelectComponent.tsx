import { useState } from 'react'
import { Select } from "@chakra-ui/react";
import { Consumer } from './data';

type Props = {
  consumers: Consumer[],
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
}

export const SelectComponent = ({ consumers, handleChange }: Props) => {
  return (
    <div>
      <Select placeholder="選択してください" onChange={handleChange}>
        {consumers?.map((option, index) => (
          <option key={index} value={option.consumer_id}>
            {option.name}
          </option>
        ))}
      </Select>
    </div>
  )
}

