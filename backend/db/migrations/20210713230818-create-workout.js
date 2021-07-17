'use strict'
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Workouts', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			exerciseId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: { model: 'Exercises' },
			},
			userId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: { model: 'Users' },
			},
			reps: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		})
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Workouts')
	},
}
