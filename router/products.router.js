const { Router } = require("express");

const multer = require("multer");
const {addproduct, addproductpage } = require("../controller/controller");


const fileUpload = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); 
  },
});
const uploads = multer({ storage: fileUpload }).single("image");


const p_router = Router()

p_router.get("/addproduct",addproductpage);
p_router.post("/Addproduct", uploads, addproduct);

module.exports = p_router