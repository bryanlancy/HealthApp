'use strict'

const now = new Date()
const exercises = [
	{
		label: 'Standard Pushup',
		description: 'Back straight',
		met: 3.8,
		duration: 3,
		image: '',
	},
	{
		label: 'Standard Pullup',
		description: 'Keep body stable',
		met: 3.8,
		duration: 3,
		image: '',
	},
	{
		label: 'Wide-Grip Pullup',
		description: 'Keep body stable. Wider grip than usual',
		met: 3.8,
		duration: 3,
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
