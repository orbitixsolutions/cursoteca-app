export default function SiteHomePage({
  params,
}: {
  params: { domain: string }
}) {
  const domain = decodeURIComponent(params.domain)

  return (
    <div>
      <h2>{domain}</h2>
    </div>
  )
}
