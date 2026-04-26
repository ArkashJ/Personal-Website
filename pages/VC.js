import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function VCRedirect() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/experience')
  }, [router])
  return null
}
