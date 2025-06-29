'use client';

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';

import { createContext, ReactNode, useContext } from 'react';

export interface Cluster {
  endpoint: string;
  network?: ClusterNetwork;
}
export enum ClusterNetwork {
  Mainnet = 'mainnet-beta',
  Testnet = 'testnet',
  Devnet = 'devnet',
  Custom = 'custom',
}

export function toWalletAdapterNetwork(
  cluster?: ClusterNetwork
): WalletAdapterNetwork | undefined {
  switch (cluster) {
    case ClusterNetwork.Mainnet:
      return WalletAdapterNetwork.Mainnet;
    case ClusterNetwork.Testnet:
      return WalletAdapterNetwork.Testnet;
    case ClusterNetwork.Devnet:
      return WalletAdapterNetwork.Devnet;
    default:
      return undefined;
  }
}

export interface ClusterProviderContext {
  cluster: Cluster;
}

const Context = createContext<ClusterProviderContext>(
  {} as ClusterProviderContext
);

export function ClusterProvider({ children }: { children: ReactNode }) {
  const value: ClusterProviderContext = {
    cluster: { endpoint: clusterApiUrl('devnet') },
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useCluster() {
  return useContext(Context);
}