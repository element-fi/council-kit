import {
  CachedReadContract,
  CachedReadContractOptions,
  CachedReadWriteContract,
} from "@council/evm-client";
import { Abi } from "abitype";

export interface CachedContractFactoryOptions<TAbi extends Abi = Abi>
  extends Omit<CachedReadContractOptions, "contract"> {
  abi: TAbi;
  address: `0x${string}`;
}

export type CachedReadContractFactory = <TAbi extends Abi = Abi>(
  options: CachedContractFactoryOptions<TAbi>,
) => CachedReadContract<TAbi>;

export type CachedReadWriteContractFactory = <TAbi extends Abi = Abi>(
  options: CachedContractFactoryOptions<TAbi>,
) => CachedReadWriteContract<TAbi>;
