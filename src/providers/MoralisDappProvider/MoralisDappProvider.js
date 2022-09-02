import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import MoralisDappContext from "./context";
import abi from "../../contracts/abi.js";
function MoralisDappProvider({ children }) {
  const { web3, Moralis, user, account, chainId: chain } = useMoralis();
  const temp = useMoralis();

  const [walletAddress, setWalletAddress] = useState();
  const [chainId, setChainId] = useState();
  const [contractABI, setContractABI] = useState(abi); //Smart Contract ABI here
  const [marketAddress, setMarketAddress] = useState(
    "0xD48d7A5699D680C7b5cd1Ab06588E8D255B7033c"
  ); //Smart Contract Address Here
  useEffect(() => {
    Moralis.onChainChanged(function (chain) {
      setChainId(chain);
    });
    Moralis.onAccountChanged(function (address) {
      setWalletAddress(address[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => setChainId(chain), [chain]);
  useEffect(
    () => setWalletAddress(account || user?.get("ethAddress")),
    [account, user]
  );
  return (
    <MoralisDappContext.Provider
      value={{
        walletAddress,
        chainId,
        marketAddress,
        setMarketAddress,
        contractABI,
        setContractABI,
      }}
    >
      {children}
    </MoralisDappContext.Provider>
  );
}

function useMoralisDapp() {
  const context = React.useContext(MoralisDappContext);
  //console.log(context);
  if (context === undefined) {
    throw new Error("useMoralisDapp must be used within a MoralisDappProvider");
  }
  return context;
}

export { MoralisDappProvider, useMoralisDapp };
