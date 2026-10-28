import { useState } from 'react'
import { PageHeader, PageTitle } from '@dkrasniy/ui/components/page-header'
import { ArchiveProject } from './ArchiveProject'
import { GeneralSection } from './GeneralSection'
import { PROJECT } from './project'
import { PublishingSection } from './PublishingSection'

export function Settings() {
  const [project, setProject] = useState(PROJECT)

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 md:px-10">
      <PageHeader>
        <PageTitle>Settings</PageTitle>
      </PageHeader>
      <div className="flex flex-col gap-8">
        <GeneralSection
          project={project}
          onRenamed={(name) =>
            setProject((current) => ({ ...current, name, changes: current.changes + 1 }))
          }
        />
        <PublishingSection
          project={project}
          onPublished={() =>
            setProject((current) => ({ ...current, publishedAt: Date.now(), changes: 0 }))
          }
        />
        <ArchiveProject project={project} />
      </div>
    </div>
  )
}
