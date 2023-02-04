import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { ReactElement, useMemo, useState } from "react";
import { makeVoterURL } from "src/routes";
import { formatBalance } from "src/ui/base/formatting/formatBalance";
import {
  SortableGridTable,
  SortOptions,
} from "src/ui/base/tables/SortableGridTable";
import { useDelegatesByVault } from "src/ui/vaults/hooks/useDelegatesByVault";
import { VoterRowData } from "src/ui/voters/types";
import { VoterAddress } from "src/ui/voters/VoterAddress";

type SortField = "numberOfDelegators" | "votingPower";

interface VoterListProps {
  voters: VoterRowData[];
  size: number;
  onSizeChange: (newSize: number) => void;
}

export function VoterList({
  voters,
  size,
  onSizeChange,
}: VoterListProps): ReactElement {
  const [sortOptions, setSortOptions] = useState<SortOptions<SortField>>({});

  const { data: delegatesByVault = {} } = useDelegatesByVault();
  // Memoized to prevent invalidating sortedVoters on every render.
  const delegateAddresses = useMemo(
    () => Object.values(delegatesByVault).map(({ address }) => address),
    [delegatesByVault],
  );

  const sortedVoters = useMemo(() => {
    let sorted = voters;
    const { key, direction } = sortOptions;

    if (direction) {
      switch (key) {
        case "numberOfDelegators":
          sorted = voters
            .slice()
            .sort((a, b) => a.numberOfDelegators - b.numberOfDelegators);
          break;

        case "votingPower":
        default:
          sorted = voters
            .slice()
            .sort((a, b) => +a.votingPower - +b.votingPower);
          break;
      }

      if (direction === "DESC") {
        sorted.reverse();
      }
    }

    return [
      ...sorted.filter(({ address }) => delegateAddresses.includes(address)),
      ...sorted.filter(({ address }) => !delegateAddresses.includes(address)),
    ];
  }, [sortOptions, voters, delegateAddresses]);

  return (
    <div className="min-w-[250px]">
      <SortableGridTable
        headingRowClassName="grid-cols-[1.5fr_1fr_1fr_56px]"
        bodyRowClassName="group grid-cols-[1.5fr_1fr_1fr_56px]"
        onSort={setSortOptions}
        cols={[
          "Voter",
          {
            cell: "# of Delegators",
            sortKey: "numberOfDelegators",
          },
          {
            cell: "Voting Power",
            sortKey: "votingPower",
          },
          "", // extra column for the chevron
        ]}
        rows={sortedVoters
          .slice(0, size)
          .map(
            ({
              address,
              ensName,
              votingPower,
              numberOfDelegators,
              isGSCMember,
            }) => {
              const isDelegate = delegateAddresses.includes(address);
              return {
                href: makeVoterURL(address),
                cells: [
                  <span key={address} className="flex items-center">
                    <VoterAddress
                      address={address}
                      ensName={ensName}
                      isGSCMember={isGSCMember}
                      isDelegate={isDelegate}
                    />
                  </span>,
                  numberOfDelegators,
                  formatBalance(votingPower, 0),
                  <span key={`${address}-chevron`}>
                    <ChevronRightIcon className="w-6 h-6 transition-all stroke-current opacity-40 group-hover:opacity-100" />
                  </span>,
                ],
              };
            },
          )}
      />

      {voters.length > size && (
        <div className="flex flex-col justify-center gap-4 py-8 text-center">
          <div className="font-medium">
            Only showings {size} voters, click to load more or refine using
            search.
          </div>
          <button
            className="daisy-btn daisy-btn-primary"
            onClick={() => onSizeChange(size + 50)}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
