import Link from "next/link";

export const metadata = {
  title: "How it works — Mangi (MANG)",
  description: "Everything you need to know to buy and sell MANG on Solana.",
};

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="mb-12">
    <h2 className="text-xl font-bold mb-4 text-white">{title}</h2>
    {children}
  </section>
);

const Step = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
  <div className="flex gap-4 mb-5">
    <div className="w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
      {n}
    </div>
    <div>
      <p className="font-semibold text-white mb-1">{title}</p>
      <div className="text-zinc-400 text-sm leading-relaxed">{children}</div>
    </div>
  </div>
);

const Q = ({ q, children }: { q: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <p className="font-semibold text-white mb-1">Q: {q}</p>
    <div className="text-zinc-400 text-sm leading-relaxed">{children}</div>
  </div>
);

const Warning = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-yellow-300 text-sm leading-relaxed mb-4">
    ⚠️ {children}
  </div>
);

const Info = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-blue-300 text-sm leading-relaxed mb-4">
    ℹ️ {children}
  </div>
);

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#12101e] to-[#0a0a0f] text-white">
      <div className="max-w-2xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-10">
          <Link href="/" className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors">
            ← Back to trading
          </Link>
          <div className="flex items-center gap-3 mt-6 mb-2">
            <span className="text-4xl">🥭</span>
            <h1 className="text-3xl font-bold">Mangi (MANG)</h1>
          </div>
          <p className="text-zinc-400">
            Everything you need to know to buy and sell MANG — no crypto experience required.
          </p>
        </div>

        {/* Table of contents */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-10">
          <p className="text-sm font-semibold text-zinc-300 mb-3">On this page</p>
          <ul className="space-y-1.5 text-sm">
            {[
              ["#what-is-mang", "What is MANG?"],
              ["#what-is-a-wallet", "What is a crypto wallet?"],
              ["#getting-started", "Getting started (step by step)"],
              ["#buying", "How to buy MANG"],
              ["#selling", "How to sell MANG"],
              ["#fees", "Fees explained"],
              ["#safety", "Is this safe?"],
              ["#faq", "FAQ"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="text-purple-400 hover:text-purple-300 underline underline-offset-2">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Sections */}
        <Section id="what-is-mang" title="What is MANG?">
          <p className="text-zinc-400 text-sm leading-relaxed mb-3">
            MANG (Mangi) is a token on the Solana blockchain. It was launched on{" "}
            <a href="https://pump.fun" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline">pump.fun</a>
            , a platform that lets anyone create and trade tokens fairly — no presales, no insider allocations.
          </p>
          <p className="text-zinc-400 text-sm leading-relaxed mb-3">
            When you buy MANG, you're exchanging SOL (Solana's native currency) for MANG tokens, which go directly into your wallet. When you sell, you swap MANG back for SOL.
          </p>
          <Info>
            MANG is a memecoin on the Solana blockchain. Like all memecoins, its value can go up or down dramatically. Only trade what you're comfortable losing.
          </Info>
        </Section>

        <Section id="what-is-a-wallet" title="What is a crypto wallet?">
          <p className="text-zinc-400 text-sm leading-relaxed mb-3">
            A crypto wallet is a free browser extension (like Phantom) that stores your Solana and tokens. Think of it like a bank account that only you control — no company can freeze it or take your funds.
          </p>
          <p className="text-zinc-400 text-sm leading-relaxed mb-3">
            When you "connect" your wallet to this site, it only shares your public address (like an account number). <strong className="text-white">This site never sees your password or private key.</strong> Every trade requires you to manually approve it inside your wallet app.
          </p>
          <Warning>
            Never share your wallet's seed phrase (the 12–24 word recovery phrase) with anyone. Not us, not support, not anyone. Anyone who asks for it is trying to steal your funds.
          </Warning>
        </Section>

        <Section id="getting-started" title="Getting started (step by step)">
          <Step n={1} title="Install Phantom Wallet">
            Go to{" "}
            <a href="https://phantom.com/download" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline">
              phantom.com/download
            </a>{" "}
            and install the browser extension. It's free and takes about 2 minutes. Write down your seed phrase somewhere safe offline — this is your backup.
          </Step>
          <Step n={2} title="Get some SOL">
            You need SOL to buy MANG and to pay tiny network fees (~$0.001 per trade). You can buy SOL on{" "}
            <a href="https://coinbase.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline">Coinbase</a>,{" "}
            <a href="https://kraken.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline">Kraken</a>, or any major exchange, then send it to your Phantom wallet address.
          </Step>
          <Step n={3} title="Connect your wallet">
            Come back to this site and click the <strong className="text-white">Connect Wallet</strong> button. A popup will appear in Phantom — click Approve. That's it.
          </Step>
          <Step n={4} title="Buy MANG">
            Enter how much SOL you want to spend, hit <strong className="text-white">Buy MANG</strong>, and approve the transaction in Phantom. MANG will appear in your wallet within seconds.
          </Step>
        </Section>

        <Section id="buying" title="How to buy MANG">
          <p className="text-zinc-400 text-sm leading-relaxed mb-3">
            Select <strong className="text-white">Buy</strong>, enter the amount of SOL you want to spend, and hit the Buy button. You can use the quick-select buttons (0.1, 0.5, 1 SOL) or type a custom amount.
          </p>
          <p className="text-zinc-400 text-sm leading-relaxed mb-3">
            Your wallet will pop up asking you to approve. Review the transaction details and click <strong className="text-white">Approve</strong>. The trade settles on-chain in a few seconds and MANG lands in your wallet.
          </p>
          <Info>
            The amount of MANG you receive depends on the current price on the bonding curve. The earlier you buy, the more MANG you get per SOL.
          </Info>
        </Section>

        <Section id="selling" title="How to sell MANG">
          <p className="text-zinc-400 text-sm leading-relaxed mb-3">
            Select <strong className="text-white">Sell</strong>, then enter either a specific token amount or a percentage of your holdings (e.g. "50%" to sell half, "100%" to sell everything).
          </p>
          <p className="text-zinc-400 text-sm leading-relaxed mb-3">
            Approve the transaction in your wallet. SOL will arrive in your wallet within seconds.
          </p>
          <Warning>
            Selling 100% of your MANG means you will have zero MANG left. Double-check your amount before approving.
          </Warning>
        </Section>

        <Section id="fees" title="Fees explained">
          <div className="space-y-3">
            {[
              ["Solana network fee", "~$0.001", "Paid to the Solana network to process your transaction. Tiny and unavoidable."],
              ["PumpPortal routing fee", "0.5% of trade", "Charged by the service that builds your transaction. Automatically deducted from the trade — you don't need to do anything."],
              ["pump.fun bonding curve fee", "~1%", "Built into the pump.fun trading contract. Same fee everyone pays on pump.fun."],
              ["This site's fee", "None", "We don't charge any additional fees on top."],
            ].map(([name, amount, desc]) => (
              <div key={name as string} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-white">{name}</span>
                  <span className="text-sm font-mono text-green-400">{amount}</span>
                </div>
                <p className="text-xs text-zinc-500">{desc}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="safety" title="Is this safe?">
          <p className="text-zinc-400 text-sm leading-relaxed mb-4">
            Here's exactly what happens when you trade:
          </p>
          <Step n={1} title="You connect your wallet">
            The site learns your public address. Nothing else. It cannot move your funds.
          </Step>
          <Step n={2} title="You hit Buy or Sell">
            Our server asks PumpPortal to build a trade transaction. It comes back unsigned — totally inert. Nobody has sent anything yet.
          </Step>
          <Step n={3} title="Your wallet shows you the transaction">
            Phantom shows you exactly what the transaction will do: how much SOL leaves, how many tokens you get. You review it.
          </Step>
          <Step n={4} title="You approve (or reject)">
            Only after you click Approve in your wallet does anything happen. You're in control at every step.
          </Step>
          <Info>
            Your private key never leaves your wallet. This site never touches it. Transactions are signed entirely inside the Phantom extension on your device.
          </Info>
        </Section>

        <Section id="faq" title="FAQ">
          <Q q="I don't see MANG in my wallet after buying. What happened?">
            Phantom sometimes doesn't show unknown tokens by default. Go to your Phantom wallet, click the token list, and look for MANG or paste the contract address: <span className="font-mono text-xs text-zinc-300 break-all">BkhqEefy6qC6FFQrc5AGbdNG94yNDAC8gAdjACK5pump</span>. You can also check your transaction on <a href="https://solscan.io" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline">Solscan</a>.
          </Q>
          <Q q="My transaction failed. What do I do?">
            This is usually due to slippage — the price moved before your trade went through. Try again. If it keeps failing, the bonding curve may have low liquidity. Start with a smaller amount.
          </Q>
          <Q q="Can I lose money?">
            Yes. MANG is a memecoin and its price can drop to zero. Never invest more than you're comfortable losing completely. This is a speculative asset meant for fun, not a stable investment. 
            Don't expect a return, and don't buy more than you can afford to lose.
          </Q>
          <Q q="Do I need to KYC or make an account?">
            No. No account, no email, no identity verification. Your wallet is your identity.
          </Q>
          <Q q="What is a bonding curve?">
            It's pump.fun's built-in pricing mechanism. As more people buy MANG, the price goes up automatically. When people sell, it goes down. There's always liquidity — you can always buy or sell.
          </Q>
          <Q q="What happens when MANG 'graduates'?">
            When the bonding curve fills up (~85 SOL), MANG automatically moves to PumpSwap (pump.fun's DEX). Trading continues normally — you don't need to do anything.
          </Q>
          <Q q="I got a scam message saying I won free MANG. Is it real?">
            No. It's a scam. We will never DM you, never ask for your seed phrase, and never promise free tokens. Ignore it.
          </Q>
        </Section>

        {/* CTA */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center">
          <p className="text-zinc-400 text-sm mb-4">Ready to trade?</p>
          <Link
            href="/"
            className="inline-block px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-colors"
          >
            Go to trading app →
          </Link>
        </div>

      </div>
    </main>
  );
}
