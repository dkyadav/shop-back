import {Router} from 'express';
import { get_user, register } from '../controller/user.controller.js';
import { signin, verify_jwt } from '../controller/auth.controller.js';

const userRoute = Router();

userRoute.post('/register',register);
userRoute.post('/signin',signin);
//userRoute.post("/profile", verify_jwt, get_user);
userRoute.get("/profile", verify_jwt, get_user);

export default userRoute;
