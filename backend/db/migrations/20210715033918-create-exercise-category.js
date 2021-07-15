'use strict'
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('ExerciseCategories', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			exerciseId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE',
				references: { model: 'Exercises' },
			},
			categoryId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE',
				references: { model: 'Categories' },
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
		return queryInterface.dropTable('ExerciseCategories')
	},
}
