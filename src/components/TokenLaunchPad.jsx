// import React, { useState } from "react";
// import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
// import {
//   useConnection,
//   useWallet,
// } from "@solana/wallet-adapter-react";
// import {
//   TOKEN_2022_PROGRAM_ID,
//   getMintLen,
//   createInitializeMetadataPointerInstruction,
//   createInitializeMintInstruction,
//   TYPE_SIZE,
//   LENGTH_SIZE,
//   ExtensionType,
//   getAssociatedTokenAddressSync,
//   createAssociatedTokenAccountInstruction,
//   createMintToInstruction,
// } from "@solana/spl-token";
// import { createInitializeInstruction, pack } from "@solana/spl-token-metadata";



// const TokenLaunchPad = () => {
//     const [name, setName] = useState("");
//     const [symbol, setSymbol] = useState("");
//     const [imageUrl, setImageUrl] = useState("");
//     const [supply, setSupply] = useState("");
//     const [decimals, setDecimals] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [status, setStatus] = useState("");

//     const { connection } = useConnection();
//     const wallet = useWallet();

    

//     async function createToken(){


//         console.log("ihii")

//         const mintKeypair = Keypair.generate();

//         const metadata = {
//             mint: mintKeypair.publicKey,
//             name: name,
//             symbol: symbol,
//             uri: imageUrl,
//             additionalMetadata: [],
//         };

//         const mintLen = getMintLen([ExtensionType.MetadataPointer]);
//         const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

//         const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);

//         const associatedToken = getAssociatedTokenAddressSync(
//             mintKeypair.publicKey,
//             wallet.publicKey,
//             false,
//             TOKEN_2022_PROGRAM_ID
//           );


//         const transaction = new Transaction().add(
//             SystemProgram.createAccount({
//                 fromPubkey: wallet.publicKey,
//                 newAccountPubkey: mintKeypair.publicKey,
//                 space: mintLen,
//                 lamports,
//                 programId: TOKEN_2022_PROGRAM_ID,
//             }),
//               createInitializeMetadataPointerInstruction(
//                 mintKeypair.publicKey,
//                 wallet.publicKey,
//                 mintKeypair.publicKey,
//                 TOKEN_2022_PROGRAM_ID
//               ),

//               createInitializeMintInstruction(
//                 mintKeypair.publicKey,
//                 Number(decimals),
//                 wallet.publicKey, 
//                 null, 
//                 TOKEN_2022_PROGRAM_ID
//             ),

//               createInitializeInstruction({
//                 programId: TOKEN_2022_PROGRAM_ID,
//                 mint: mintKeypair.publicKey,
//                 metadata: mintKeypair.publicKey,
//                 name: metadata.name,
//                 symbol: metadata.symbol,
//                 uri: metadata.uri,
//                 mintAuthority: wallet.publicKey,
//                 updateAuthority: wallet.publicKey,
//             }),

//             createAssociatedTokenAccountInstruction(
//                 wallet.publicKey,
//                 associatedToken,
//                 wallet.publicKey,
//                 mintKeypair.publicKey,
//                 TOKEN_2022_PROGRAM_ID
//               ),

//               createMintToInstruction(
//                 mintKeypair.publicKey,
//                 associatedToken,
//                 wallet.publicKey,
//                 Number(supply) * Math.pow(10, decimals),
//                 [],
//                 TOKEN_2022_PROGRAM_ID
//               )
//         );
        

//         transaction.feePayer = wallet.publicKey;
//         transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
//         transaction.partialSign(mintKeypair);


//         try {
//             const signature = await wallet.sendTransaction(transaction, connection);
//             console.log("Transaction sent, signature:", signature);

//             // Confirm the transaction with retry logic
//             const isConfirmed = await confirmTransaction(signature);
//             if (isConfirmed) {
//                 console.log("Token created successfully!");
//                 console.log("Token Details:");
//                 console.log("Mint Address:", mintKeypair.publicKey.toBase58());
//                 console.log("Name:", name);
//                 console.log("Symbol:", symbol);
//                 console.log("Image URI:", imageUrl);
//                 console.log("Mint Authority:", wallet.publicKey.toBase58());
//                 setStatus("Token created successfully!");

//                 setName("");
//                 setSymbol("");
//                 setSupply("");
//                 setDecimals("");
//                 setImageUrl("");
//                 setLoading(false);


//                 // // Store the mint address in localStorage

//                 // if(localStorage.setItem('mintAddress', mintKeypair.publicKey.toBase58())!) {
//                 //     console.log("mint address wasnt stored in the local storage")
//                 // } else {
//                 //     console.log(`mint address stored successfully: ${mintKeypair.publicKey.toBase58()}`)
//                 // }

//             }
//         } catch (error) {
//             console.error("Token creation failed:", error);
//             setStatus("Token creation failed. Please try again.");
            
//             setName("");
//             setSymbol("");
//             setSupply("");
//             setDecimals("");
//             setImageUrl("");
//             setLoading(false);
//         }















//     }

//   return (
//     <div className='flex flex-col'>
//         <div>
//             <h2>Launch your own token on solana</h2>
//         </div>

//          <input className='inputText'
//           type='text' 
//           placeholder='Name' 
//           value={name}
//           onChange={(e)=>setName(e.target.value)}
//          />

//         <input className='inputText'
//          type='text' 
//          placeholder='Symbol'
//          value={symbol}
//          onChange={(e)=> setSymbol(e.target.value)}
//          />

//         <input className='inputText' 
//         type='text' 
//         placeholder='Image URL'
//         value={imageUrl}
//         onChange={(e)=>setImageUrl(e.target.value)}
//         />

