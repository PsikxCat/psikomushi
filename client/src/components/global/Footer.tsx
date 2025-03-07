export default function Footer() {
  return (
    <div className="flex_center w-full p-2">
      <p>
        <span className="inline-block rotate-180">&nbsp;&copy;</span>
        {new Date().getFullYear()} Psikocat. Ningún derecho reservado.
      </p>
    </div>
  )
}
