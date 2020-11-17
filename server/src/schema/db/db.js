const Sequelize = require('sequelize')
const db = new Sequelize(
    process.env.DATABASE_URL || 'postgres://localhost:5432/budget-app',
    {
        logging: false,
    }
)
const bcrypt = require('bcrypt')

const User = db.define('user', {
    firstName: {
        type: Sequelize.STRING,
    },
    lastName: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: Sequelize.STRING,
    },
})

User.prototype.hashPassword = async function () {
    return await bcrypt.hash(this.password, 12)
}

User.addHook(
    'beforeCreate',
    async (user) => (user.password = await user.hashPassword())
)

const Transaction = db.define('transaction', {
    date: {
        type: Sequelize.DATE,
    },
    amount: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.TEXT,
    },
})

const Category = db.define('category', {
    name: Sequelize.STRING,
})

module.exports = { db, User, Transaction, Category }
