export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className='size-full min-h-screen'>{children}</main>
}
