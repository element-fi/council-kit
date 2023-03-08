/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "IVotingVault",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IVotingVault__factory>;
    getContractFactory(
      name: "Authorizable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Authorizable__factory>;
    getContractFactory(
      name: "AbstractScoreVault",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AbstractScoreVault__factory>;
    getContractFactory(
      name: "ScoreVault",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ScoreVault__factory>;

    getContractAt(
      name: "IVotingVault",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IVotingVault>;
    getContractAt(
      name: "Authorizable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Authorizable>;
    getContractAt(
      name: "AbstractScoreVault",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AbstractScoreVault>;
    getContractAt(
      name: "ScoreVault",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ScoreVault>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
