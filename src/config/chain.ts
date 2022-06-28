export interface IChainConfig {
  nodeAddr: string;
  gethPort: number;
}

export const chainConfig: Partial<IChainConfig> = {
    nodeAddr: process.env.CHAIN_HOST,
    gethPort: (process.env.CHAIN_PORT ? parseInt(process.env.CHAIN_PORT, 10) : 22000),
}