//         <input className='inputText' 
//         type='number' 
//         placeholder='Enter Decimals (Max no 9)'
//         value={decimals}
//         onChange={(e)=> {
//             if (e.target.value < 0 || e.target.value > 9) {
//                 setStatus("Decimals must be between 0 and 9.");
//                 return;
//             }
//             setDecimals(e.target.value)}
//         } 
//         />

//         <input className='inputText' 
//         type='number' 
//         placeholder='Initial Supply'
//         value={supply}
//         onChange={(e)=> { 
//             if (e.target.value <= 0) {
//                 setStatus("Supply must be greater than 0.");
//                 return;
//             }

//             setSupply(e.target.value)}}
//         />

//         <button onClick={createToken} 
//          disabled={!wallet.publicKey || loading}
//          className='btn cursor-pointer'> 
//          {loading ? "Creating Token..." : "Create Token"} 
//          </button>

//         {status && <p className="text-sm text-green-500">{status}</p>}
//     </div>
//   )
// }

// export default TokenLaunchPad












































import React, { useContext, useState } from "react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import {
  useConnection,
  useWallet,
  WalletContext,
} from "@solana/wallet-adapter-react";
import {
  TOKEN_2022_PROGRAM_ID,
  getMintLen,
  createInitializeMetadataPointerInstruction,
  createInitializeMintInstruction,
  TYPE_SIZE,
  LENGTH_SIZE,
  ExtensionType,
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
} from "@solana/spl-token";
import { createInitializeInstruction, pack } from "@solana/spl-token-metadata";

const TokenLaunchPad = () => {
  const { connected } = useContext(WalletContext);
  const { connection } = useConnection();
  const wallet = useWallet();
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [supply, setSupply] = useState("");
  const [decimals, setDecimals] = useState("");
  const [loading, setLoading] = useState(false);

  const createToken = async () => {
    try {
      setLoading(true);
  
      const mintKeypair = Keypair.generate();
      const associatedToken = getAssociatedTokenAddressSync(
        mintKeypair.publicKey,
        wallet.publicKey,
        false,
        TOKEN_2022_PROGRAM_ID
      );
    
    
      const metadata = {
        mint: mintKeypair.publicKey,
        name: name,
        symbol: symbol,
        uri: imageUrl,
        additionalMetadata: [],
      };

      const mintLen = getMintLen([ExtensionType.MetadataPointer]);
      const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

      const lamports = await connection.getMinimumBalanceForRentExemption(
        mintLen + metadataLen
      );

      console.log("Lamports required:", lamports);

      
      const transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: wallet.publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: mintLen,
          lamports,
          programId: TOKEN_2022_PROGRAM_ID,
        }),
        createInitializeMetadataPointerInstruction(
          mintKeypair.publicKey,
          wallet.publicKey,
          mintKeypair.publicKey,
          TOKEN_2022_PROGRAM_ID
        ),
        createInitializeMintInstruction(
          mintKeypair.publicKey,
          Number(decimals),
          wallet.publicKey,
          null,
          TOKEN_2022_PROGRAM_ID
        ),
        createInitializeInstruction({
          programId: TOKEN_2022_PROGRAM_ID,
          mint: mintKeypair.publicKey,
          metadata: mintKeypair.publicKey,
          name: metadata.name,
          symbol: metadata.symbol,
          uri: metadata.uri,
          mintAuthority: wallet.publicKey,
          updateAuthority: wallet.publicKey,
        }),
        createAssociatedTokenAccountInstruction(
          wallet.publicKey,
          associatedToken,
          wallet.publicKey,
          mintKeypair.publicKey,
          TOKEN_2022_PROGRAM_ID
        ),
        createMintToInstruction(
          mintKeypair.publicKey,
          associatedToken,
          wallet.publicKey,
          Number(supply) * Math.pow(10, decimals),
          [],
          TOKEN_2022_PROGRAM_ID
        )
      );
      transaction.feePayer = wallet.publicKey;
      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash;
      transaction.partialSign(mintKeypair);

      await wallet.sendTransaction(transaction, connection);

      setName("");
      setSymbol("");
      setSupply("");
      setDecimals("");
      setImageUrl(null);
      setLoading(false);

    } catch (error) {
      console.error(error);
      setName("");
      setSymbol("");
      setSupply("");
      setDecimals("");
      setImageUrl("");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 sm:p-8 lg:flex lg:gap-8">
        {/* Token Creation Form */}
        <div className="lg:w-full">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-white">Launch Your Token</h2>
          <div className="space-y-4">
            <input
              className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-sm sm:text-base"
              value={name}
              type="text"
              placeholder="Token Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-sm sm:text-base"
              value={symbol}
              type="text"
              placeholder="Token Symbol"
              onChange={(e) => setSymbol(e.target.value)}
            />
            <input
              className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-sm sm:text-base"
              value={supply}
              type="number"
              min="0"
              step="any"
              placeholder="Token Supply"
              onChange={(e) => setSupply(e.target.value)}
            />
            <input
              className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-sm sm:text-base"
              value={decimals}
              type="number"
              placeholder="Token Decimals (max 9)"
              onChange={(e) => {
                if (Number(e.target.value) > 9) {
                  notification.error({
                    message: "Decimals should be less than 9",
                    placement: "bottomRight",
                    duration: 2,
                  });
                  return;
                }
                setDecimals(e.target.value);
              }}
            />
              <input
                id="image"
               className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-sm sm:text-base"
                type="text"
                placeholder="enter image url"
                onChange={(e)=> setImageUrl(e.target.value)}
              />
  
            <button
              onClick={createToken}
              className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 text-sm sm:text-base ${
                !connected || loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={!connected || loading}
            >
              {loading ? 'Launching...' : 'Launch Token'}
            </button>
          </div>
              
        </div>

        
      </div>
    </div>
  );
};

export default TokenLaunchPad;