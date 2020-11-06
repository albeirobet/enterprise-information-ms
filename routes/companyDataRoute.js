// Created By Eyder Ascuntar Rosales
// Mail: eyder.ascuntar@runcode.co
// Company: Runcode Ingeniería SAS
const express = require('express');
const companyDataController = require('../controllers/companyDataController');
const authController = require('../controllers/common/authController');

const router = express.Router();

router.post(
  '/create',
  authController.protectPath,
  authController.protectPathWithRoles('admin'),
  companyDataController.createCompany
);
router.patch(
  '/update',
  authController.protectPath,
  authController.protectPathWithRoles('admin'),
  companyDataController.updateCompanyData
);
router.delete(
  '/deleteCompany/:id',
  authController.protectPath,
  authController.protectPathWithRoles('admin'),
  companyDataController.deleteCompany
);
router.get(
  '/getCompany/:id',
  authController.protectPath,
  authController.protectPathWithRoles('admin'),
  companyDataController.getCopany
);
router.get(
  '/getAllCompanies',
  authController.protectPath,
  authController.protectPathWithRoles('admin'),
  companyDataController.getAllCompanies
);

module.exports = router;
