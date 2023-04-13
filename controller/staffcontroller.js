const staff = require("../model/staffmodel")
const student = require("../model/stumodel")
const corse = require("../model/corsemodel")
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser');

async function getLogin(req, res) {
    return res.render("login")
}
async function postLogin(req, res) {
    const staffdata = await staff.findOne({ email: req.body.email });
    if (staffdata) {
        if (req.body.password == staffdata.password) {
            if (staffdata.isactive == 1) {
                const token = jwt.sign({ staffdata }, "code");
                res.cookie('Staff', token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000,
                });
                console.log("login successful");
                return res.render("staff_deshboard")
            }
            else {
                console.log("login failed,please contact administrator");
                return res.render("login", {
                    user: staffdata
                })
            }
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

async function staffdeshboard(req, res) {
    return res.render("staff_deshboard")
}

async function studdata(req, res) {
    const studata = await student.findOne({ email: req.body.email })
    if (studata) {
        console.log("student alrady registered");
        return res.render("studentregi")
    }
    var name = req.body.firstname + " " + req.body.lastname

    const tokenId = await jwt.verify(req.cookies.Staff, "code");


    student.create({
        StaffId: tokenId.staffdata._id,
        CorseId: tokenId.staffdata.CorseId,
        name: name,
        date: req.body.date,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        gender: req.body.gender,
        city: req.body.city,
        // corse: req.body.corse
    })
    return res.redirect("/staffdeshboard")
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

async function Resetpassword(req, res) {
    console.log("hellooo");
    return res.render("staff_reset")
}

async function setnewpass(req, res) {
    console.log(req.body);
    const verifytoken = jwt.verify(req.cookies.Staff, "code");
    console.log(verifytoken);

    if (req.body.oldpassword == verifytoken.staffdata.password) {
        if (req.body.newpasswprd == req.body.conformpassword) {
            const userdata = await staff.findByIdAndUpdate({ _id: verifytoken.staffdata._id }, { password: req.body.newpasswprd })
            console.log("password reset successful", userdata);
            res.cookie('Staff', '', { maxAge: 1 });
            res.redirect('/login_staff');
        }
        else {
            console.log("password do not match conform password");
            return res.redirect("/Resetpassword")
        }
    }
    else {
        console.log("old password incorrect");
        return res.redirect("/Resetpassword")
    }
}

async function personal_staff(req, res) {
    const verifytoken = jwt.verify(req.cookies.Staff, "code");
    console.log(verifytoken);
    const alldata = await staff.findById(verifytoken.staffdata._id).populate("CorseId").exec();

    console.log(alldata);
    return res.render("personal_staff", {
        alldata: alldata,
        // corsdata: corsdata
    })
}

async function getLogout(req, res) {
    res.cookie('Staff', '', { maxAge: 1 });
    // res.cookie.clear();
    res.redirect('/login_staff');
};

module.exports = {

    getLogin,
    postLogin,
    addStudent,
    studdata,
    viewstudent,
    delete_data,
    getLogout,
    staffdeshboard,
    Resetpassword,
    setnewpass,
    personal_staff
}