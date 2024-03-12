// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EtherWallet {
    address public owner;

   

    constructor() payable  {
     owner = msg.sender; 
    }
    
    function withdraw(uint256 _amount) external {
        require(msg.sender == owner, "caller is not owner");
        require(_amount <= address(this).balance, "Insufficient balance");
        payable(msg.sender).transfer(_amount);
    }

    function getBalanceContract() external view returns (uint256) {
        return address(this).balance;
    }
    
    function getBalanceUser() external view returns (uint256) {
        return address(msg.sender).balance;
    }
}