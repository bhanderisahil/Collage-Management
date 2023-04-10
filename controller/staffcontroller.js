const staff = require("../model/staffmodel")
const student = require("../model/stumodel")
const jwt = require("jsonwebtoken")
async function getLogin(req, res) {
    return res.render("login")
}
async function postLogin(req, res) {
    const staffdata = await staff.findOne({ email: req.body.email });
    if (staffdata) {
        if (req.body.password == staffdata.password) {
            const token = jwt.sign({ staffdata }, "code");
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            });
            return res.render("staff_deshboard")
        }
        else {
            console.log("password is incorrect");
            return res.render("login", {
                user: staffdata
            })
        }
    }
    else {
        console.log("email is not valid");
        return res.render("login")
    }
}

async function addStudent(req, res) {
    return res.render("studentregi")
}


async function studdata(req, res) {
    const studata = await student.findOne({ email: req.body.email })
    if (studata) {
        console.log("student alrady registered");
        return res.render("student_login")
    }
    var name = req.body.firstname + " " + req.body.lastname

    student.create({
        // corse_id: req.body.corse_id,
        name: name,
        date: req.body.date,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        gender: req.body.gender,
        city: req.body.city,
        corse: req.body.corse
    })
    return res.render("student_login")
}

async function viewstudent(req, res) {
    const alldata = await student.find({})
    return res.render("view_student", {
        alldata: alldata
    })
}
async function delete_data(req, res) {

    var phe = req.params.id;
    var deletdata = await student.findOneAndDelete(phe)
    if (!deletdata) {
        console.log("data not remove");
    }

    return res.redirect("/viewstudent");

}

async function getLogout(req, res) {
    res.cookie('jwt', '', { maxAge: 1 });
    // res.cookie.clear();
    res.redirect('/login');
};

module.exports = {

    getLogin,
    postLogin,
    addStudent,
    studdata,
    viewstudent,
    delete_data,
    getLogout
}