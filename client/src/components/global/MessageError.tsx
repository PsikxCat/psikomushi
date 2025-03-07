import { BiError } from 'react-icons/bi'

interface MessageErrorProps {
  message?: string
}

export default function MessageError({ message }: MessageErrorProps) {
  if (!message) return null

  return (
    <div>
      <div className="mt-4 flex items-center gap-x-2 rounded-md bg-red-500/15 p-3 text-[11px] text-destructive">
        <BiError className="h-4 w-4" />
        <span>{message}</span>
      </div>
    </div>
  )
}
