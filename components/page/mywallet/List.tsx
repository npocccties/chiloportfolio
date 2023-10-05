import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { DisplayBadgeCount } from "@/components/ui/card/DisplayBadgeCount";
import { SearchForm } from "@/components/ui/SearchForm";
import { SelectComponent } from "./SelectComponent";
import { SearchFormItem } from "@/types/data";
//import { badgeListActions } from "@/share/store/badgeList/main";
import { getConsumers } from "@/components/page/mywallet/OkutepApi";
import { getConsumerFrameworkList } from "@/components/page/mywallet/OkutepApi";
import { Box, FormLabel, HStack, Select } from "@chakra-ui/react";
import { Consumer } from "./data";

export const MyWaletVCList = () => {
  
  const [consumers, setConsumers] = useState<Consumer[]>()
  
  useEffect(() => {
    (async() => {
      const consumers = await getConsumers();
      setConsumers(consumers);
    })()
  }, [])
  
  console.log(consumers)
  const options = consumers?.map((consumer) => consumer.name)
  console.log(options)
  // const frameworks = await getConsumerFrameworkList(consumers[0].consumer_id)
  
  const onChangeFramework = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
  };
  return (
    <>
      <HStack spacing='24px'>
        <Box w='300px'>
          <FormLabel mb={2}>教育指標選択</FormLabel>
          <SelectComponent consumers={consumers} handleChange={onChangeFramework}/>
        </Box>
      </HStack>
      {/* <VcList /> */}
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
