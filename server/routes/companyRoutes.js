import express from 'express';
const router = express.Router();
import { createCompany,getCompanies,getCompanyById } from '../controllers/companyController.js';


router.post('/', createCompany);


router.get('/', getCompanies);

router.get('/:companyId',getCompanyById);

export default router;