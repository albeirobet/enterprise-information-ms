// Created By Eyder Ascuntar Rosales
// Mail: eyder.ascuntar@runcode.co
// Company: Runcode Ingeniería SAS
const mongoose = require('mongoose');
const ApiError = require('../dto/commons/response/apiErrorDTO');
const ServiceException = require('../utils/errors/serviceException');
const commonErrors = require('../utils/constants/commonErrors');
const companyDataMessages = require('../utils/constants/companyDataMessages');
const CompanyData = require('../models/companyDataModel');
const httpCodes = require('../utils/constants/httpCodes');
const APIFeatures = require('../utils/responses/apiFeatures');
const customValidator = require('../utils/validators/validator');
const CommonLst = require('../dto/commons/commonLstDTO');

// =========== Function to filter specific properties to udpate
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// =========== Function to create a Company
exports.createCompany = async (req, res) => {
  try {
    // Validate request
    customValidator.validateNotNullRequest(req);
    const company = await CompanyData.create(req.body);
    return company;
  } catch (error) {
    throw error;
  }
};

// =========== Function to update a Company
exports.updateCompanyData = async (req, res) => {
  // Validate request
  customValidator.validateNotNullRequest(req);
  // 1) Filtered fields names that are allowed to be updated
  const filteredBody = filterObj(
    req.body,
    'identificationType',
    'identificationNumber',
    'name',
    'principalAddress',
    'secondaryAddress',
    'email',
    'phoneNumber',
    'nameContactPerson',
    'logoUrl'
  );

  // 2) Update company document
  const updatedCompany = await CompanyData.findByIdAndUpdate(
    req.body._id,
    filteredBody,
    {
      new: true,
      runValidators: true
    }
  );
  return updatedCompany;
};

// =========== Function to delete a Specific Company
exports.deleteCompany = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    throw new ServiceException(
      commonErrors.E_COMMON_01,
      new ApiError(
        `${commonErrors.EM_COMMON_10}`,
        `${commonErrors.EM_COMMON_10}`,
        'EM_COMMON_10',
        httpCodes.BAD_REQUEST
      )
    );
  }
  await CompanyData.findByIdAndDelete(req.params.id);
  return true;
};

// =========== Function to get a specific Company
exports.getCopany = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    throw new ServiceException(
      commonErrors.E_COMMON_01,
      new ApiError(
        `${commonErrors.EM_COMMON_10}`,
        `${commonErrors.EM_COMMON_10}`,
        'EM_COMMON_10',
        httpCodes.BAD_REQUEST
      )
    );
  }
  const company = await CompanyData.findById(req.params.id);
  // CompanyData.findOne({ _id: req.params.id })
  if (!company) {
    throw new ServiceException(
      commonErrors.E_COMMON_01,
      new ApiError(
        `${companyDataMessages.E_ENTERPRISE_INFORMATION_MS_02}`,
        `${companyDataMessages.E_ENTERPRISE_INFORMATION_MS_02}`,
        'E_ENTERPRISE_INFORMATION_MS_02',
        httpCodes.BAD_REQUEST
      )
    );
  }
  return company;
};

// =========== Function to get all Companies with filters to the table
exports.getAllCompanies = async (req, res) => {
  const features = new APIFeatures(CompanyData.find(), req.query)
    .filterTable()
    .sort()
    .limitFields()
    .paginate();
  const total = await CompanyData.countDocuments();
  const companies = await features.query;
  const companiesList = new CommonLst(total, companies);
  return companiesList;
};
