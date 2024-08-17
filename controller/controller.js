const { createToken } = require("../middleware/jsonwebtoken");
const CategoryModel = require("../model/category.schema");
const productModel = require("../model/product.schema");
const UserModel = require("../model/user.Schema");
const bcrypt = require("bcrypt");
const {getToken} = require('../middleware/jsonwebtoken')

exports.loginpage = (req,res) => {
    try {
        res.render("loginpage");
    } catch (error) {
        res.status(404).send(error.message);
    }
}

exports.loginprocess =async (req,res) => {
    const validUser = await UserModel.findOne({ username: req.body.username });
    if (!validUser) {
         res.status(404).send("Invalid User");
    } else {
      if (validUser.password === req.body.password) {
        const token = createToken(validUser);
        res.cookie("token", token);
        return res.render("index");
      } else {
        return res.redirect('/');
      }
    }
}

exports.registrationpage = (req,res) => {
    try {
        res.render("registration");
    } catch (error) {
        res.status(404).send("Issue while redirecting to registration page");
    }
}

exports.createUser = async (req,res) => {
    try {
        const userexists = await UserModel.findOne({
            username : req.body.username,
            email : req.body.email
        });
        if(userexists) {
            res.status(400).send("User already exists");
        }
        const hashedpassword = await bcrypt.hash(password,10);
            const userData = await UserModel.create(req.body,{password:req.body.password});
            console.log(userData);
            res.render("loginpage");
        } catch (error) {
        res.status(404).send("unable to create user");
    }
} 


exports.indexpage = (req,res) => {
    try {
        res.render("index");
    } catch (error) {
        res.send("error on index",error)
    }
}


exports.addproductpage = (req,res) => {
    try {
        res.render("addproduct");
    } catch (error) {
        res.send("error on index",error)
    }
}

exports.addProduct = async (req, res) => {
  try {
    const data = (await productModel.create(req.body));
    console.log(data);
    return res.redirect("back");
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send("Product not added");
  }
};

exports.productView = async (req, res) => {
  try {
    const products = await productModel.find({});
    const cat = await CategoryModel.find({});
    res.render("productview",{products, cat});
  } catch (error) {
    res.status(500).send("Error fetching products");
  }
};

exports.deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      await productModel.findByIdAndDelete(id);
      res.redirect("back");
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).send("Unable to delete product data");
    }
  };
  exports.editProduct = async (req, res) => {
    try {
      const { productId, title, description, price, image, CategoryId } = req.body;
      const updateData = { title, description, price, image, CategoryId };
  
      // Ensure that productId is valid
      if (!productId) {
        return res.status(400).send("Product ID is required");
      }
  
      const updatedProduct = await productModel.findByIdAndUpdate(productId, updateData, { new: true });
  
      if (!updatedProduct) {
        return res.status(404).send("Product not found");
      }
  
      res.redirect("back");
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).send("Error updating product");
    }
  };
  
  

exports.CategoryFormPage =  (req, res) => {
    try {
      res.render("CategoryForm");
    } catch (error) {
      console.log(error);
    }
  };
  


exports.CategoryAdd = async (req,res)=>{

    try {
        let data = await CategoryModel.create(req.body);
        console.log(data);
        res.redirect('back');
    } catch (error) {
        console.log(error);
    }
   
}

exports.ViewCategory = async (req,res) =>{
    try {
        let catData = await CategoryModel.find({});
        res.render('categoryPage',{catData});
    } catch (error) {
        console.log(error);
    }
}

exports.DeleteCategory = async (req,res) =>{
    try {
        await CategoryModel.findByIdAndDelete(req.params.id);
        res.redirect('back');
    }catch(error){
        console.log(error);
        res.send("unable to delete Category");
    }
}

exports.logout = async (req,res) => {
  try {
    res.clearCookie('token', { secure: true, httpOnly: true });
    res.redirect('/');
  } catch (error) {
    
  }
}