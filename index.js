const cryptoRandomString = require('crypto-random-string');
const ethers = require('ethers').ethers;

async function run() {
    const chainUrl = 'http://127.0.0.1:22000';
    const getSalt = (saltLength) => {
        return cryptoRandomString({ length: saltLength || 8 });
    };
    
    const provider = new ethers.providers.JsonRpcProvider(chainUrl);
    console.log(provider);
    const wallet = await ethers.Wallet.createRandom();
    const salt = getSalt(8);
    const keystore = await wallet.encrypt(salt || '');
    console.log(keystore);
}

run();
