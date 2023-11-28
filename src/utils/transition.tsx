import { Contract, ethers } from "ethers";
import { sepolia, avalanche, samvad_abi } from "./configs";

export async function testProvider(url: String, data: any, signer: ethers.Signer) {
    console.log("inside the function 🎉")
    console.log("signer", signer)
    console.log("type", typeof signer)
    Promise.resolve();
}

const sepoliaProvider = new ethers.JsonRpcProvider("https://rpc.sepolia.org");
// provider: ethers.Provider | ethers.Signer

export async function getBalance(address: string) {
    console.log("address", address)
    const samvad = new Contract(sepolia.samvad, samvad_abi, sepoliaProvider);
    const balance = await samvad.balances(address);
    console.log(balance);
}

export async function getPostCount() {
    const samvad = new Contract(sepolia.samvad, samvad_abi, sepoliaProvider);
    const postCount = await samvad.getPostCount();
    console.log(postCount);
}

export async function getReplyCount() {
    const samvad = new Contract(sepolia.samvad, samvad_abi, sepoliaProvider);
    const replyCount = await samvad.getReplyCount();
    console.log(replyCount);
}

export async function getPost(id: number) {
    const samvad = new Contract(sepolia.samvad, samvad_abi, sepoliaProvider);
    const post = await samvad.getPost(id);
    console.log(post);
    console.log(post[0].toString());
    for (let i = 0; i < post.length; i++) {
        console.log(post[i]);
    }
    for (let i = 0; i < post[5].length; i++) {
        console.log(post[5][i].toString());
    }
}

export async function createReply(post: number, parent: number, text: string, top_level: boolean, amount: number, signer: ethers.Signer, network: string) {
    // if (network == "avalanche") {
    //     const samvad = new Contract(sepolia.samvad, samvad_abi, signer);
    //     const tx = await samvad.createReply(post, parent, text, top_level, amount);
    //     console.log(tx);
    // }
    const samvad = new Contract(sepolia.samvad, samvad_abi, signer);
    const tx = await samvad.createReply(post, parent, text, top_level, amount);
    await tx.wait();
    console.log(tx);
}