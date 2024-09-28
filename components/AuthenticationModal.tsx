'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { Loader2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { WalletModalButton } from '@solana/wallet-adapter-react-ui';
import { baseStyle } from '@/lib/style';
import { toast } from 'sonner';
import { ed25519 } from '@noble/curves/ed25519';
import Cookie from 'js-cookie';

interface AuthenticationModalProps {
  setIsAuthenticated: (authenticated: boolean) => void;
}

export default function AuthenticationModal({
  setIsAuthenticated,
}: AuthenticationModalProps) {
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { publicKey, signMessage } = useWallet();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      toast('Please verify your identity');
    }
  }, [isOpen]);

  const signAndVerifyMsg = async () => {
    try {
      if (!message) {
        toast.error("Message can't be empty");
        return null;
      }

      const encodedMessage = new TextEncoder().encode(message);

      if (!signMessage) {
        toast.error("Wallet doesn't support message signing");
        return null;
      }

      if (!publicKey) {
        toast.error('Error getting public key');
        return null;
      }

      const signature = await signMessage(encodedMessage);

      if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
        toast.error('Verification Failed', {
          description: 'Message signature invalid, try again',
        });
        return null;
      }

      Cookie.set('authSign', Buffer.from(signature).toString('base64'));
      toast.success('Verification Successful', {
        description: 'Message signature verified',
      });

      return signature;
    } catch (error) {
      console.error(error);
      toast.error('Error signing message', {
        description: 'Please try again',
      });
      return null;
    }
  };

  const handleVerify = async () => {
    setIsLoading(true);

    const sign = await signAndVerifyMsg();
    if (sign) {
      setTimeout(() => {
        setIsLoading(false);
        setIsOpen(false);
        setIsAuthenticated(true);
      }, 1000);
    } else {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-40 font-mono">
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-[#8EE3FB] text-gray-900 rounded-md hover:bg-[#61D8F9] transition-colors p-8 font-semibold text-lg border-2 border-[#8EE3FB] shadow-[#91e7ff] shadow-2xl"
        >
          AUTHENTICATE
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div
            className="bg-zinc-900 rounded-lg p-6 w-[448px] relative transition-all duration-300 ease-in-out"
            style={{
              boxShadow: '0 0 30px 5px rgba(255, 143, 94, 0.3)',
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <div />
              <h2 className="text-2xl font-semibold text-peach-500 text-center font-mono">
                Authenticate
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-peach-100 hover:text-peach-300 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="border-t border-gray-700 my-4" />
            <p className="text-peach-100 mb-4 text-center mx-14">
              Authenticate to prove your identity and access the platform.
            </p>
            <div className="border-t border-gray-700 my-4" />
            <div className="text-peach-200 text-center mb-2">
              Your public key:
            </div>
            <div className="bg-teal-700 text-teal-200 p-3 rounded-md mb-6 break-all text-center">
              {publicKey?.toString() || 'No wallet connected'}
            </div>
            <div className="border-t border-gray-700 my-4" />
            <div className="flex flex-col mb-4 items-center">
              <div className="text-peach-200 text-left mb-2">
                Signing message:
              </div>
              <Input
                type="text"
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full mb-4 text-center h-12 text-peach-800 text-lg"
              />
            </div>
            <div className="flex justify-between">
              <WalletModalButton style={{ ...baseStyle }}>
                CHANGE WALLET
              </WalletModalButton>
              <button
                onClick={handleVerify}
                disabled={isLoading}
                className="py-2 bg-[#8EE3FB] text-gray-900 font-semibold text-inherit whitespace-nowrap rounded-md hover:bg-[#61D8F9] transition-colors flex items-center justify-center w-fit px-4"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  'VERIFY WALLET'
                )}
              </button>
            </div>
            <p className="text-gray-500 text-xs mt-4 text-center">
              By connecting your wallet, you agree to MintMatrix&apos;s Terms of
              Service.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
