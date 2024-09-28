'use client';

import AuthenticationModal from '@/components/AuthenticationModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { mockTokens } from '@/lib/tokens';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Label } from '@radix-ui/react-label';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { ChevronDown, ChevronUp, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [tokens, setTokens] = useState(mockTokens);
  const [expandedToken, setExpandedToken] = useState<string | number | null>(
    null
  );
  const [refresh, setRefresh] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [network, setNetwork] = useState('');
  const { connected } = useWallet();

  const handleRefreshAssets = () => {
    setRefresh(!refresh);
  };

  const handleExpand = (id: string | number) => {
    setExpandedToken(expandedToken === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 to-stone-200 text-stone-900 p-8 font-sans">
      {connected && !isAuthenticated && (
        <AuthenticationModal setIsAuthenticated={setIsAuthenticated} />
      )}

      <Card className="w-full max-w-4xl mx-auto relative overflow-hidden bg-white/80 backdrop-blur-sm">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-red-500 rounded-tl-3xl"></div>
          <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-red-500 rounded-tr-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-red-500 rounded-bl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-red-500 rounded-br-3xl"></div>
        </div>
        <CardHeader className="border-b border-stone-200 relative z-10 bg-red-400 text-white">
          <div className="flex items-center space-x-2 justify-between">
            <img
              src="/image.png"
              alt="logo"
              className="w-20 h-20 rounded-full hover:cursor-pointer"
              onClick={() => router.push('/')}
            />
            <div className="border border-gray-200 border-opacity-40 rounded-full p-3 bg-gray-800">
              <Switch
                id="networkx"
                className="m-2 data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                checked={network === 'devnet'}
                onCheckedChange={() => {
                  setNetwork(
                    network === 'mainnet-beta' ? 'devnet' : 'mainnet-beta'
                  );
                }}
              />
              <Label htmlFor="networkx" className="text-lg font-bold mx-2">
                Use Devnet
              </Label>
            </div>
          </div>
          <CardTitle className="text-5xl font-bold tracking-tight text-center py-6 pt-0 mt-0 ">
            YOUR TOKENS
          </CardTitle>
        </CardHeader>

        <div className=" mt-4 flex justify-center">
          <WalletMultiButton className="wallet-adapter-button" />
          <Button
            className="bg-red-500 rounded-xl font-bold h-13 text-sm px-6 mx-4"
            onClick={handleRefreshAssets}
          >
            Refresh Assets
          </Button>
          {tokens.length < 1 && (
            <WalletDisconnectButton className="wallet-adapter-button" />
          )}
        </div>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[2px] w-full" />

        {!connected && (
          <>
            <div className="text-center text-2xl font-bold text-stone-500">
              These are mock tokens for demonstration purposes
            </div>
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[2px] w-full" />
          </>
        )}

        <CardContent className="p-8 relative z-10">
          {tokens.length === 0 && (
            <div className="text-center text-2xl font-bold text-stone-500">
              You have 0 tokens
            </div>
          )}

          {tokens.map((token) => (
            <div key={token.id} className="mb-6 last:mb-0 token-card">
              <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleExpand(token.id)}
                    className="rounded-full w-10 h-10 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300"
                  >
                    {expandedToken === token.id ? (
                      <ChevronUp className="h-6 w-6" />
                    ) : (
                      <ChevronDown className="h-6 w-6" />
                    )}
                  </Button>
                  <div>
                    <h3 className="text-xl font-semibold">{token.name}</h3>
                    <p className="text-sm text-stone-500">{token.symbol}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-medium">
                    {token.balance} {token.symbol}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-10 h-10 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300 overflow-hidden"
                  >
                    <img
                      className="h-9 w-9 object-cover"
                      src={token.uri}
                      alt={`${token.name} logo`}
                    />
                  </Button>
                </div>
              </div>

              {expandedToken === token.id && (
                <div className="mt-4 p-6 bg-stone-50 rounded-xl shadow-inner">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                      <span className="text-sm font-medium text-stone-500">
                        Current Price:
                      </span>
                      <span className="text-lg font-bold ml-2">
                        ${token.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow">
                      <span className="text-sm font-medium text-stone-500">
                        24h Change:
                      </span>
                      <span
                        className={`text-lg font-bold ml-2 ${
                          token.change24h >= 0
                            ? 'text-green-500'
                            : 'text-red-500'
                        }`}
                      >
                        {token.change24h >= 0 ? '+' : ''}
                        {token.change24h}%
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow col-span-2">
                      <span className="text-sm font-medium text-stone-500">
                        Token Address:
                      </span>
                      <Input
                        className="text-center text-lg font-bold ml-2"
                        value={token.tokenAddress}
                      />
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow col-span-2">
                      <span className="text-sm font-medium text-stone-500">
                        Mint Address:
                      </span>
                      <Input
                        className=" text-lg text-center font-bold ml-2 overflow-hidden "
                        value={token.mintAddress}
                      />
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow">
                      <span className="text-sm font-medium text-stone-500">
                        Decimals:
                      </span>
                      <span className="text-lg font-bold ml-2">
                        {token.decimals}
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow">
                      <span className="text-sm font-medium text-stone-500">
                        Balance:
                      </span>
                      <span className="text-lg font-bold ml-2">
                        {token.balance} {token.symbol}
                      </span>
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-red-500 hover:bg-red-600 text-white text-lg py-6 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105">
                        Send {token.symbol}
                        <Send className="ml-2 h-5 w-5" />
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
