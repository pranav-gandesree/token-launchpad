import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import React, { useEffect } from 'react'

const ShowBalance = () => {

    const {connection } = useConnection();
    const wallet = useWallet();

    async function getUserBalanace() {
        if (wallet.publicKey) {
            const balance = await connection.getBalance(wallet.publicKey);
            document.getElementById("balance").innerHTML = balance / LAMPORTS_PER_SOL;
        }
    }
    useEffect(()=>{
        getUserBalanace();
    },[wallet]);

  return (
    <div>
     <p>SOL Balance:</p> <div id="balance"></div>
    </div>
  )
}

export default ShowBalance
