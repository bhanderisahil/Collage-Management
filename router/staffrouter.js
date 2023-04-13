const express = require('express');
const router = express.Router();
const controller = require("../controller/staffcontroller")
// login page
router.get('/login_staff', controller.getLogin);
router.post('/login_staff_data', controller.postLogin);
router.get('/addStudent', controller.addStudent);
router.post("/studdata",controller.studdata)
router.get("/viewstudent",controller.viewstudent)
router.get("/deletedata/:id",controller.delete_data);
router.get("/staffdeshboard",controller.staffdeshboard);
router.get("/Resetpassword",controller.Resetpassword);
router.get("/personal_staff",controller.personal_staff)
router.post("/setnewpass",controller.setnewpass)
router.get('/logout', controller.getLogout);

module.exports = router;