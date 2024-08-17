const express = require('express');
const { loginpage, registrationpage, createUser, loginprocess, indexpage, addProduct, productView, addproductpage, deleteProduct, editProduct, CategoryFormPage, logout, CategoryAdd, ViewCategory, DeleteCategory } = require('../controller/controller');


const router = express.Router();

router.get('/',loginpage)
router.get("/index",indexpage)
router.post("/loginvalidation",loginprocess)
router.get('/registration',registrationpage)
router.post('/createUser',createUser)
router.get('/addproduct',addproductpage)
router.post('/Addproduct', addProduct)
router.get('/productview',productView)
router.get("/deleteProduct/:id", deleteProduct);
router.post("/updateProduct",editProduct);
router.get('/CategoryForm',CategoryFormPage);
router.get('/logOut',logout);
router.post('/CategoryAdd',CategoryAdd)
router.get('/categoryPage',ViewCategory)
router.get('/deleteCategory/:id',DeleteCategory);




module.exports = router