import { BiSolidCheckCircle } from 'react-icons/bi'
interface MessageSuccessProps {
  message?: string
}

export default function MessageSuccess({ message }: MessageSuccessProps) {
  if (!message) return null

  return (
    <div>
      <div className="mt-4 flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-[11px] text-emerald-500">
        <BiSolidCheckCircle className="h-4 w-4" />
        <span>{message}</span>
      </div>
    </div>
  )
}
