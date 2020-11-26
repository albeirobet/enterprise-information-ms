// Created By Eyder Ascuntar Rosales
// Mail: eyder.ascuntar@runcode.co
// Company: Runcode Ingeniería SAS
const mongoose = require('mongoose');
const validator = require('validator');

const companyDataSchema = new mongoose.Schema({
  identificationType: {
    type: String,
    required: true,
    enum: ['NIT', 'CEDULA', 'CEDULA EXTRANJERIA'],
    default: 'Nit'
  },
  identificationNumber: {
    type: Number,
    unique: true,
    required: [
      true,
      'Por favor ingrese el número de identificación de la empresa, es un dato obligatorio. '
    ]
  },
  name: {
    type: String,
    uppercase: true,
    required: [
      true,
      'Por favor ingrese el nombre de la empresa, es un dato obligatorio. '
    ]
  },
  principalAddress: {
    type: String,
    uppercase: true,
    required: [
      true,
      'Por favor ingrese la dirección de la empresa, es un dato obligatorio. '
    ]
  },
  secondaryAddress: {
    type: String,
    uppercase: true,
    required: false
  },
  email: {
    type: String,
    required: [
      true,
      'Por favor ingrese el correo electrónico de la empresa, es un dato obligatorio. '
    ],
    unique: true,
    lowercase: true,
    validate: [
      validator.isEmail,
      'Por favor ingrese su correo electrónico valido. '
    ]
  },
  phoneNumber: {
    type: String,
    uppercase: true,
    required: [
      true,
      'Por favor ingrese el número de teléfono de la empresa, es un dato obligatorio. '
    ]
  },
  nameContactPerson: {
    type: String,
    uppercase: true,
    required: [
      true,
      'Por favor ingrese el nombre de la persona de contacto para la empresa, es un dato obligatorio. '
    ]
  },
  logoUrl: {
    type: String,
    required: false
  },
  reportsUploader: { 
    type : Array , 
    "default" : [] 
  },
  reportsGenerate: { 
    type : Array , 
    "default" : [] 
  }
});

const CompanyData = mongoose.model('CompanyData', companyDataSchema);
module.exports = CompanyData;
