import assertNever from "assert-never";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { councilConfigs } from "src/config/council.config";
import { Page } from "src/ui/base/Page";
import { useChainId } from "src/ui/network/useChainId";
import { useVaultConfig } from "src/ui/vaults/hooks/useVaultConfig";
import { LockingVaultDetails } from "src/ui/vaults/LockingVaultDetails";
import { VestingVaultDetails } from "src/ui/vaults/VestingVaultDetails";

export default function Vault(): ReactElement {
  const {
    query: { address },
  } = useRouter();

  const chainId = useChainId();
  const vaultConfig = useVaultConfig(
    address as string | undefined,
    councilConfigs[chainId].coreVoting,
  );

  if (!address || !vaultConfig?.type) {
    return <Page>could not find vault by address</Page>;
  }

  return (
    <div>
      {(() => {
        switch (vaultConfig?.type) {
          case "LockingVault":
            return <LockingVaultDetails address={address as string} />;

          case "VestingVault":
            return <VestingVaultDetails address={address as string} />;

          case "GSCVault":
            return <></>;

          case undefined:
            return <></>;

          default:
            assertNever(vaultConfig?.type);
        }
      })()}
    </div>
  );
}
