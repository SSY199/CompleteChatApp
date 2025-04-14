import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { getContacts } from '../controllers/contacts.controller.js';

const contactsRoutes = Router();

contactsRoutes.post('/getContacts', verifyToken, getContacts);

export default contactsRoutes;