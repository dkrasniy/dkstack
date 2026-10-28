import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@dkrasniy/ui/components/toast'
import { keys } from '@/api/keys'
import {
  type DirectoryEntry,
  type Member,
  type Role,
  addMembers,
  removeMember,
  setRole,
} from '@/api/team'
import { describeError } from '@/app/errors'
import { plural } from './members'

export function useSetRole() {
  const queryClient = useQueryClient()
  const toast = useToast()
  const membersKey = keys.team.members()

  const patch = (id: string, role: Role) =>
    queryClient.setQueryData<Member[]>(membersKey, (members) =>
      members?.map((each) => (each.id === id ? { ...each, role } : each)),
    )

  return useMutation({
    mutationFn: ({ member, role }: { member: Member; role: Role }) =>
      setRole(member.id, role),
    onMutate: async ({ member, role }) => {
      await queryClient.cancelQueries({ queryKey: membersKey })
      patch(member.id, role)
      return { previous: member.role }
    },
    onError: (error, { member }, context) => {
      if (context) patch(member.id, context.previous)
      toast.add({ type: 'error', title: describeError(error).title })
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: membersKey }),
  })
}

export function useRemoveMember() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (member: Member) => removeMember(member.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.team.members() }),
  })
}

export function useAddMembers() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ entries, role }: { entries: DirectoryEntry[]; role: Role }) =>
      addMembers(
        entries.map((each) => each.id),
        role,
      ),
    onSettled: () => queryClient.invalidateQueries({ queryKey: keys.team.members() }),
  })
}

export const addedTitle = (added: readonly Member[]) =>
  plural(added.length, {
    one: `Added ${added[0]?.name ?? 'member'}`,
    other: 'Added # members',
  })
