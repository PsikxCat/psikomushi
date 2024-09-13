import { AspectRatio } from '@/components/ui/aspect-ratio'

interface ProductCardProps {
  imageUrl: string
  name: string
  description: string
}
export default function ProductCard({ imageUrl, name, description }: ProductCardProps) {
  return (
    <section className="m-4 min-w-[250px] overflow-hidden rounded shadow-lg">
      <AspectRatio ratio={16 / 9}>
        <img src={imageUrl} alt="random" className="h-full w-full rounded-md object-cover" />
      </AspectRatio>
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{name}</div>
        <p className="text-base">{description}</p>
      </div>
    </section>
  )
}
