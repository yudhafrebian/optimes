import { UserRowData } from "@/interface/row-table.interface";

export type AccountFilters = {
  searchQuery: string;
  roleFilter: string;
  lifecycleFilter: string;
  typeFilter: string;
};

export const filterAccounts = (rows: UserRowData[], filters: AccountFilters) => {
  const { searchQuery, roleFilter, lifecycleFilter, typeFilter } = filters;

  return rows.filter((row) => {
    const matchesSearch = row.username
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "All" || row.role === roleFilter;
    const matchesLifecycle =
      lifecycleFilter === "All" || row.lifecycle === lifecycleFilter;
    const matchesType = typeFilter === "All" || row.account_type === typeFilter;

    return matchesSearch && matchesRole && matchesLifecycle && matchesType;
  });
};
