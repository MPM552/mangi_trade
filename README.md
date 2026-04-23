# 🥭 Mangi (MANG) Trading App

A clean, beginner-friendly web app for buying and selling **MANG** tokens on the Solana bonding curve via pump.fun.

**Live trading · No account required · Your keys, your coins**

---

## What it does

- Connect any Solana wallet (Phantom, Solflare, Backpack, etc.)
- Buy MANG with SOL
- Sell MANG back for SOL
- Guides total beginners through wallet setup step by step
- Full docs page explaining everything in plain English

Trades execute directly on the pump.fun bonding curve via [PumpPortal's Local Transaction API](https://pumpportal.fun/local-trading-api/trading-api). Transactions are built server-side, signed by the user's own wallet, and sent to Solana mainnet. **No private keys ever touch this server.**

---

## Token

| | |
|---|---|
| **Name** | Mangi |
| **Ticker** | MANG |
| **Mint** | `BkhqEefy6qC6FFQrc5AGbdNG94yNDAC8gAdjACK5pump` |
| **Network** | Solana mainnet-beta |
| **pump.fun** | [View token](https://pump.fun/coin/BkhqEefy6qC6FFQrc5AGbdNG94yNDAC8gAdjACK5pump) |

---

## Running locally

```bash
# 1. Clone / unzip the project
cd sol-rng

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). That's it.

### Environment variables

A `.env.local` file is included with everything pre-configured. No setup needed.

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SOLANA_RPC_URL` | Public Solana Tracker RPC |
| `SOLANA_RPC_URL` | Same, for server-side |

You can swap in your own RPC endpoint if you have one (recommended for production).

---

## Deploying

### Vercel (easiest)

```bash
npm install -g vercel
vercel
```

Follow the prompts. Add the environment variables from `.env.local` in the Vercel dashboard under Project → Settings → Environment Variables.

### Any Node host

```bash
npm run build
npm start
```

Requires Node 18+.

---

## How it works

```
User clicks Buy/Sell
      ↓
Server calls PumpPortal API → gets unsigned VersionedTransaction
      ↓
Transaction sent to user's browser
      ↓
User signs in their wallet (Phantom popup)
      ↓
Signed transaction sent to Solana via your RPC
      ↓
Confirmed on-chain → MANG lands in user's wallet
```

No custodial wallets. No stored keys. Users are in full control.

---

## Fees

| Fee | Amount | Who gets it |
|---|---|---|
| Solana network fee | ~$0.001 | Solana validators |
| PumpPortal routing fee | 0.5% | PumpPortal |
| pump.fun bonding curve fee | ~1% | pump.fun |
| This app | 0% | — |

---

## Tech stack

- [Next.js 16](https://nextjs.org/) — framework
- [@solana/web3.js](https://github.com/solana-labs/solana-web3.js) — transaction signing & RPC
- [@solana/wallet-adapter-react](https://github.com/anza-xyz/wallet-adapter) — wallet connection (Wallet Standard)
- [PumpPortal API](https://pumpportal.fun) — transaction building
- [Tailwind CSS v4](https://tailwindcss.com) — styling

---

## Pages

| Route | Description |
|---|---|
| `/` | Trading interface |
| `/docs` | Plain-English guide for beginners |

---

## Security

- This server **never** handles private keys
- Transactions are built server-side but signed client-side in the user's wallet
- Wallet connection only exposes the user's public address
- Every trade requires explicit approval in the user's wallet

---

## Disclaimer

MANG is a memecoin. Its value can go to zero. This app is provided as-is with no financial guarantees. Trade only what you can afford to lose.
