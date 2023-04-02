import { ethers } from "hardhat";
import { expect } from "chai";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Token", () => {
    let tokenSupply = "100";
    let token: Contract;
    let owner: SignerWithAddress,
        addr1: SignerWithAddress,
        addr2: SignerWithAddress;

    before(async () => {
        [owner, addr1, addr2] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Token");
        token = await Token.deploy(tokenSupply);
    });

    describe("Deployment", () => {
        it("Should assign total supply of tokens to the owner/deployer", async () => {
            const ownerBalance = await token.balanceOf(owner.address);
            expect(await token.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe("Transactions", () => {
        it("Should transfer tokens between accounts", async () => {
            await token.transfer(addr1.address, 50);
            const addr1Balance = await token.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(50);
        });

        it("Should transfer tokens between accounts", async () => {
            await expect(token.connect(addr1).transfer(addr2.address, 51)).to.be
                .reverted;
        });
    });
});
