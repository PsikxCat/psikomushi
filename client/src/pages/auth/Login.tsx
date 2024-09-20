// // src/pages/Login.tsx
// import React, { useState } from 'react'
// import { useAuth } from '@/context/AuthContext'
// import { useNavigate } from 'react-router-dom'

// const Login: React.FC = () => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const { login } = useAuth()
//   const navigate = useNavigate()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     await login(email, password)
//     navigate('/')
//   }

//   return (
//     <div className="p-4">
//       <h1 className="mb-4 text-2xl font-bold">Iniciar Sesión</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//             Correo Electrónico
//           </label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//           />
//         </div>
//         <div>
//           <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//             Contraseña
//           </label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//           />
//         </div>
//         <div>
//           <button
//             type="submit"
//             className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//           >
//             Iniciar Sesión
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default Login
