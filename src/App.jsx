
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import './App.css'
import React from 'react';

import { TokenLaunchpad } from './components/TokenLaunchPad'
import RequestAirDrop from './components/RequestAirDrop';
import ShowBalance from './components/ShowBalance';
import SendTokens from './components/SendTokens';
import SignMessage from './components/SignMessage';



function App() {
  return (
    <div>
      <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
        <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: 20
              }}>
                <WalletMultiButton />
                <WalletDisconnectButton />
              </div>
              {/* <RequestAirDrop/> */}
              {/* <TokenLaunchpad/> */}
                {/* <ShowBalance/> */}
                <SendTokens/>
                <SignMessage/>
            </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  )
}

export default App