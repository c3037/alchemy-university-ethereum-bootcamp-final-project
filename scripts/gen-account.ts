import { getPublicKey, utils } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { computeAddress } from "ethers/lib/utils";

const privatekey = utils.randomPrivateKey();
console.log("PrivateKey: ", toHex(privatekey));

const publicKey = getPublicKey(privatekey);
console.log("PublicKey: ", toHex(publicKey));

const address = computeAddress(privatekey);
console.log("Address: ", address);
