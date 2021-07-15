'use strict'
module.exports = (sequelize, DataTypes) => {
	const Exercise = sequelize.define(
		'Exercise',
		{
			label: DataTypes.STRING,
			description: DataTypes.STRING,
			met: DataTypes.DECIMAL,
			image: DataTypes.STRING,
		},
		{}
	)
	Exercise.associate = function (models) {
		Exercise.hasMany(models.ExerciseCategory, { foreignKey: 'exerciseId' })
		Exercise.hasMany(models.Workout, { foreignKey: 'exerciseId' })
	}
	return Exercise
}
