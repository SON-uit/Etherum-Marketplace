import { useNativeBalance  } from "hooks/useNativeBalance";
import { n4 } from "helpers/formatters";
import {useState,useEffect } from "react";
function NativeBalance(props) {
  const [userBalance,setUserBalance] = useState(null);
  const { balance, nativeName } = useNativeBalance(props);
  useEffect(() => {
    setUserBalance(balance);
  },[balance])
  return (
    <>
    { userBalance?.inWei >0 && <div style={{ textAlign: "center", whiteSpace: "nowrap" }}>{`${n4.format(
      balance.formatted
    )} ${nativeName}`}
    </div>
    }
    </>
  );
}

export default NativeBalance;
