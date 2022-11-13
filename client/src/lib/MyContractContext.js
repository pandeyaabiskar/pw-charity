import React from "react";
import {_web3Instance, _getLocalProvider} from "./Web3Context";
import truffleContract from "@truffle/contract";
import charityFactoryABI from "../contracts/CharityFactory.json";
import charityABI from "../contracts/Charity.json";

const CharityFactory = truffleContract(charityFactoryABI);
const Charity = truffleContract(charityABI);
// If _web3Instance is undefined, fallback to local network
if (!_web3Instance) {
  CharityFactory.setProvider(_getLocalProvider()?.currentProvider);
  Charity.setProvider(_getLocalProvider()?.currentProvider);
} else {
  CharityFactory.setProvider(_web3Instance.currentProvider);
  Charity.setProvider(_web3Instance.currentProvider);
}
// Default ganache network id is 5777.
// Replace it with your working network id
CharityFactory.setNetwork(parseInt(process.env.NETWORK_ID));
Charity.setNetwork(parseInt(process.env.NETWORK_ID));

export const MyContract = {CharityFactory, Charity};
export const MyContractContext = React.createContext();

