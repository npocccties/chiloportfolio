import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { SelectConsumer } from "../../ui/SelectConsumer";
import { useConsumerBadgesList } from "@/components/api/OkutepApi";
import { Box, FormLabel, HStack } from "@chakra-ui/react";
import { BadgeList } from "@/components/ui/BadgeList";

export const Portfolio = () => {

  const { consumerBadges, isLoading, isError } = useConsumerBadgesList()
  console.log('consumerBadges: ', consumerBadges)
  const consumerSet = new Set(consumerBadges.map(obj => obj.consumer_name));
  const consumers = [];
  consumerSet.forEach(v => consumers.push(v));

  const [selectedConsumer, setSelectedConsumer] = useState('');

  const onChangeConsumer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const consumerName = e.target.value
    console.log('consumerName: ', consumerName);
    setSelectedConsumer(consumerName)
  };
  if (isLoading) return <div>loading...</div>
  if (isError) return <div>failed to load</div>
  return (
    <>
      <HStack spacing='24px'>
        <Box w='300px'>
          <FormLabel mb={2}>教育指標選択</FormLabel>
          <SelectConsumer consumers={consumers} handleChange={onChangeConsumer}/>
        </Box>
      </HStack>
      <BadgeList consumerBadges={consumerBadges} selectedConsumer={selectedConsumer}/>
      {/* <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePrev={handleClickPrev}
        handleNext={handleClickNext}
        handleMove={handleClickMove}
      /> */}
    </>
  );
};
