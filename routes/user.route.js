import {Router} from 'express';
import { register } from '../controller/user.controller.js';

const userRoute = Router();

userRoute.post('/register',register)

export default userRoute;
