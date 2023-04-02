// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract Token is ERC20 {
    constructor(uint256 initialSupply) ERC20("DimCoin", "DIM") {
        // todo: remove
        console.log("Token constructed ", address(this));
        
        _mint(msg.sender, initialSupply);
    }
}
