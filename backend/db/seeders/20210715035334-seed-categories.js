'use strict'

const now = new Date()
const categories = ['Pushups', 'Pullups', 'Lats']

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Categories',
			categories.map(category => {
				return {
					label: category,
					createdAt: now,
					updatedAt: now,
				}
			}),
			{}
		)
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Categories', null, {})
	},
}
