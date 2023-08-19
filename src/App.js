import "./styles.css";
import * as web3 from "@solana/web3.js";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import * as walletAdapterWallets from "@solana/wallet-adapter-wallets";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
require("@solana/wallet-adapter-react-ui/styles.css");

const endpoint = web3.clusterApiUrl("devnet");
const wallets = [new walletAdapterWallets.PhantomWalletAdapter()];

function initializeKeypair() {
  const secret = JSON.parse(process.env.PRIVATE_KEY ?? "");
  const secretKey = Uint8Array.from(secret);
  const keypairFromSecretKey = web3.Keypair.fromSecretKey(secretKey);
  return keypairFromSecretKey;
}

function SendSOl() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const sender = useWallet();

  const clickme = (Event) => {
    if (!connection || !publicKey) {
      alert("hello");
      return;
    }
    Event.preventDefault();
    //const RecieverPubkrystr = Event.target.address.value;
    const AmountInSOL = Event.target.amount.value;

    const RECIEVER_PUBKEY = new initializeKeypair().publicKey;

    const transaction = new web3.Transaction();
    const instruction = web3.SystemProgram.transfer({
      fromPubkey: sender.publicKey,
      toPubkey: RECIEVER_PUBKEY,
      lamports: web3.LAMPORTS_PER_SOL * AmountInSOL
    });
    transaction.add(instruction);
    sendTransaction(transaction, connection).then((sig) => {
      console.log(sig);
      alert("Payment Successfull! Thanks for buying");
    });
  };

  return (
    <form onSubmit={clickme}>
      <input
        type="number"
        step="any"
        id="amount"
        placeholder="amount in sol"
      ></input>
      <button type="submit">Pay</button>
    </form>
  );
}

export default function App() {
  return (
    <div className="App">
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets}>
          <WalletModalProvider>
            <WalletMultiButton />
            <h1>Solana Pay</h1>
            <SendSOl />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}
