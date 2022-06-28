import { ethers } from 'ethers';
import { chainConfig } from './config';

const chainUrl = 'http://' + chainConfig.nodeAddr + ':' + chainConfig.gethPort;
let provider: ethers.providers.JsonRpcProvider;
let ethConnected = false;

export const connectToEth = () => {
  try {
    console.log('Connect to eth network...');
    provider = new ethers.providers.JsonRpcProvider(chainUrl);
    ethConnected = true;
  } catch (e) {
    console.log(`Failed to connect to eth network.${e.message}`);
  }
};

export const isConnected = () => {
  connectToEth();
  if (!ethConnected) {
    console.error('eth network not connected, quite ~');
  }
  return ethConnected;
};

export const isBlockchainAddress = (address: string) => {
  return ethers.utils.isAddress(address);
};

export const createKeystore = async (salt: string) => {
  if (isConnected()) {
    const wallet = await ethers.Wallet.createRandom();
    const keystore = await wallet.encrypt(salt || '');
    return keystore;
  } else {
    return null;
  }
};

export const getSignerFromKeystore = async (keystore: string, salt: string) => {
  if (!keystore || keystore === '') {
    console.error('keystore is empty, return');
    return null;
  }
  if (isConnected()) {
    const walletBack = await ethers.Wallet.fromEncryptedJson(
      keystore,
      salt || '',
    );
    const connectedWallet = walletBack.connect(provider);
    return connectedWallet;
  } else {
    return null;
  }
};

export const getSignerFromAddress = async (walletAddress: string) => {
  if (isConnected()) {
    const signer = provider.getSigner(walletAddress);
    return signer;
  } else {
    return null;
  }
};

export const getAddressFromKeystore = (keystore: { address: string }) => {
  return `0x${keystore.address}`;
};

export  const getContractInstance = async (
  contractAddress: string,
  contractAbi: ethers.ContractInterface,
) => {
  if (isConnected()) {
    try {
      const contractInEth = new ethers.Contract(
        contractAddress,
        contractAbi,
        provider.getSigner(),
      );
      return contractInEth;
    } catch (e) {
        console.error(`Fail to get contract instance: ${e.message}`);
    }
  } else {
    return null;
  }
};

export const queryEventByFilter = async (
  contract: ethers.Contract,
  filter: ethers.EventFilter,
  fromBlockNum: number,
  toBlockNum: number,
): Promise<any> => {
  if (isConnected()) {
    try {
      if (isNaN(toBlockNum)) {
        toBlockNum = 0;
      }
      const result = await contract.queryFilter(
        filter,
        fromBlockNum,
        toBlockNum,
      );
      return result;
    } catch (e) {
      console.error(`Fail to get contract event: ${e.message}`);
    }
  } else {
    return null;
  }
};
