import { VStack } from "@chakra-ui/react";
import { SignIn } from "@/components/e-portfolio/Signin";
import { Portfolio } from "@/components/e-portfolio/Portfolio";
import { activateStateGetters } from "@/share/store/activate";
import { Loading } from "@/components/Loading";

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
