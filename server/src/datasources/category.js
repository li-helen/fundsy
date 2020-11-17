const { DataSource } = require('apollo-datasource')
const { Category, User } = require('../schema/db')

class CategoryAPI extends DataSource {
    initialize(config) {
        this.context = config.context
    }

    getAllCategories() {
        try {
            return Category.findAll({
                where: {
                    userId: this.context.user.id,
                },
                include: User,
            })
        } catch (err) {
            console.log(err)
        }
    }

    addCategory(name) {
        try {
            return Category.create({
                name,
            })
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = CategoryAPI
