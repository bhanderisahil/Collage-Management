const student = require("../model/stumodel");
const corse = require("../model/corsemodel");
const staff = require("../model/staffmodel");


const jwt = require("jsonwebtoken");

async function getLogin(req, res) {
    return res.render("student_login")
}
async function postLogin(req, res) {
    console.log(req.body);

    const studata = await student.findOne({ email: req.body.email });
    if (studata) {
        if (req.body.password == studata.password) {
            const token = jwt.sign({ studata }, "code");
            res.cookie('Student', token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            });
            const alldata = await corse.find({})
         
            return res.render("stu_deshboard", {
                data: studata,
                alldata: alldata,
                page_name: 'student',
            })
        }        
        else {
            console.log("password is incorrect");
            return res.render("student_login", {
                user: studata
            })
        }
    }
    else {
        console.log("email is not valid");
        return res.render("student_login")
    }
}

async function personal_inform(req, res) {
    console.log(req.params.id);
    // var productdata = await student.aggregate([
    //     {
    //         $lookup: {
    //             from: "corses",
    //             localField: "corse",
    //             foreignField: "name",
    //             as: "user"
    //         }
    //     }
    // ]);
    // for (var data of productdata) {

    // }
    // for (var corsdata of data.user) {

    // }
    // console.log("------------------------", data);
    // console.log("------------------------", corsdata);

    const alldata = await student.findById(req.params.id).populate("StaffId").populate("CorseId").exec();   
    //  const alldata = await staff.find({}).populate("CorseId")
    // const data = await alldata.StaffId.CorseId
    console.log(alldata);
    res.render("stu_profile", {
        alldata: alldata,
        // corsdata: corsdata
    })
}


async function getLogout(req, res) {
    res.cookie('Student', '', { maxAge: 1 });
    // res.cookie.clear();
    res.redirect('/');
};

async function reset_stu(req,res){
    return res.render("stu_reset")
}

async function set_stu_pass(req,res){
    console.log(req.body);
    const verifytoken = jwt.verify(req.cookies.Student, "code");
    console.log(verifytoken);

    if (req.body.oldpassword == verifytoken.studata.password) {
        if (req.body.newpassword == req.body.conformpassword) {
            const userdata = await student.findByIdAndUpdate({ _id: verifytoken.studata._id }, { password: req.body.newpassword })
            console.log("password reset successful", userdata);
            res.cookie('Student', '', { maxAge: 1 });
            res.redirect('/login_student');
        }
        else {
            console.log("password do not match conform password");
            return res.redirect("/reset_stu")
        }
    }
    else {
        console.log("old password incorrect");
        return res.redirect("/reset_stu")
    }

}

module.exports = {
    getLogin,
    postLogin,
    personal_inform,
    reset_stu,
    set_stu_pass,
    getLogout
}