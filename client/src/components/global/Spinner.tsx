import './spinner.css'

interface SpinnerProps {
  visible: boolean
}

export default function Spinner({ visible }: SpinnerProps) {
  if (!visible) return null

  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  )
}
