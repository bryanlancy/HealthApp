'use strict'
module.exports = (sequelize, DataTypes) => {
	const Exercise = sequelize.define(
		'Exercise',
		{
			label: DataTypes.STRING,
			description: DataTypes.STRING,
			quantity: DataTypes.STRING,
			met: DataTypes.DECIMAL,
			duration: DataTypes.DECIMAL,
			image: DataTypes.STRING,
		},
		{}
	)
	Exercise.associate = function (models) {
		Exercise.hasMany(models.ExerciseCategory, { foreignKey: 'exerciseId', onDelete: 'CASCADE' })
		Exercise.hasMany(models.Workout, { foreignKey: 'exerciseId' })
	}
	return Exercise
}
