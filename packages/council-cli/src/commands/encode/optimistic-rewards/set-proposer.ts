import { OptimisticRewards__factory } from "@council/typechain";
import { Interface } from "ethers/lib/utils";
import signale from "signale";
import { requiredString } from "src/options/utils/requiredString";
import { createCommandModule } from "src/utils/createCommandModule";

export const { command, aliases, describe, builder, handler } =
  createCommandModule({
    command: "set-proposer [OPTIONS]",
    aliases: ["setProposer"],
    describe: "Encode call data for OptimisticRewards.setProposer",

    builder: (yargs) => {
      return yargs.options({
        a: {
          alias: ["address", "proposer"],
          describe: "The address of the new proposer",
          type: "string",
        },
      });
    },

    handler: async (args) => {
      const address = await requiredString(args.address, {
        name: "address",
        message: "Enter proposer address",
      });

      signale.success(encodeSetProposer(address));
    },
  });

export function encodeSetProposer(proposerAddress: string): string {
  const optimisticRewardsInterface = new Interface(
    OptimisticRewards__factory.abi,
  );
  return optimisticRewardsInterface.encodeFunctionData("setProposer", [
    proposerAddress,
  ]);
}
