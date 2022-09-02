import { getNativeByChain } from "helpers/networks";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useEffect, useMemo, useState } from "react";
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis";

export const useNativeBalance = (options) => {
  const { account } = useMoralisWeb3Api();
  const { chainId } = useMoralisDapp();
  const { Moralis, isInitialized, isInitializing, isAuthenticated } =
    useMoralis();
  const [balance, setBalance] = useState({ inWei: 0, formatted: 0 });

  const nativeName = useMemo(
    () => getNativeByChain(options?.chain || chainId),
    [options, chainId]
  );
  const fetchBalance = async () => {
    const data = await account.getNativeBalance({
      chain: chainId,
    });
    if (data?.balance) {
      const balances = {
        inWei: data.balance,
        // missing second argument (decimals) in FromWei function,
        formatted: Moralis.Units.FromWei(data.balance),
      };
      setBalance(balances);
    }
  };
  useEffect(() => {
    console.log("balance run ");
    if (isInitialized || isAuthenticated) {
      fetchBalance();
    }
  }, [isInitialized, isAuthenticated]);

  return { balance, nativeName };
};
