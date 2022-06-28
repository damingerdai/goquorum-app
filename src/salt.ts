import * as cryptoRandomString from "crypto-random-string";

export const getSalt = (saltLength: number) => {
  return cryptoRandomString({ length: saltLength || 8 });
};

