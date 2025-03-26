export interface UserType {
  id: number
  name: string
  email: string
  role: 'admin' | 'vendor' | 'user'
}

export interface EmployeeType {
  id_employee: number
  name: string
  surname: string
  role: string
  phone_number: string
  email: string
  hire_date: string
}

export interface ProductType {
  id: number
  imageUrl: string
  name: string
  description: string
}
