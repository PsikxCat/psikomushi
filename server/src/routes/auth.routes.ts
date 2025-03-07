import { Router } from 'express'

import { getUser, loginController, registerController } from '@/controllers/auth.controllers'

const router = Router()

router.get('/users', getUser)
router.post('/login', loginController)
router.post('/register', registerController)

export default router
