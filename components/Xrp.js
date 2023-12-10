"use client";
// XrpComponent.js
import { useEffect, useState } from "react";
import { Client } from "xrpl";

const Xrp = () => {
  const [xrpBalance, setXrpBalance] = useState(null);

  useEffect(() => {
    // Replace with the fake XRP address
    const address = "rGszcRxv689V8t5akDeynH2inMZa3agfCN";
    const client = new Client("wss://s.altnet.rippletest.net:51233");

    // Function to check XRP balance
    const checkBalance = async () => {
      // Connect to the XRP Ledger Testnet
      await client.connect();
      if (client.isConnected) {
        console.log("client connected: ", client.isConnected());
      }

      // Get account info
      const account_info = await client.request({
        command: "account_info",
        account: address,
        ledger_index: "validated",
      });

      console.log(account_info);

      // Acount Balance
      const balance = account_info.result.account_data.Balance;
      setXrpBalance(balance / 1e6);

      // Disconnect from the XRP Ledger
      client.disconnect();
    };
    checkBalance();
  }, []);

  return (
    <div>
      <h1>XRP Balance</h1>
      {xrpBalance !== null ? (
        <p>{`${xrpBalance} XRP`}</p>
      ) : (
        <p>Loading XRP balance...</p>
      )}
    </div>
  );
};

export default Xrp;
