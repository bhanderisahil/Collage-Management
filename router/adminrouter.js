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

router.get('/deactiveStatus/:id',controller.deactiveStatus);
router.get('/activeStatus/:id',controller.activeStatus)

router.get("/viewstaff", controller.getViewStaff)


router.get('/add_corse', controller.getAddCourse);
router.post('/addCourse', controller.postAddCourse);
router.get("/corses",controller.corses)

router.get("/update_staff/:id",controller.update_staff);
router.post('/update_data', controller.update_data);

router.get("/deletestaff/:id",controller.deletestaff)

router.get("/reset_password",controller.Resetpassword)
router.post("/set_adminpass",controller.setnewpass)


router.get('/logout', controller.getLogout);

module.exports = router