"use client";
// XrpComponent.js
import { useEffect, useState } from "react";
import xrpl, { Client, Wallet, xrpToDrops, dropsToXrp } from "xrpl";
import fundWallet from "xrpl/dist/npm/Wallet/fundWallet";

const Xrp = () => {
  const [xrpBalance, setXrpBalance] = useState(null);

  const address = "rGszcRxv689V8t5akDeynH2inMZa3agfCN";

  // const checkBalance = async () => {

  //   // Prepare transaction -------------------------------------------------------
  //   const wallet = Wallet.fromSeed("sn3nxiW7v8KXzPzAqzyHXbSSKNuN9");
  //   console.log(wallet.address); // rMCcNuTcajgw7YTgBy1sys3b89QqjUrMpH

  //   const prepared = await client.autofill({
  //     TransactionType: "Payment",
  //     Account: "rMCcNuTcajgw7YTgBy1sys3b89QqjUrMpH",
  //     Amount: 10,
  //     Destination: address,
  //   });
  //   const max_ledger = prepared.LastLedgerSequence;
  //   console.log("Prepared transaction instructions:", prepared);
  //   console.log("Transaction cost:", dropsToXrp(prepared.Fee), "XRP");
  //   console.log("Transaction expires after ledger:", max_ledger);

  //   // Sign prepared instructions ------------------------------------------------
  //   const signed = wallet.sign(prepared);
  //   console.log("Identifying hash:", signed.hash);
  //   console.log("Signed blob:", signed.tx_blob);

  //   // Submit signed blob --------------------------------------------------------
  //   const tx = await client.submitAndWait(signed.tx_blob);

  //   // Check transaction results -------------------------------------------------
  //   console.log("Transaction result:", tx.result.meta.TransactionResult);
  //   console.log(
  //     "Balance changes:",
  //     JSON.stringify(getBalanceChanges(tx.result.meta), null, 2)
  //   );
  //   // Disconnect from the XRP Ledger
  //   //client.disconnect();
  // };
  const client = new Client("wss://s.altnet.rippletest.net:51233");

  // const connectToDevnet = async () => {
  //   // Connect to the XRP Ledger Testnet
  //   await client.connect();
  //   if (client.isConnected) {
  //     console.log("client connected: ", client.isConnected());
  //     //console.log(client);
  //   }

  //   //walletInfo();

  //   // send xrp
  //   const senderWallet = Wallet.fromSeed("sn3nxiW7v8KXzPzAqzyHXbSSKNuN9");

  //   // const prepared = await client.autofill({
  //   //   TransactionType: "Payment",
  //   //   Account: senderWallet.address,
  //   //   //"rMCcNuTcajgw7YTgBy1sys3b89QqjUrMpH",
  //   //   Amount: xrpToDrops("22"),
  //   //   Destination: address,
  //   // });
  //   // const max_ledger = prepared.LastLedgerSequence;
  //   // console.log("Prepared transaction instructions:", prepared);
  //   // console.log("Transaction cost:", dropsToXrp(prepared.Fee), "XRP");
  //   // console.log("Transaction expires after ledger:", max_ledger);

  //   // Sign prepared instructions ------------------------------------------------
  //   // const signed = senderWallet.sign(prepared);
  //   // console.log("Identifying hash:", signed.hash);
  //   // console.log("Signed blob:", signed.tx_blob);

  //   // console.log("client.connection", client.connection);

  //   // Submit signed blob --------------------------------------------------------
  //   // const tx = await client.submitAndWait(signed.tx_blob);
  //   // const tx = await client.submitAndWait(prepared, {
  //   //   autofill: true, // Adds in fields that can be automatically set like fee and last_ledger_sequence
  //   //   wallet: senderWallet,
  //   // });

  //   client.fundWallet().then((fund_result) => {
  //     console.log(fund_result);
  //     // setBalance(fund_result.balance);
  //     // setWallet(fund_result.wallet);
  //     // setPaymentButtonText("Send a 22 XRP Payment!");
  //   });

  //   console.log("Creating a payment transaction");
  //   //setStatusText("Sending a payment for 22 XRP...");
  //   const tx = {
  //     TransactionType: "Payment",
  //     Account: fundWallet.address,
  //     Amount: xrpToDrops("10000"),
  //     Destination: address,
  //   };

  //   const submitted_tx = await client.submitAndWait(tx, {
  //     autofill: true, // Adds in fields that can be automatically set like fee and last_ledger_sequence
  //     wallet: fundWallet.address,
  //   });

  //   // // Check transaction results -------------------------------------------------
  //   // console.log("Transaction result:", tx.result.meta.TransactionResult);
  //   // console.log(
  //   //   "Balance changes:",
  //   //   JSON.stringify(getBalanceChanges(tx.result.meta), null, 2)
  //   // );
  //   // Disconnect from the XRP Ledger
  //   client.disconnect();
  //   // };
  // };

  // const walletInfo = async () => {
  //   // Get account info
  //   const account_info = await client.request({
  //     command: "account_info",
  //     account: address,
  //     ledger_index: "validated",
  //   });

  //   console.log(account_info);
  //   //   // Acount Balance
  //   //   const balance = account_info.result.account_data.Balance;
  //   //   setXrpBalance(balance);
  // };

  // async function submitTransaction() {
  //   const senderWallet = Wallet.fromSeed("sn3nxiW7v8KXzPzAqzyHXbSSKNuN9");

  //   //   console.log(account_info);
  //   //const recipientWallet = client.fundWallet();

  //   // const transaction = await client.autofill({
  //   //   TransactionType: "Payment",
  //   //   Account: "rMCcNuTcajgw7YTgBy1sys3b89QqjUrMpH",
  //   //   Amount: 10,
  //   //   Destination: address,
  //   // });
  //   // const max_ledger = transaction.LastLedgerSequence;

  //   // const sign = senderWallet.sign(transaction);

  //   // try {
  //   //   const tx = await client.submitAndWait(sign.tx_blob);
  //   //   console.log(tx);
  //   // } catch (error) {
  //   //   console.error(`Failed to submit transaction: ${error}`);
  //   // }
  // }
  const [wallet, setWallet] = useState("");
  const [wallet2, setWallet2] = useState("");

  // useEffect(() => {
  //   //    connectToDevnet();
  //   // Disconnect from the XRP Ledger
  //   // client.disconnect();
  // }, []);

  // useEffect(() => {
  //   console.log("start connection");
  //   client.connect().then(() => {
  //     console.log("connected");
  //     console.log("funding wallet");

  //     client.fundWallet().then((fund_result) => {
  //       console.log(fund_result);
  //       //setBalance(fund_result.balance);
  //       setWallet(fund_result.wallet);
  //       //setPaymentButtonText("Send a 22 XRP Payment!");
  //     });
  //   });
  // }, []);

  // const test = async () => {
  //   const response = await client.request({
  //     command: "account_info",
  //     account: wallet.address,
  //     ledger_index: "validated",
  //   });
  //   console.log(response);
  // };

  async function signTransaction() {
    await client.connect();
    // const { balance: balance1, wallet: wallet1 } = client.fundWallet();
    // const { balance: balance2, wallet: wallet2 } = client.fundWallet();

    client.fundWallet().then((fund_result) => {
      console.log(fund_result);
      setWallet(fund_result.wallet);
    });

    client.fundWallet().then((fund_result) => {
      console.log(fund_result);
      setWallet2(fund_result.wallet);
    });

    console.log("wallet", wallet);

    const transaction = {
      TransactionType: "Payment",
      Account: wallet.address,
      Destination: wallet2.address,
      Amount: "10",
    };

    try {
      await client.autofill(transaction);
      const { tx_blob: signed_tx_blob, hash } = await wallet.sign(transaction);
      console.log(signed_tx_blob);
    } catch (error) {
      console.error(`Failed to sign transaction: ${error}`);
    }
    console.log("sending payment");
    const result = await client.submit(signed_tx_blob);
    console.log("submitted");
    await client.disconnect();
  }

  // async function sendPayment() {
  //   console.log("Creating a payment transaction");
  //   //setStatusText("Sending a payment for 22 XRP...");
  //   const senderWallet = Wallet.fromSeed("sn3nxiW7v8KXzPzAqzyHXbSSKNuN9");

  //   const response = await client.request({
  //     command: "account_info",
  //     account: senderWallet.address,
  //     ledger_index: "validated",
  //   });

  //   console.log(response);

  //   const tx = {
  //     TransactionType: "Payment",
  //     Account: senderWallet.address,
  //     Amount: xrpToDrops("22"),
  //     Destination: address,
  //     //"rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe",
  //   };

  //   // Submit the transaction --------------------------------------------
  //   // console.log("Submitting the transaction (Takes 3-5 seconds)");
  //   // try {
  //   //   const submitted_tx = await client.submitAndWait(tx, {
  //   //     autofill: true, // Adds in fields that can be automatically set like fee and last_ledger_sequence
  //   //     wallet: senderWallet.address,
  //   //   });
  //   // } catch (error) {
  //   //   console.log({ error });
  //   // }
  // }

  //sendPayment();
  return (
    <div>
      <h1>XRP Balance</h1>
      {xrpBalance !== null ? (
        <p>{`${xrpBalance} XRP`}</p>
      ) : (
        <p>Loading XRP balance...</p>
      )}
      <button onClick={signTransaction}> aaaaaaaaaaaaaaaaaa </button>
    </div>
  );
};

export default Xrp;
