import { useAccount, useDisconnect } from "wagmi";
// import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect, useState } from "react";
import MM from "..//Toast/MM";
import { useContext } from "react";

// import HeaderIconR1 from "../images/HeaderIconR1.svg";
// import HeaderIconR2 from "../images/HeaderIconR2.svg";
// import { NonceTooLowError } from "viem";
import { MyContext } from "../landingcomponents/MyContext";
export const Wallnetbtn = () => {
  const { isConnecting, isDisconnected } = useAccount();
  // const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const open = () => {};
  const [walletModalVisible, setWalletModalVisible] = useState(false);
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", (chainID) => {
        if (
          !(
            chainID === 5 ||
            chainID === 11155111 ||
            chainID === 1 ||
            chainID === 137
          )
        )
          disconnect();
      });
      // window.ethereum.on("accountsChanged", () => {
      //   window.location.reload();
      // });
    }
  });

  const checkMetaMask = async () => {
    console.log("stress");
    if (
      typeof window.ethereum !== "undefined" &&
      window.ethereum.isMetaMask === true
    ) {
      console.log("MetaMask is installed!");
      setWalletModalVisible(true);
      // Optionally, connect to MetaMask and get the current accounts
      try {
        // await window.ethereum.request({ method: 'eth_requestAccounts' });
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const signer = provider.getSigner();
        // console.log("Connected account:", await signer.getAddress());
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      console.log("MetaMask is not installed.");
      setWalletModalVisible(false);
    }
  };

  return (
    <div className="another">
      {!isConnecting && !isDisconnected ? (
        <div>
          <div className="wallnetBtn" onClick={() => open()}>
            Disconnect
          </div>
        </div>
      ) : (
        <div className="topBarBtn">
          {/* <div
            className="tabButton colorloginBtn"
            onClick={() => {
              alert("Login");
            }}
          >
            Login
          </div> */}
          <div
            className="tabButton colortabBtn"
            onClick={() => checkMetaMask()}
          >
            Connect Wallet
          </div>
        </div>
      )}
      <MM isOpen={walletModalVisible} setIsOpen={setWalletModalVisible}></MM>
    </div>
  );
};
