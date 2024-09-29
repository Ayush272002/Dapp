# SolFlare

This decentralized application allows users to effortlessly airdrop SOL tokens on the Solana Devnet. With a user-friendly interface, you can manage your tokens, send them to other users, and view real-time information about your assets.

### Live Demo

You can try the application live at: [SolFlare Live Demo](https://sol-flare.vercel.app/)

## Tech Stack

- Next.js
- shadcn
- solana/web3.js
- solana/wallet-adapter
- solana/spl-token
- nobel curves (for ed25519)

## Preview

<p align="center">
  <img src="public/preview.gif" />
</p>

## Running the project locally

### Prerequisites

Before using this repository, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v16+)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ayush272002/SolFlare.git
   cd SolFlare
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up a `.env` file with the following variables:

   ```bash
    NEXT_PUBLIC_DEVNET_RPC_URL=https://api.devnet.solana.com
    NEXT_PUBLIC_MAINNET_RPC_URL=https://api.mainnet-beta.solana.com
   ```

   Or you can replace them with your private rpc url, so that you will not get rate limited

### Running the Project

```bash
npm run dev
```

## Contributing

Feel free to submit issues or pull requests if you want to improve this tool or add new features.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
