import { redirect } from 'next/navigation'

export default function WorkRedirect() {
  redirect('/about#tools')
}
