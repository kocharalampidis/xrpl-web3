"use client";
// XrpComponent.js
import { useEffect, useState } from "react";
import { Client } from "xrpl";

const Xrp = () => {
  const [xrpBalance, setXrpBalance] = useState(null);

  useEffect(() => {
    // Replace with the fake XRP address
    const address = "rGszcRxv689V8t5akDeynH2inMZa3agfCN";

    const api = async () => {
      // Connect to the XRP Ledger Testnet
      const client = new Client("wss://s.altnet.rippletest.net:51233");
      await client.connect();

      console.log("client.isConnected", client.isConnected);
      const response = await client.request({
        command: "account_info",
        account: "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe",
        ledger_index: "validated",
      });
      console.log(response);
    };
    api();
    // Function to check XRP balance
    // const checkBalance = async () => {
    //   try {
    //     // Get account info
    //     const accountInfo = await client.request("account_info", {
    //       account: address,
    //       ledger_index: "validated",
    //     });

    //     // Extract XRP balance
    //     const balance = accountInfo.account_data.Balance;

    //     setXrpBalance(balance / 1e6); // Convert from drops to XRP
    //   } catch (error) {
    //     console.error("Error:", error);
    //   } finally {
    //     // Disconnect from the XRP Ledger
    //     client.disconnect();
    //   }
    // };

    // Run the checkBalance function
    //checkBalance();
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
