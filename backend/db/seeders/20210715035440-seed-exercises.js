'use strict'

const now = new Date()
const exercises = [
	{
		label: 'Standard Pushup',
		description: 'Back straight',
		met: 3.8,
		quantity: 'reps',
		duration: 3,
		image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/701/images/slideshow2/classic-483x350-1-1492801201.jpg?resize=480:*',
	},
	{
		label: 'Standard Pullup',
		description: 'Keep body stable',
		met: 3.8,
		quantity: 'reps',
		duration: 3,
		image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/u05-bottomhalfwaytop-ism-mh310118-1558552383.jpg?crop=1.00xw:0.812xh;0,0.0812xh&resize=480:*',
	},
	{
		label: 'Wide-Grip Pullup',
		description: 'Keep body stable. Wider grip than usual',
		met: 3.8,
		quantity: 'reps',
		duration: 3,
		image: 'https://outlift.com/wp-content/uploads/2019/08/chin-up-range-of-motion-illustration.jpg',
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
