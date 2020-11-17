const { db, User, Transaction, Category } = require('./db')

User.hasMany(Transaction)
Transaction.belongsTo(Category)
Category.belongsTo(User)

module.exports = { db, User, Transaction, Category }
