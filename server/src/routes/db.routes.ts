import { Router } from 'express'

import { getEmployees } from '@/controllers/db.controllers'

const router = Router()

router.get('/employees', getEmployees)

export default router
