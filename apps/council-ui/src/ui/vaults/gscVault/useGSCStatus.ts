import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { parseEther } from "ethers/lib/utils";
import { useCouncil } from "src/ui/council/useCouncil";
import { GSCStatus } from "src/vaults/gscVault";

export function useGSCStatus(
  address: string | undefined,
): UseQueryResult<GSCStatus> {
  const { gscVoting, coreVoting } = useCouncil();
  return useQuery({
    queryKey: ["gsc-status", address],
    enabled: !!address,
    queryFn: async (): Promise<GSCStatus> => {
      // safe to cast because enabled is set
      address = address as string;

      if (!gscVoting) {
        return "N/A";
      }

      if (await gscVoting.getIsIdle(address)) {
        return "Idle";
      }

      if (await gscVoting.getIsMember(address)) {
        return "Member";
      }

      const votingPower = await coreVoting.getVotingPower(address);
      const requiredVotingPower = await gscVoting.getRequiredVotingPower();

      if (parseEther(votingPower).gt(parseEther(requiredVotingPower))) {
        return "Eligible";
      }

      return "Ineligible";
    },
  });
}