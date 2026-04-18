import express from 'express';
const router = express.Router();
import { createCompany,getCompanies,getCompanyById } from '../controllers/companyController.js';

// POST: http://localhost:5000/api/companies (To add a company)
router.post('/', createCompany);

// GET: http://localhost:5000/api/companies (To list all companies)
router.get('/', getCompanies);

router.get('/:companyId',getCompanyById);

export default router;