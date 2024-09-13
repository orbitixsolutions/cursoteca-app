export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8'>
      {children}
    </div>
  )
}
