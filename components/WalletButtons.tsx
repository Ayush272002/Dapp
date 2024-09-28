'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';

const WalletButtons = () => {
  const { connected } = useWallet();
  return (
    <>
      {!connected ? (
        <WalletMultiButton className="wallet-adapter-button" />
      ) : (
        <WalletDisconnectButton className="wallet-adapter-button" />
      )}
    </>
  );
};

export default WalletButtons;
