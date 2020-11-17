const { DataSource } = require('apollo-datasource')
const { User } = require('../schema/db')
const bcrypt = require('bcrypt')

class UserAPI extends DataSource {
    initialize(config) {
        this.context = config.context
    }

    async getUser() {
        try {
            const user = await User.findOne({
                where: {
                    id: this.context.user.id,
                },
            })

            return user
        } catch (err) {
            console.log('error getting user: ', err)
        }

        return user
    }
}

module.exports = UserAPI
