const admin = require("../model/adminmodel");
const staff = require("../model/staffmodel");
const corse = require("../model/corsemodel");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');


async function getLogin(req, res) {
    res.render('adminlogin');
}


async function postLogin(req, res) {
    console.log("hello");
    const { email, password } = req.body;

    const admindata = await admin.findOne({ email: email })

    if (admindata) {
       const passcom = await bcrypt.compare(req.body.password,admindata.password)
       if(passcom === true){

        const token = jwt.sign({ admindata }, "code");
        res.cookie('Admin', token, {
            maxAge: 24 * 60 * 60 * 1000,
        });
        console.log("login success");
        return res.render('dashboard')
       }
       else{
        console.log("password incorrect");
        return res.redirect("/login")
       }
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
    if (req.cookies.jwt == " " || req.cookies.jwt == null) {
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
    const cdata = await corse.find({})
    res.render("addStaff", {
        page_name: "staff",
        cdata: cdata
    })
}

async function postAddStaff(req, res) {

    console.log(req.body);

    const admindata = await staff.findOne({ email: req.body.email })

    if (admindata) {
        console.log("user alrady taken");
        return res.render('/dashboard');

    }

    var name = req.body.firstName + " " + req.body.lastName
    req.body.isactive = 1;
    staff.create({
        CorseId: req.body.CorseId,
        name: name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        employeetype: req.body.employeetype,
        isactive: 1
    })
    return res.redirect('/dashboard');
}
async function update_staff(req,res){
    const finddata= await staff.findById(req.params.id)
    const cdata = await corse.find({})
    res.render("update_staff", {
        cdata: cdata,
        finddata : finddata
    })
}

async function update_data(req,res){
    req.body.name = req.body.firstName + " " + req.body.lastName
    req.body.isactive = 1;
    const finddata = await staff.findByIdAndUpdate(req.body.editid,{$set:
        req.body
    })
    return res.redirect('/viewstaff');
}

async function deletestaff(req, res) {
    var phe = req.params.id;
    var deletdata = await staff.findOneAndDelete(phe)
    if (!deletdata) {
        console.log("data not remove");
    }

    return res.redirect("/viewstaff");
}


async function deactiveStatus(req, res) {
    console.log(req.params.id);
    await staff.findByIdAndUpdate(req.params.id, {
        isactive: 0
    })
    return res.redirect('back')
}

async function activeStatus(req, res) {
    console.log(req.params.id);

    await staff.findByIdAndUpdate(req.params.id, {
        isactive: 1
    })
    return res.redirect('back');
}

async function getViewStaff(req, res) {
    // const alldata = await staff.find({}).populate("CorseId")
    // console.log(alldata);

    let activeData = await staff.find({ "isactive": 1 }).populate("CorseId");
    let deactiveData = await staff.find({ 'isactive': 0 }).populate("CorseId");

    console.log(deactiveData);
    return res.render('viewstaff', {
        activeData: activeData,
        deactiveData: deactiveData
    })


    // res.render("viewstaff", { alldata: alldata })
}



async function getAddCourse(req, res) {
    const cdata = await corse.find({})
    res.render('addCourse', {
        page_name: 'courses',
        cdata: cdata
    });
}

async function postAddCourse(req, res) {
    console.log(req.body);
    corse.create(
        req.body
    )
    return res.redirect('/dashboard');
}

async function corses(req, res) {
    const alldata = await corse.find({})

    let search = '';

    if (req.query.search) {
        search = req.query.search
    }

    var page = 1;
    if (req.query.page) {
        page = req.query.page
    }

    var per_page = 4;

    let AdminData = await corse.find({
        $or: [
            { name: { $regex: '.*' + search + '.*' } },
            { email: { $regex: '.*' + search + '.*' } }
        ]
    })
        .skip((page - 1) * per_page)
        .limit(per_page)
        .exec();

    let CountData = await corse.find({
        $or: [
            { name: { $regex: '.*' + search + '.*' } },
            { email: { $regex: '.*' + search + '.*' } }
        ]
    }).countDocuments();


    console.log(AdminData);
    return res.render('view_corse', {
        'adminRecord': AdminData,
        'countRecord': Math.ceil(CountData / per_page),
        'searchData': search,
        "currentPage": page,
        "next": page + 1,
        "prev": page - 1,
        alldata: alldata
    });

    // res.render("view_corse", {
    //     alldata: alldata
    // })
}

async function Resetpassword(req, res) {
    console.log("hellooo");
    return res.render("admin_reset")
}


async function setnewpass(req, res) {
    console.log(req.body);
    const verifytoken = jwt.verify(req.cookies.Admin, "code");
    console.log(verifytoken);

   const bpasscom = await bcrypt.compare(req.body.oldpassword, verifytoken.admindata.password)

   if(bpasscom === true){
    if (req.body.newpasswprd == req.body.conformpassword) {
        const hashedPassword = await bcrypt.hash(req.body.newpasswprd, 8);  
    
        const userdata = await admin.findByIdAndUpdate({ _id: verifytoken.admindata._id }, { password:hashedPassword})
        console.log("Admin password reset successful", userdata);
        res.cookie('Token','', { maxAge: 1 });
        res.redirect('/login');
    }
    else {
        console.log("password do not match conform password");
        return res.redirect("/reset_password")
    }
   }
    else {
        console.log("old password incorrect");
        return res.redirect("/reset_password")
    }
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
    deletestaff,
    deactiveStatus,
    activeStatus,
    corses,
    Resetpassword,
    setnewpass,
    update_staff,
    update_data
}