export interface UserType {
  id: number
  name: string
  email: string
  role: 'admin' | 'vendor' | 'user'
}
