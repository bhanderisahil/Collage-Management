const express = require('express');
const router = express.Router();
const controller = require("../controller/admincontroller")
// router.get("/",con)
router.get('/login', controller.getLogin);
router.post('/login', controller.postLogin);

router.get('/register', controller.getRegister);
router.post('/register',controller.postRegister);

router.get('/dashboard', controller.getDashboard);

router.get('/addStaff', controller.getAddStaff), 
router.post('/addStaff', controller.postAddStaff);

router.get("/viewstaff", controller.getViewStaff)


router.get('/add_corse', controller.getAddCourse);
router.post('/addCourse', controller.postAddCourse);

router.get("/deletestaff/:id",controller.deletestaff)
router.get('/logout', controller.getLogout);

module.exports = router