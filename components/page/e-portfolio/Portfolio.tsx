import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { SelectConsumer } from "../../ui/SelectConsumer";
import { useConsumerBadgesList } from "@/components/api/OkutepApi";
import { Box, Button, FormLabel, Grid, GridItem, HStack, Link, Text } from "@chakra-ui/react";
import { BadgeList } from "@/components/ui/BadgeList";

export const Portfolio = () => {

  const { consumerBadges, isLoading, isError } = useConsumerBadgesList()
  // console.log('consumerBadges: ', consumerBadges)
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
      <Grid templateColumns='repeat(5, 1fr)' gap={6}>
        <GridItem w='300px'>
          <FormLabel mb={2}>教育指標選択</FormLabel>
          <SelectConsumer consumers={consumers} handleChange={onChangeConsumer}/>
        </GridItem>
        <GridItem>
          <FormLabel>　</FormLabel>
          <Link>
            <span className="material-symbols-outlined"><Text fontSize='40px'>vpn_key</Text></span>
          </Link>
        </GridItem>
        <GridItem/>
        <GridItem/>
        <GridItem>
          <FormLabel>　</FormLabel>
          <Button colorScheme='blue'>CSVダウンロード</Button>
        </GridItem>
      </Grid>
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
