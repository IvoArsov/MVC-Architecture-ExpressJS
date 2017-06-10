const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let userSchema = new mongoose.Schema({
    username: { type: String, required: REQUIRED_VALIDATION_MESSAGE, unique: true },
    firstName: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
    lastName: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
    salt: { type: String },
    hashedPass: { type: String },
    roles: [String]
})

userSchema.method({
    authenticate: (password) => {
       return encryption.generateHashedPassword(this.salt, password) === this.hashedPass        
    }
})

let User = mongoose.model('User', userSchema)

module.exports = User
module.exports.seedAdminUser = () => {
    User.find({}).then(users => {
        if(users > 0) return

        let salt = encryption.generateSalt()
        let hashedPass = encryption.generateHashedPassword(salt, 'admin123admin')

        User.create({
            username: 'Admin',
            firstName: 'AdminFirstName',
            lastName: 'AdminLastName',
            salt: salt,
            hashedPass: hashedPass,
            roles: ['Admin']
        })
    })

}


