'use strict'

const now = new Date()
const exercises = [
	{
		label: 'Standard Pushup',
		description: 'Back straight',
		met: 3.8,
		image: '',
	},
	{
		label: 'Standard Pullup',
		description: 'Keep body stable',
		met: 3.8,
		image: '',
	},
]

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Exercises',
			exercises.map(exercise => {
				return {
					...exercise,
					createdAt: now,
					updatedAt: now,
				}
			}),
			{}
		)
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Exercises', null, {})
	},
}
