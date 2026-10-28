export const keys = {
  team: {
    all: () => ['team'] as const,
    members: () => ['team', 'members'] as const,
  },
  directory: {
    search: (query: string) => ['directory', 'search', query] as const,
  },
}
