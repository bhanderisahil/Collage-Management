const admin = require("../model/adminmodel");
const staff = require("../model/staffmodel");
const corse = require("../model/corsemodel");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');




async function getLogin(req, res) {
    res.render('adminlogin');
}


async function postLogin(req, res) {
    const { email, password } = req.body;

    const admindata = await admin.findOne({ email: email })

    if (admindata) {
        const token = jwt.sign({ admindata }, "code");
        res.cookie('jwt', token, {
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.redirect('/dashboard');
    }
    else {
        console.log("email is not valid");
        return res.redirect('/login');
    }
};



async function getRegister(req, res) {
    res.render('register');
};

async function postRegister(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    const admindata = await admin.findOne({ email: email })

    if (admindata) {
        console.log("user alrady taken");
        return res.render('/register');

    }
    console.log(req.body);
    if (password !== confirmPassword) {
        errors.push({ msg: 'Passwords do not match' });
        return res.render('/register');
    } else {
        const hashedPassword = await bcrypt.hash(password, 8);
        req.body.password = hashedPassword
        admin.create(
            req.body
        )
        return res.redirect('/login');

    }
};

async function getDashboard(req, res) {
 
    if(req.cookies.jwt == " " || req.cookies.jwt == null){
            return res.redirect('/');
        }
        res.render('dashboard', { user: req.body, page_name: 'overview' });
}

async function getLogout(req, res) {
    res.cookie('jwt', '', { maxAge: 1 });
    // res.cookie.clear();
    res.redirect('/');
};


async function getAddStaff(req, res) {

    res.render("addStaff", { page_name: "staff" })
}

async function postAddStaff(req, res) {
   
    console.log(req.body);


    const admindata = await staff.findOne({ email: req.body.email })

    if (admindata) {
        console.log("user alrady taken");
        return res.render('/dashboard');

    }

    var name = req.body.firstName + " " + req.body.lastName
    staff.create({
        name: name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        employeetype: req.body.employeetype

    })
    return res.redirect('/dashboard');


}


async function getViewStaff(req, res) {
    const alldata = await staff.find({})
    console.log(alldata);
    res.render("viewstaff", { alldata: alldata })
}



async function getAddCourse(req, res) {
    res.render('addCourse', {
        page_name: 'courses',
    });
}

async function postAddCourse(req, res) {
    console.log(req.body);
    corse.create(
        req.body

    )
    return res.redirect('/dashboard');

}

async function deletestaff(req, res) {
    var phe = req.params.id;
    var deletdata = await staff.findOneAndDelete(phe)
    if (!deletdata) {
        console.log("data not remove");
    }

    return res.redirect("/viewstaff");
}

module.exports = {
    getLogin,
    postLogin,
    getRegister,
    postRegister,
    getDashboard,
    getLogout,
    getAddStaff,
    postAddStaff,
    getViewStaff,
    getAddCourse,
    postAddCourse,
    deletestaff
}