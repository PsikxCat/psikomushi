interface NullDataProps {
  title: string
}
export default function NullData({ title }: NullDataProps) {
  return (
    <section className="flex_center h-[50vh] w-full text-xl md:text-2xl">
      <p className="font-medium text-earth-darkBrown">{title}</p>
    </section>
  )
}
