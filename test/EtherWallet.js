const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EtherWallet", function () {
  let EtherWallet;
  let etherwallet;
  let owner;
  let user;
  
  beforeEach(async function () {
    EtherWallet = await
    await ethers.getContractFactory("EtherWallet");
    [owner,user] = await ethers.getSigners();
    etherwallet = await EtherWallet.connect(owner).deploy();
    
  });

  it("Should return the balance of contract", async function() {

    const BalanceOfContract = await etherwallet.getBalanceContract();
    expect(BalanceOfContract).to.equal(0);
  })

  it("Should return the balance of sender`s", async function(){
    const initialBalance = await ethers.provider.getBalance(owner.address);

    const balance = await etherwallet.getBalanceUser();
    expect(balance).to.equal(initialBalance);

  })

  it("Should revert if caller is not owner", async function(){
    const amountToWithdraw = ethers.parseEther('2');
    await expect(etherwallet.connect(user).withdraw(amountToWithdraw)).to.be.revertedWith("caller is not owner");
 })

  it("Should revert if insufficient balance", async function() {

    const amountToWithdraw = ethers.parseEther('97');
    await expect(etherwallet.connect(owner).withdraw(amountToWithdraw)).to.be.revertedWith("Insufficient balance");
    
  })

  it("Should withdraw funds by owner", async function() {

    const initialFunds = ethers.parseEther('3');
    await user.sendTransaction({
     
     to: etherwallet.address, 
     value: ethers.parseEther('3', 'ether'),

      }); //Sent money to contract
    const initialBalance = await ethers.provider.getBalance(owner.address); //Balance of owner`s

    const amountToWithdraw = ethers.parseEther('2');
    await etherwallet.connect(owner).withdraw(amountToWithdraw); //Withdraw balance of contract to owner

    const finalbalance = await ethers.provider.getBalance(owner.address); //Balance owner`s after withdraw
    expect(finalbalance).to.equal(initialBalance.add(amountToWithdraw));
    
  })

});