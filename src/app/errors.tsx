import { Link, useRouter } from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react'
import { AlertCircleIcon } from '@hugeicons/core-free-icons'
import { Button } from '@dkrasniy/ui/components/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@dkrasniy/ui/components/empty'
import { cn } from '@dkrasniy/ui/lib/utils'
import { ApiError, NetworkError } from '@/api/errors'

export interface ErrorCopy {
  title: string
  detail: string
  action: 'retry' | 'reload' | null
}

type ErrorContext = string | { action: string }

export function describeError(error: unknown, context?: ErrorContext): ErrorCopy {
  const failed =
    context === undefined
      ? undefined
      : typeof context === 'string'
        ? `Couldn't load ${context}`
        : `Couldn't ${context.action}`

  if (error instanceof NetworkError) {
    return {
      title: failed ?? "Can't connect",
      detail: 'Check your internet connection, then try again.',
      action: 'retry',
    }
  }

  if (error instanceof ApiError) {
    switch (error.status) {
      case 401:
        return {
          title: "You've been signed out",
          detail: 'Reload the page to sign in again.',
          action: 'reload',
        }
      case 403:
        return {
          title: "You don't have access to this",
          detail: "Your account doesn't have permission to open it.",
          action: null,
        }
      case 404:
        return {
          title: failed ?? "Couldn't find this",
          detail: 'It may have been moved or deleted.',
          action: null,
        }
      case 409:
      case 422:
        if (error.detail) {
          return { title: sentence(error.detail), detail: '', action: null }
        }
    }
  }

  const server = error instanceof ApiError && error.status >= 500
  return {
    title: failed ?? (server ? 'The server ran into a problem' : "Couldn't finish that"),
    detail:
      failed && server
        ? 'The server ran into a problem. Try again in a moment.'
        : 'Try again in a moment.',
    action: 'retry',
  }
}

function sentence(text: string): string {
  return /[.!?]$/.test(text) ? text : `${text}.`
}

export function ErrorState({
  error,
  subject,
  onRetry,
  icon = AlertCircleIcon,
  className,
}: {
  error: unknown
  subject: string
  onRetry: () => void
  icon?: IconSvgElement
  className?: string
}) {
  const { title, detail, action } = describeError(error, subject)
  return (
    <Empty role="alert" className={className}>
      <EmptyHeader>
        <EmptyMedia>
          <HugeiconsIcon icon={icon} strokeWidth={1.5} />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        {detail ? <EmptyDescription>{detail}</EmptyDescription> : null}
      </EmptyHeader>
      {action ? (
        <EmptyContent>
          <Button
            variant="link"
            size="sm"
            onClick={action === 'retry' ? onRetry : () => window.location.reload()}
          >
            {action === 'retry' ? 'Try again' : 'Reload page'}
          </Button>
        </EmptyContent>
      ) : null}
    </Empty>
  )
}

export function SectionError({
  error,
  subject,
  onRetry,
  className,
}: {
  error: unknown
  subject: string
  onRetry: () => void
  className?: string
}) {
  const { title, detail, action } = describeError(error, subject)
  return (
    <div
      role="alert"
      className={cn('flex items-center justify-between gap-4 text-sm', className)}
    >
      <span className="text-muted-foreground min-w-0">
        <b className="text-foreground block font-medium">{title}</b>
        {detail}
      </span>
      {action === 'retry' && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
      {action === 'reload' && (
        <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
          Reload page
        </Button>
      )}
    </div>
  )
}

export function ErrorScreen({
  error,
  subject,
}: ErrorComponentProps & { subject?: string }) {
  const router = useRouter()
  const { title, detail, action } = describeError(error, subject)

  return (
    <Message title={title} detail={detail} role="alert">
      {action === 'retry' && (
        <Button variant="primary" size="sm" onClick={() => void router.invalidate()}>
          Try again
        </Button>
      )}
      {action === 'reload' && (
        <Button variant="primary" size="sm" onClick={() => window.location.reload()}>
          Reload page
        </Button>
      )}
    </Message>
  )
}

export function NotFoundScreen() {
  return (
    <Message
      title="Couldn't find this page"
      detail="Check the address, or go back home."
    />
  )
}

function Message({
  title,
  detail,
  role,
  children,
}: {
  title: string
  detail: string
  role?: 'alert'
  children?: ReactNode
}) {
  return (
    <div role={role} className="flex h-full items-center justify-center p-8">
      <div className="max-w-sm space-y-2 text-center">
        <h1 className="text-base font-medium">{title}</h1>
        {detail && <p className="text-muted-foreground text-sm">{detail}</p>}
        <div className="flex items-center justify-center gap-3 pt-2">
          {children}
          <Link to="/" className="text-brand text-sm">
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}
