const { DataSource } = require('apollo-datasource')
const { Category, Transaction, User } = require('../schema/db')
const { Op } = require('sequelize')
const { format } = require('date-fns')

class TransactionAPI extends DataSource {
    initialize(config) {
        this.context = config.context
    }

    async getAllTransactions() {
        try {
            const transactions = await Transaction.findAll({
                where: {
                    userId: this.context.user.id,
                },
                include: [Category],
            })

            transactions.sort((a, b) =>
                a.dataValues.date < b.dataValues.date ? 1 : -1
            )
            return transactions.map((transaction) => {
                const formattedDate = format(
                    new Date(Number(transaction.dataValues.date)),
                    'MM/dd/yyyy'
                )
                transaction.dataValues.date = formattedDate
                return transaction
            })
        } catch (err) {
            console.log('could not get transactions')
            console.log(err)
        }
    }

    async createTransactions(transactionsData) {
        try {
            const user = await User.findByPk(this.context.user.id)
            return transactionsData.map((transaction) => {
                const newTransaction = Transaction.create(transaction)
                user.addTransaction(newTransaction)
                return newTransaction
            })
        } catch (error) {
            console.log(error)
        }
    }

    async updateTransaction(formFields) {
        try {
            const parsedDate = formFields.date
                .split('/')
                .map((dateElem) => Number(dateElem))
            const formattedDate = new Date(
                parsedDate[2],
                parsedDate[0] - 1,
                parsedDate[1]
            )

            const transaction = await Transaction.findByPk(formFields.id)

            const category = await Category.findOne({
                where: {
                    [Op.and]: [
                        { userId: this.context.user.id },
                        { name: formFields.category },
                    ],
                },
            })
            await transaction.update({
                ...formFields,
                date: formattedDate,
                amount: formFields.amount,
            })
            await transaction.setCategory(category)
        } catch (err) {
            console.log(err)
        }
    }

    async deleteTransaction(id) {
        try {
            const transaction = await Transaction.findByPk(id)
            await transaction.destroy()
            return { id }
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = TransactionAPI
