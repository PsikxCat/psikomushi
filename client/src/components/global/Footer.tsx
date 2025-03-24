export default function Footer() {
  return (
    <div className="flex_center w-full p-2">
      <p className="text-sm text-earth-lightText opacity-40">
        <span className="inline-block rotate-180">&nbsp;&copy;</span>
        {new Date().getFullYear()} Psikocat. Ningún derecho reservado.
      </p>
    </div>
  )
}
