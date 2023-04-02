import * as hre from "hardhat";
import { Contract } from "ethers";
import fs from "fs";
import path from "path";

import { Token__factory, DEX__factory } from "../var/typechain";

async function main() {
    const deloymentInfoDir: string = "var/deployments/" + Date.now();

    const Token = (await hre.ethers.getContractFactory(
        "Token"
    )) as Token__factory;
    const token = await Token.deploy("100");
    await token.deployed();
    await writeDeploymentInfo(token, deloymentInfoDir + "/token.json");

    const DEX = (await hre.ethers.getContractFactory("DEX")) as DEX__factory;
    const dex = await DEX.deploy(token.address, 100);
    await dex.deployed();
    await writeDeploymentInfo(dex, deloymentInfoDir + "/dex.json");

    console.log("Deployment info: " + deloymentInfoDir);
}

async function writeDeploymentInfo(contract: Contract, filename: string = "") {
    const data = {
        network: hre.network.name,
        contract: {
            address: contract.address,
            owner: await contract.signer.getAddress(),
            abi: contract.interface.format(),
        },
    };
    const content = JSON.stringify(data, null, 2);

    var dirname = path.dirname(filename);
    if (!fs.existsSync(dirname)) {
        await fs.promises.mkdir(dirname, { recursive: true });
    }
    await fs.promises.writeFile(filename, content, { encoding: "utf-8" });
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
