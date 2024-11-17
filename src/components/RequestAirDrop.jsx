import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import React from 'react'

const RequestAirDrop = () => {
    const wallet = useWallet();
    const { connection } = useConnection();

    function requestAirDrop(){
        const publicKey = wallet.publicKey;
        const amount = document.getElementById("amount").value;
        connection.requestAirdrop(publicKey, amount * LAMPORTS_PER_SOL);
    }

  return (
    <div>
      <input id="amount" type="text" placeholder='Amount in SOL' />
      <button onClick={requestAirDrop}>Send SOL</button>

    </div>
  )
}

export default RequestAirDrop
