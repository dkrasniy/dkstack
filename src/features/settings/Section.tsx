import { useId, type ReactNode } from 'react'
import { Tray, TrayHeader, TrayRow, TrayTitle } from '@dkrasniy/ui/components/tray'

export function Section({ title, children }: { title: string; children: ReactNode }) {
  const id = useId()
  return (
    <Tray aria-labelledby={id}>
      <TrayHeader>
        <TrayTitle id={id}>{title}</TrayTitle>
      </TrayHeader>
      {children}
    </Tray>
  )
}

export function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <TrayRow className="justify-start">
      <dt className="text-muted-foreground w-40 shrink-0 font-normal">{label}</dt>
      <dd className="flex min-w-0 flex-1 items-center justify-between gap-2">
        {children}
      </dd>
    </TrayRow>
  )
}
