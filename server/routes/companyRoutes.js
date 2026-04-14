const express = require('express');
const router = express.Router();
const { createCompany, getCompanies } = require('../controllers/companyController');

// POST: http://localhost:5000/api/companies (To add a company)
router.post('/', createCompany);

// GET: http://localhost:5000/api/companies (To list all companies)
router.get('/', getCompanies);

module.exports = router;