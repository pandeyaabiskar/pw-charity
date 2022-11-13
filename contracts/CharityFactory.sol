// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract CharityFactory {
    mapping(address => address[]) public charityList; 
    uint charityCount = 0;

    function createCharity(string memory _name, uint _targetAmount) public {
        address deployedAddress = address(new Charity(_name, _targetAmount, payable(msg.sender)));
        charityList[msg.sender].push(deployedAddress);
        charityCount++;
    }
}

contract Charity {
    string public name;
    uint public targetAmount;
    address payable public owner;
    uint public amountRaised;
    mapping(address => uint) public donations;

    constructor(string memory _name, uint _targetAmount, address payable _creator) {
        name = _name;
        targetAmount = _targetAmount;
        owner = _creator;
    }

    modifier onlyOwner{
        require(owner == msg.sender, "Not allowed");
        _;
    }

    function donate() public payable {
        require(amountRaised + msg.value <= targetAmount, "Sorry, we have reached our target.");
        amountRaised += msg.value;
        donations[msg.sender] += msg.value;
    }

    function withdraw() onlyOwner public{
        owner.transfer(amountRaised);
    }

    function getBalance() public view returns(uint){
        return address(this).balance;
    }

}