import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function VolunteeringRedirect() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/about')
  }, [router])
  return null
}
