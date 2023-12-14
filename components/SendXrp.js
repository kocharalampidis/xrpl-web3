"use client";
import { useEffect, useState } from "react";
import xrpl, { Client, Wallet, xrpToDrops, dropsToXrp } from "xrpl";

const SendXrp = () => {
  // Testnet wss://s.altnet.rippletest.net:51233
  const testnet = "wss://s.altnet.rippletest.net:51233";

  const [client, setClient] = useState(new Client(testnet));
  const [senderWallet, setSenderWallet] = useState();
  // Wallet.fromSecret("sEd7UqeGUxspVocmTQszsoCe3rqEven")
  const [recieverWallet, setRecieverWallet] = useState();
  //Wallet.fromSecret("sEdST9Jg1XPfXKDkg1kdDvvNpyF5u9U")

  const connectToTestnet = async () => {
    console.log("Connecting to Testnet...");

    await client.connect();

    if (client.isConnected()) {
      console.log("client connected:", client.isConnected());
    }
  };

  const disconnectFromTestnet = async () => {
    console.log("Disconnecting from Testnet...");

    await client.disconnect();

    if (!client.isConnected()) {
      console.log("client connected:", client.isConnected());
    }
  };

  const createWalletFromSeed = async () => {
    console.log("Creating Sender and Destination wallets");

    // Create wallet on testnet from seed - Working with XRP Faucets
    const wallet1 = Wallet.fromSecret("sEd7UqeGUxspVocmTQszsoCe3rqEven"); // address: rnZaJB553ctyHy4CpYNUzcK8GXCs6SmtUa
    const wallet2 = Wallet.fromSecret("sEdST9Jg1XPfXKDkg1kdDvvNpyF5u9U"); // address: rBiX1FKUx1XScmMESj74aataykTnCzWiST

    setSenderWallet(wallet1);
    setRecieverWallet(wallet2);

    console.log(`wallet1 address: ${wallet1.classicAddress}`);
    console.log(`wallet2 address: ${wallet2.classicAddress}`);
  };

  const initPayment = async () => {
    // creating wallets as prerequisite
    //const { wallet: wallet1 } = await client.fundWallet();
    // client.fundWallet(null, {
    //   usageContext: "test",
    // });
    //const { wallet: wallet2 } = await client.fundWallet();
    // fundWallet(null, {
    //   usageContext: "test",
    // });

    console.log("Balances of wallets before Payment tx");
    console.log(
      await client.getXrpBalance(senderWallet.classicAddress),
      await client.getXrpBalance(recieverWallet.classicAddress)
    );

    // create a Payment tx and submit and wait for tx to be validated
    const payment = {
      TransactionType: "Payment",
      Account: senderWallet.classicAddress,
      Amount: "1000",
      Destination: recieverWallet.classicAddress,
    };

    console.log(payment);

    // Submit payment
    const paymentResponse = await client.submitAndWait(payment, {
      wallet: senderWallet,
    });
    console.log("\nTransaction was submitted. \n");

    // Check transaction results -------------------------------------------------
    console.log("Transaction: ", paymentResponse);
    console.log(
      "Transaction result:",
      paymentResponse.result.meta.TransactionResult
    );

    const txResponse = await client.request({
      command: "tx",
      transaction: paymentResponse.result.hash,
    });
    console.log("txResponse", txResponse);

    // With the following reponse we are able to see that the tx was indeed validated.
    console.log("Validated:", txResponse.result.validated);

    console.log("Balances of wallets after Payment tx:");
    console.log(
      await client.getXrpBalance(senderWallet.classicAddress),
      await client.getXrpBalance(recieverWallet.classicAddress)
    );

    await client.disconnect();
  };

  return (
    <div>
      <button onClick={initPayment}> initPayment </button>
      <button onClick={createWalletFromSeed}> createWalletFromSeed </button>
      <button onClick={connectToTestnet}> connectToTestnet </button>
      <button onClick={disconnectFromTestnet}> disconnectFromTestnet </button>
    </div>
  );
};

export default SendXrp;
