import { redirect } from 'next/navigation'

export default function VCRedirect() {
  redirect('/about#career')
}
