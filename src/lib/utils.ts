// Utility functions for the app
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString()
}

export function formatDateTime(date: string): string {
  return new Date(date).toLocaleString()
}

export function getSeverityColor(severity: string): string {
  switch (severity.toLowerCase()) {
    case 'critical':
      return 'text-red-500'
    case 'high':
      return 'text-orange-500'
    case 'medium':
      return 'text-yellow-500'
    case 'low':
      return 'text-green-500'
    default:
      return 'text-gray-500'
  }
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'active':
    case 'open':
    case 'new':
      return 'text-green-500'
    case 'investigating':
    case 'in_progress':
      return 'text-yellow-500'
    case 'closed':
    case 'resolved':
      return 'text-gray-500'
    case 'critical':
      return 'text-red-500'
    default:
      return 'text-gray-500'
  }
}
