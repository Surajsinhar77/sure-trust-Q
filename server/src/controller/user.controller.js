const userModel = require('../model/user.route.js');
const z  = require('zod');


const userData = z.object({
	name : z.string(),
	password : z.string(),
	email : z.string();
});


async function registerUser(req, res){
	try{
		const userInfo = req.body;
		userData = userInfo;
		const userExist = await userModel.findOne({email: userData.email});

	}catch(err){

	}
}


module.exports={
	registerUser,
}