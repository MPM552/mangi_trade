"use client";

import { useState, useEffect } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { VersionedTransaction } from "@solana/web3.js";
import Link from "next/link";

type Action = "buy" | "sell";
type Status = "idle" | "building" | "signing" | "sending" | "done" | "error";

const MINT = "BkhqEefy6qC6FFQrc5AGbdNG94yNDAC8gAdjACK5pump";
const PUMP_URL = `https://pump.fun/coin/${MINT}`;
const PHANTOM_URL = "https://phantom.com/download";

export default function Home() {
  const { publicKey, signTransaction, connected } = useWallet();
  const { connection } = useConnection();

  const [action, setAction] = useState<Action>("buy");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [txSig, setTxSig] = useState("");
  const [hasWallet, setHasWallet] = useState<boolean | null>(null);

  // Detect if any Solana wallet extension is installed
  useEffect(() => {
    const timer = setTimeout(() => {
      const detected =
        typeof window !== "undefined" &&
        !!(
          (window as any).solana ||
          (window as any).phantom ||
          (window as any).backpack ||
          (window as any).solflare
        );
      setHasWallet(detected);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleTrade = async () => {
    if (!publicKey || !signTransaction || !amount) return;
    setStatus("building");
    setError("");
    setTxSig("");

    try {
      const res = await fetch("/api/trade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          publicKey: publicKey.toBase58(),
          action,
          amount: action === "sell" && amount.endsWith("%") ? amount : Number(amount),
          denominatedInSol: action === "buy" ? "true" : "false",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to build transaction");
      }

      const buffer = await res.arrayBuffer();
      const tx = VersionedTransaction.deserialize(new Uint8Array(buffer));

      setStatus("signing");
      const signedTx = await signTransaction(tx);

      setStatus("sending");
      const sig = await connection.sendTransaction(signedTx);
      await connection.confirmTransaction(sig, "confirmed");

      setTxSig(sig);
      setStatus("done");
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  };

  const reset = () => { setStatus("idle"); setError(""); setTxSig(""); };
  const busy = status === "building" || status === "signing" || status === "sending";

  const statusLabel: Record<Status, string> = {
    idle: "",
    building: "Building your transaction...",
    signing: "Check your wallet — approve the transaction",
    sending: "Sending to the Solana network...",
    done: "",
    error: "",
  };

  // ── Step 1: No wallet detected ──────────────────────────────────────────
  const renderNoWallet = () => (
    <div className="text-center">
      <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">👻</span>
      </div>
      <h2 className="text-lg font-bold mb-1">First, you need a wallet</h2>
      <p className="text-zinc-400 text-sm mb-5 leading-relaxed">
        A crypto wallet is a free browser extension that holds your Solana and lets you approve trades. Think of it like a secure login — your money never touches this site.
      </p>
      <a
        href={PHANTOM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-colors mb-3"
      >
        Install Phantom Wallet (free) ↗
      </a>
      <p className="text-zinc-600 text-xs">
        Already installed?{" "}
        <button onClick={() => setHasWallet(true)} className="text-purple-400 underline">
          continue
        </button>
      </p>
      <p className="text-zinc-600 text-xs mt-2">
        After installing, refresh this page.
      </p>
    </div>
  );

  // ── Step 2: Wallet installed but not connected ───────────────────────────
  const renderConnect = () => (
    <div className="text-center">
      <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">🔌</span>
      </div>
      <h2 className="text-lg font-bold mb-1">Connect your wallet</h2>
      <p className="text-zinc-400 text-sm mb-5 leading-relaxed">
        Hit the button below and approve the connection in your wallet popup. This just lets the app see your address — it <strong className="text-white">cannot</strong> move your funds without you approving each trade.
      </p>
      <div className="flex justify-center">
        <WalletMultiButton
          style={{
            background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
            borderRadius: "12px",
            fontWeight: 600,
            fontSize: "14px",
            width: "100%",
            justifyContent: "center",
          }}
        />
      </div>
    </div>
  );

  // ── Step 3: Trade UI ─────────────────────────────────────────────────────
  const renderTrade = () => (
    <>
      {/* Connected address */}
      <div className="flex items-center justify-between mb-4 px-1">
        <span className="text-xs text-zinc-500 font-mono">
          {publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4)}
        </span>
        <WalletMultiButton
          style={{
            background: "transparent",
            border: "1px solid #3f3f46",
            borderRadius: "8px",
            fontSize: "11px",
            height: "28px",
            padding: "0 10px",
            color: "#a1a1aa",
          }}
        />
      </div>

      {/* Buy / Sell toggle */}
      <div className="flex rounded-xl overflow-hidden border border-zinc-700 mb-4">
        {(["buy", "sell"] as Action[]).map((a) => (
          <button
            key={a}
            onClick={() => { setAction(a); setAmount(""); }}
            className={`flex-1 py-2.5 text-sm font-semibold transition-colors capitalize ${
              action === a
                ? a === "buy" ? "bg-green-600 text-white" : "bg-red-600 text-white"
                : "bg-transparent text-zinc-400 hover:text-white"
            }`}
          >
            {a === "buy" ? "Buy MANG" : "Sell MANG"}
          </button>
        ))}
      </div>

      {/* Amount input */}
      <div className="mb-3">
        <label className="text-xs text-zinc-500 mb-1.5 block">
          {action === "buy" ? "How much SOL do you want to spend?" : "How much MANG do you want to sell?"}
        </label>
        <div className="flex items-center bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 gap-2 focus-within:border-zinc-500 transition-colors">
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={action === "buy" ? "0.1" : "1000 or 50%"}
            className="flex-1 bg-transparent text-white text-lg font-mono outline-none placeholder-zinc-600"
          />
          <span className="text-zinc-400 text-sm font-mono shrink-0">
            {action === "buy" ? "SOL" : "MANG"}
          </span>
        </div>
      </div>

      {/* Quick amounts */}
      <div className="flex gap-2 mb-4">
        {action === "buy"
          ? ["0.1", "0.5", "1"].map((v) => (
              <button key={v} onClick={() => setAmount(v)}
                className="flex-1 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono transition-colors">
                {v} SOL
              </button>
            ))
          : ["25%", "50%", "100%"].map((v) => (
              <button key={v} onClick={() => setAmount(v)}
                className="flex-1 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono transition-colors">
                {v}
              </button>
            ))
        }
      </div>

      {/* Trade button */}
      <button
        onClick={handleTrade}
        disabled={!amount}
        className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
          action === "buy"
            ? "bg-green-600 hover:bg-green-500 shadow-lg shadow-green-900/30"
            : "bg-red-600 hover:bg-red-500 shadow-lg shadow-red-900/30"
        }`}
      >
        {action === "buy" ? "Buy MANG →" : "Sell MANG →"}
      </button>

      <p className="text-center text-zinc-600 text-xs mt-3">
        0.5% fee · 10% slippage · trades on pump.fun bonding curve
      </p>
    </>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#12101e] to-[#0a0a0f] text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🥭</div>
          <h1 className="text-3xl font-bold tracking-tight">Mangi</h1>
          <p className="text-zinc-500 text-xs mt-0.5 font-mono">MANG · Solana</p>
          <div className="flex items-center justify-center gap-3 mt-2">
            <a href={PUMP_URL} target="_blank" rel="noopener noreferrer"
              className="text-xs text-purple-400 hover:text-purple-300 underline underline-offset-2">
              pump.fun ↗
            </a>
            <span className="text-zinc-700">·</span>
            <Link href="/docs" className="text-xs text-purple-400 hover:text-purple-300 underline underline-offset-2">
              how it works ↗
            </Link>
          </div>
        </div>

        {/* Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
          {/* Progress steps (only when not in trade flow) */}
          {!connected && (
            <div className="flex items-center gap-1 mb-5">
              {["Install wallet", "Connect", "Trade"].map((label, i) => {
                const active = i === 0 ? !hasWallet : i === 1 ? hasWallet && !connected : connected;
                const done = i === 0 ? hasWallet : i === 1 ? connected : false;
                return (
                  <div key={label} className="flex items-center gap-1 flex-1">
                    <div className={`flex-1 text-center`}>
                      <div className={`text-xs font-medium ${done ? "text-green-400" : active ? "text-white" : "text-zinc-600"}`}>
                        {done ? "✓" : `${i + 1}.`} {label}
                      </div>
                    </div>
                    {i < 2 && <div className="w-3 h-px bg-zinc-700 shrink-0" />}
                  </div>
                );
              })}
            </div>
          )}

          {/* State machine */}
          {busy && (
            <div className="text-center py-4">
              <svg className="animate-spin h-9 w-9 text-purple-400 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <p className="text-zinc-300 text-sm">{statusLabel[status]}</p>
            </div>
          )}

          {status === "done" && (
            <div className="text-center py-2">
              <div className="text-4xl mb-3">✅</div>
              <p className="text-green-400 font-semibold mb-1">Trade confirmed!</p>
              <p className="text-zinc-400 text-xs mb-3">Your MANG should be in your wallet now.</p>
              <a href={`https://solscan.io/tx/${txSig}`} target="_blank" rel="noopener noreferrer"
                className="text-xs text-purple-400 hover:text-purple-300 underline underline-offset-2 break-all">
                View transaction on Solscan ↗
              </a>
              <button onClick={reset}
                className="w-full mt-5 py-3 rounded-xl border border-zinc-700 hover:bg-zinc-800 text-zinc-300 text-sm font-medium transition-colors">
                Trade again
              </button>
            </div>
          )}

          {status === "error" && (
            <div className="text-center py-2">
              <div className="text-4xl mb-3">⚠️</div>
              <p className="text-red-400 text-sm mb-4 break-words">{error}</p>
              <button onClick={reset}
                className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium transition-colors">
                Try again
              </button>
            </div>
          )}

          {!busy && status !== "done" && status !== "error" && (
            <>
              {hasWallet === false && renderNoWallet()}
              {hasWallet === true && !connected && renderConnect()}
              {connected && renderTrade()}
            </>
          )}
        </div>

        <p className="text-center text-zinc-700 text-xs mt-4">
          Your private key never leaves your wallet. Ever.
        </p>
      </div>
    </main>
  );
}
