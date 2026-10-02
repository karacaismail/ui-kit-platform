/** Facet filter state, kept in the address so a filtered view can be shared. An empty value means "all". */
export type FilterState = Record<string, string>;

export function readFilterState(search: string, keys: readonly string[]): FilterState {
  const params = new URLSearchParams(search);
  return Object.fromEntries(keys.map(key => [key, params.get(key) ?? '']));
}

export function writeFilterState(search: string, state: FilterState): string {
  const params = new URLSearchParams(search);
  for (const [key, value] of Object.entries(state)) {
    if (value) params.set(key, value);
    else params.delete(key);
  }
  const query = params.toString();
  return query ? `?${query}` : '';
}

export function matchesFilter(item: Record<string, string | undefined>, state: FilterState): boolean {
  return Object.entries(state).every(([key, value]) => !value || item[key] === value);
}
