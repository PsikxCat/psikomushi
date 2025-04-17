enum Role {
  ADMIN = 'admin',
  SELLER = 'seller',
  DELIVERY = 'delivery',
  CUSTOMER = 'customer',
}

export interface UserType {
  id: string
  role: Role
  name: string
  last_name: string
  email: string
  phone_number: string
  address: string
}

export interface CustomerType extends UserType {
  registered_date?: Date | null
  // last_purchase_date?: Date | null
  // total_purchases?: number
  // demas campos...
}

export interface EmployeeType extends UserType {
  hired_date?: Date | null
  // salary: number
  // demas campos...
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
