import { EmployeeType } from '@/types'

export async function getEmployees(): Promise<EmployeeType[]> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/db/employees`)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error desconocido al cargar empleados')
    }

    const result = await response.json()

    if (!result.success) {
      throw new Error(result.message || 'Error al cargar empleados')
    }

    return result.data
  } catch (error) {
    console.error('Error en el servidor:', error)
    throw error
  }
}
