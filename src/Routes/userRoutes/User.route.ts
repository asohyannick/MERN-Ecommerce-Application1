import express from 'express';
import schemaValidator from '../../Middleware/ShemasValidator/SchemasValidators';
import signUp from '../../Controllers/UserController/User.Controller';
const router = express.Router();
router.post("/auth/signup", schemaValidator("/auth/signup"), signUp);
export default router;
