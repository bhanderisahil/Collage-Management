const student = require("../model/stumodel");
const corse = require("../model/corsemodel")
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
            res.cookie('jwt', token, {
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
    var productdata = await student.aggregate([
        {
            $lookup: {
                from: "corses",
                localField: "corse",
                foreignField: "name",
                as: "user"
            }
        }
    ]);
    for (var data of productdata) {

    }
    for (var corsdata of data.user) {

    }
    console.log("------------------------", data);
    console.log("------------------------", corsdata);
    res.render("stu_profile", {
        alldata: data,
        corsdata: corsdata
    })
}

async function corses(req, res) {
    const alldata = await corse.find({})
    res.render("view_corse", {
        alldata: alldata
    })
}

async function getLogout(req, res) {
    res.cookie('jwt', '', { maxAge: 1 });
    // res.cookie.clear();
    res.redirect('/');
};
module.exports = {
    getLogin,
    postLogin,
    personal_inform,
    corses,
    getLogout
}