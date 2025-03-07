import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

import { Button } from '@/components/ui/button'

interface BackButtonProps {
  label: string
  href?: string
  variant?: 'link' | 'destructive'
}

export default function BackButton({ label, href, variant = 'link' }: BackButtonProps) {
  const navigate = useNavigate()

  const goBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <Button
      variant={variant}
      size={'sm'}
      className={`${variant === 'link' ? 'w-full font-normal' : 'w-auto font-semibold'}`}
      onClick={!href ? goBack : undefined}
    >
      {href ? (
        <Link to={href}>{label}</Link>
      ) : (
        <div>
          <FaArrowLeft className="block md:hidden" />
          <span className="hidden md:block">{label}</span>
        </div>
      )}
    </Button>
  )
}
