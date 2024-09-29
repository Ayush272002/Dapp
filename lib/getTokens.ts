//brings all the tokens in a wallet of both v1 and v2 ProgramId

import { Connection, PublicKey } from '@solana/web3.js';
import {
  TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  getTokenMetadata,
} from '@solana/spl-token';

// const walletToQuery = new PublicKey("")    // Wallet address to query

export async function getTokenAccounts(
  walletToQuery: PublicKey,
  network: string = 'mainnet-beta'
) {
  // Establish connection to the cluster
  let rpcEndpoint;
  if (network === 'mainnet-beta') {
    rpcEndpoint = process.env.NEXT_PUBLIC_MAINNET_RPC_URL;
  } else if (network === 'devnet') {
    rpcEndpoint = process.env.NEXT_PUBLIC_DEVNET_RPC_URL;
  }

  // rpcEndpoint = `https://api.${network}.solana.com`;
  const connection = new Connection(rpcEndpoint!);

  const allTokensInfo = [];

  const walletPublicKey = walletToQuery;

  // Get all SPL token accounts owned by the wallet
  const tokenAccountsV1 = await connection.getParsedTokenAccountsByOwner(
    walletPublicKey,
    { programId: TOKEN_2022_PROGRAM_ID } // Token Program v2
  );

  const tokenAccountsV2 = await connection.getParsedTokenAccountsByOwner(
    walletPublicKey,
    { programId: TOKEN_PROGRAM_ID } // Token Program v1
  );

  const token22Length = tokenAccountsV1.value.length;
  const accounts = [tokenAccountsV1.value, tokenAccountsV2.value].flat();

  // console.log(
  //   `Found ${accounts.length} token account(s) for wallet ${walletToQuery}.`
  // );

  // Use for...of loop to handle async/await properly
  for (const [i, account] of Array.from(accounts.entries())) {
    const parsedAccountInfo = account.account.data;
    const mintAddress: string = parsedAccountInfo['parsed']['info']['mint'];
    const tokenBalance: number =
      parsedAccountInfo['parsed']['info']['tokenAmount']['uiAmount'];
    const tokenDecimals: number =
      parsedAccountInfo['parsed']['info']['tokenAmount']['decimals'];

    const tokenProgram = parsedAccountInfo['program'];

    // console.log(`--All info: ${JSON.stringify(parsedAccountInfo, null, 2)}`);

    const mint = new PublicKey(mintAddress);
    let metadata;
    if (i < token22Length) {
      metadata = await getTokenMetadata(connection, mint);
    } else {
      metadata = await getTokenMetadata(
        connection,
        mint,
        'confirmed',
        TOKEN_PROGRAM_ID
      );
    }

    const TokenInfo = {
      id: i + 1,
      name: metadata ? metadata.name : 'UNKNOWN TOKEN',
      symbol: metadata ? metadata.symbol : 'TOKEN',
      balance: tokenBalance,
      price: 0,
      change24h: 0,
      mintAddress,
      decimals: tokenDecimals,
      tokenAddress: account.pubkey.toString(),
      uri: metadata ? metadata.uri : '',
      tokenProgram,
    };

    allTokensInfo.push(TokenInfo);
  }

  // console.log(allTokensInfo);
  return allTokensInfo;
}
