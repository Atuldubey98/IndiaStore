const validator  = require('validator');
const errorHandler = require('../api/errorHandler');
const getUserModel = (id, email, password, avatar, name)=>{
    if (validator.isEmpty(id) || validator.isEmpty(email)|| validator.isEmpty(password) || validator.isEmpty(name)) {
        errorHandler({message : "Enter valid identifications for user or some information is incomplete", code : 400});
    }
    if (!validator.isEmail(email)) {
        errorHandler({message : "Enter valid identifications for user or some information is incomplete", code : 400});
    }
    if (password.length <= 6) {
        errorHandler({message : "Enter valid length of password", code : 400});
    }
    if (name.length < 3) {
        errorHandler({message : "Name length cannot be less that 3 "});
    }
    return {
       id,email, password, avatar, name 
    }
}

module.exports = getUserModel;