import goerli from "src/deployments/goerli.deployments.json";
import { DeploymentInfo } from "src/deployments/types";

export const goerliDeployments = goerli.deployments;
export const latestGoerliDeployment =
  goerliDeployments[goerliDeployments.length - 1];

/**
 * Finds the deployment that the given contract is in.
 */
export function getDeploymentForContract(
  contractAddress: string,
  deployments: DeploymentInfo[],
): DeploymentInfo | undefined {
  const deployment = deployments.find((deployment) =>
    deployment.contracts.find(({ address }) => address === contractAddress),
  );

  return deployment;
}