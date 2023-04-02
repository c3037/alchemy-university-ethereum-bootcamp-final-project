import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import * as dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/.env.local` });
const env = {
    SEPOLIA_RPC_URL: process.env.ALCHEMY_SEPOLIA_RPC_URL || "",
    SEPOLIA_PRIV_KEY: process.env.ALCHEMY_SEPOLIA_PRIV_KEY || "",
};

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.18",
    },
    networks: {
        localhost: {},
        sepolia: {
            url: env.SEPOLIA_RPC_URL,
            accounts: [env.SEPOLIA_PRIV_KEY],
        },
    },
    typechain: {
        outDir: "./var/typechain",
    },
    paths: {
        tests: "./tests",
        cache: "./var/cache",
        artifacts: "./var/artifacts",
    },
};

export default config;
