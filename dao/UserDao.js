const User = require("../models/User")

module.exports = class UserDao {

    async getAllUsers() {
        return await User.findAll()
    }

    async getUserById(userId) {
        return await User.findByPk(userId)
    }

    async createUser(data) {
        let {first_name, last_name, age, email, sex} = data
        await User.create({
            first_name,
            last_name, 
            age, 
            email, 
            sex
        })
    }

    async deleteUserById(userId) {
        await User.destroy({
            where: {
                id: userId
            }
        })
    }

    async updateUser(data) {
        let {id, first_name, last_name, age, email, sex} = data
        console.log(id, first_name, last_name, age, email, sex)
        await User.update({
            first_name,
            last_name,
            age,
            email,
            sex
        }, {where: {id}})
    }
}