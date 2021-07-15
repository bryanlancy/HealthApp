'use strict'

const now = new Date()
const exerciseCategories = [
	{
		exerciseId: 1,
		categoryId: 1,
	},
	{
		exerciseId: 2,
		categoryId: 2,
	},
	{
		exerciseId: 2,
		categoryId: 3,
	},
]

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'ExerciseCategories',
			exerciseCategories.map(eC => {
				return {
					...eC,
					createdAt: now,
					updatedAt: now,
				}
			}),
			{}
		)
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('ExerciseCategories', null, {})
	},
}
