'use strict'
const faker = require('faker')
const bcrypt = require('bcryptjs')

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Users',
			[
				{
					email: 'demo@user.io',
					username: 'Demo-User',
					hashedPassword: bcrypt.hashSync('password'),
					weight: 150,
					avatar: 'rubber-ducky-avatar.png'
				},
			],
			{}
		)
	},

	down: (queryInterface, Sequelize) => {
		const Op = Sequelize.Op
		return queryInterface.bulkDelete(
			'Users',
			{
				username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] },
			},
			{}
		)
	},
}
