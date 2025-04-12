import { useContext } from 'react'

import { GlobalContext } from '@/context/GlobalContext'
import { NullData } from '@/components'

export default function ProductsPage() {
  const { session } = useContext(GlobalContext)
  console.log('session', session)

  const isUserAdmin = session?.user?.user_metadata?.role === 'admin'

  if (!isUserAdmin) {
    return <NullData title="No tienes permisos para ver esta página" />
  }

  return <div>Cualquier cosa</div>
}
