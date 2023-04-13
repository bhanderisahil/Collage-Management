const express = require('express');
const router = express.Router();
const controller = require("../controller/studentcontroller")
// login page
router.get('/login_student', controller.getLogin);
router.post('/login_student_data', controller.postLogin);
router.get("/personal_inform/:id",controller.personal_inform);
// router.get('/addStudent', controller.addStudent);
// router.post("/studdata",controller.studdata)
// router.get("/viewstudent",controller.viewstudent)
router.get('/logout_student', controller.getLogout);
// router.get("/viewstaff_profile",controller.staffprofile)

router.get("/reset_stu",controller.reset_stu)
router.post("/set_stu_pass",controller.set_stu_pass)

module.exports = router;