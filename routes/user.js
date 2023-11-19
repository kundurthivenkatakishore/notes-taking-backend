import express from "express"
import { login, signup, verifToken } from "../controllers/user.js";

const router = express.Router()

router.post('/signup', signup);
router.post('/login', login);
router.get('/verify', verifToken)

export default router;