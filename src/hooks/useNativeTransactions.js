import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useEffect, useState } from "react";
import {
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
  useMoralis,
} from "react-moralis";

const useNativeTransactions = (options) => {
  const { account } = useMoralisWeb3Api();
  const { chainId } = useMoralisDapp();
  const [nativeTransactions, setNativeTransactions] = useState([]);
  const { Moralis, isInitialized, isInitializing } = useMoralis();
  const {
    fetch: getNativeTransations,
    data,
    error,
    isLoading,
  } = useMoralisWeb3ApiCall(account.getTransactions, {
    chain: chainId,
    ...options,
  });
  console.log(data);
  const fetchTransaction = async () => {
    const data = await account.getTransactions({
      chain: chainId,
    });
    console.log(data);
  };
  useEffect(() => {
    if (isInitialized) {
      fetchTransaction();
    }
  }, [isInitialized]);

  return {
    getNativeTransations,
    nativeTransactions,
    chainId,
    error,
    isLoading,
  };
};

export default useNativeTransactions;
