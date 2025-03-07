import { BackButton } from '@/components'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'

interface CardWrapperProps {
  children: React.ReactNode
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
}
export default function CardWrapper({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
}: CardWrapperProps) {
  return (
    <Card className="w-[400px] shadow-md shadow-primary">
      <CardHeader>{headerLabel}</CardHeader>

      <CardContent>{children}</CardContent>

      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  )
}
