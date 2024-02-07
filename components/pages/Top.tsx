import { VStack } from "@chakra-ui/react";

import { Portfolio } from "@/components/e-portfolio/Portfolio";
import { SignIn } from "@/components/e-portfolio/Signin";
import { Loading } from "@/components/Loading";
import { activateStateGetters } from "@/share/store/activate";

export const TopPage = () => {
  const activateState = activateStateGetters.useActivateState();

  if (activateState === undefined) {
    return (
      <VStack>
        <Loading />
      </VStack>
    );
  }

  if (activateState) {
    return <Portfolio />;
  } else {
    return <SignIn />;
  }
};
