const express = require('express');
const router = express.Router();
const controller = require("../controller/studentcontroller")
// login page
router.get('/login_student', controller.getLogin);
router.post('/login_student_data', controller.postLogin);
router.get("/personal_inform/:id",controller.personal_inform);
router.get("/corses",controller.corses)
// router.get('/addStudent', controller.addStudent);
// router.post("/studdata",controller.studdata)
// router.get("/viewstudent",controller.viewstudent)
router.get('/logout_student', controller.getLogout);

module.exports = router;