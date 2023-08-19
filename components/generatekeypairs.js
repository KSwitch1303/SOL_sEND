import * as web3 from "@solana/web3.js";

export default function generateKeypair() {
  const newKeypair = web3.Keypair.generate();
  console.log(newKeypair.secretKey.toString());
  return <div> </div>;
}
