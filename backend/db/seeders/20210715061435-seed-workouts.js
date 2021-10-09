'use strict'

const workouts = []

for (let i = 0; i < 100; i++) {
	const date = new Date(Date.now() - Math.random() * 60 * 86400000)
	workouts.push({
		exerciseId: Math.floor(Math.random() * 3) + 1,
		userId: 1,
		reps: Math.floor(Math.random() * 25) + 1,
		createdAt: date,
		updatedAt: date,
	})
}

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Workouts', workouts, {})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Workouts', null, {})
	},
}
