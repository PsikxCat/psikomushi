enum Role {
  ADMIN = 'admin',
  SELLER = 'seller',
  DELIVERY = 'delivery',
  CUSTOMER = 'customer',
}

export interface UserType {
  id: number
  name: string
  email: string
  role: Role
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
  id: string
  image_urls: string[]
  ref: string
  name: string
  short_description: string
  long_description: string
  unit_price: number
  weight: string
  stock: number
}

export interface CartItemType {
  cartItem: ProductType
  quantity: number
}
