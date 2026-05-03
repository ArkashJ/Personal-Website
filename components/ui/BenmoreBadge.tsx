type Props = {
  size?: number
  className?: string
}

const BenmoreBadge = ({ size = 18, className }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width={size}
    height={size}
    aria-label="Benmore Technologies"
    className={className}
  >
    <rect x="1" y="1" width="30" height="30" rx="14" fill="#1d4ed8" />
    <path
      d="M11 9 h6.2 c2.2 0 3.6 1.2 3.6 3 0 1.3-.8 2.3-2 2.7 v.1 c1.5.3 2.5 1.4 2.5 3 0 2-1.6 3.2-4 3.2 H11 z m1.8 4.8 h4 c1.2 0 1.9-.5 1.9-1.5 0-.9-.7-1.4-1.9-1.4 h-4 z m0 4.8 h4.2 c1.4 0 2.2-.6 2.2-1.7 0-1-.8-1.6-2.2-1.6 h-4.2 z"
      fill="#f8fafc"
    />
  </svg>
)

export default BenmoreBadge
