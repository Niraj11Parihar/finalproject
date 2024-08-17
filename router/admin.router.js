const { Router } = require("express");
const {indexpage} = require("../controller/Admin.controller");

const router = Router();

router.get('/',indexpage);


module.exports = router