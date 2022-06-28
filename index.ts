import * as dotenv from 'dotenv';
import { getSalt } from './src/salt';
import { createKeystore, getAddressFromKeystore } from './src/ethers';
dotenv.config();

async function run() {
    const salt = getSalt(8);
    const keystore = await createKeystore(salt);
    const address = getAddressFromKeystore(JSON.parse(keystore) as { address: string });
    console.log(address);
}

run();
