import { CouncilContext } from "src/context";
import { LockingVaultContractDataSource } from "src/datasources/VotingVault/LockingVaultContractDataSource";
import { Token } from "src/models/Token";
import { Voter } from "src/models/Voter";
import { VotingVault, VotingVaultOptions } from "./VotingVault";

interface LockingVaultOptions extends VotingVaultOptions {
  dataSource?: LockingVaultContractDataSource;
}

export class LockingVault extends VotingVault {
  dataSource: LockingVaultContractDataSource;

  constructor(
    address: string,
    context: CouncilContext,
    options?: LockingVaultOptions,
  ) {
    const { name = "Locking Vault", ...passThroughOptions } = options || {};
    super(address, context, {
      ...passThroughOptions,
      name,
    });
    this.dataSource =
      options?.dataSource ||
      context.registerDataSource(
        { address },
        new LockingVaultContractDataSource(address, context.provider),
      );
  }

  async getToken(): Promise<Token> {
    const address = await this.dataSource.getToken();
    return new Token(address, this.context);
  }

  getDepositedBalance(address: string): Promise<string> {
    return this.dataSource.getDepositedBalance(address);
  }

  async getVoters(fromBlock?: number, toBlock?: number): Promise<Voter[]> {
    const votersWithPower = await this.dataSource.getAllVotersWithPower(
      fromBlock,
      toBlock,
    );
    return votersWithPower.map(
      ({ address }) => new Voter(address, this.context),
    );
  }

  getStaleBlockLag(): Promise<number> {
    return this.dataSource.getStaleBlockLag();
  }

  async getHistoricalVotingPower(
    address: string,
    atBlock?: number,
  ): Promise<string> {
    return this.dataSource.getHistoricalVotingPower(
      address,
      atBlock ?? (await this.context.provider.getBlockNumber()),
    );
  }

  async getDelegate(address: string): Promise<Voter> {
    const delegateAddress = await this.dataSource.getDelegate(address);
    return new Voter(delegateAddress, this.context);
  }

  async getDelegatorsTo(address: string, atBlock?: number): Promise<Voter[]> {
    const delegators = await this.dataSource.getDelegatorsTo(address, atBlock);
    return delegators.map(({ address }) => new Voter(address, this.context));
  }
}
