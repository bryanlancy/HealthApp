'use strict'
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Exercises', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			label: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			description: {
				type: Sequelize.STRING,
			},
			quantity: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			met: {
				allowNull: false,
				type: Sequelize.DECIMAL,
			},
			duration: {
				type: Sequelize.DECIMAL,
			},
			image: {
				type: Sequelize.STRING,
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
		return queryInterface.dropTable('Exercises')
	},
}
