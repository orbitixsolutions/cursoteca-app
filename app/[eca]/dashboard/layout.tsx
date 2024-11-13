import { SidebarWrapper } from '@/components/shared/dashboard/sidebar-wrapper'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SidebarWrapper>{children}</SidebarWrapper>
}
