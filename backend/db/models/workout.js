'use strict'
module.exports = (sequelize, DataTypes) => {
	const Workout = sequelize.define(
		'Workout',
		{
			exerciseId: DataTypes.INTEGER,
			userId: DataTypes.INTEGER,
			reps: DataTypes.INTEGER,
		},
		{}
	)
	Workout.associate = function (models) {
		Workout.belongsTo(models.Exercise, { foreignKey: 'exerciseId' })
		Workout.belongsTo(models.User, { foreignKey: 'userId' })
	}
	return Workout
}
