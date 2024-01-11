import { FlexProps } from "@chakra-ui/react";

export interface NavItemProps extends FlexProps {
  name: string;
  link?: string;
  external?: boolean;
  newWindow?: boolean;
  targetTabName?: string;
}

const walletUrl = process.env.NEXT_PUBLIC_WALLET_BASE_URL as string;

export const sidebarItems: Array<NavItemProps> = [
  { name: "マイウォレット", link: walletUrl, external: true },
  {
    name: "分析",
    link: "/",
  },
  {
    name: "ヘルプ",
    link: process.env.NEXT_PUBLIC_HELP_LINK,
    external: true,
    newWindow: true,
    targetTabName: "help",
  },
];
