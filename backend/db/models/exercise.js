'use strict'
module.exports = (sequelize, DataTypes) => {
	const Exercise = sequelize.define(
		'Exercise',
		{
			categoryId: DataTypes.INTEGER,
			label: DataTypes.STRING,
			description: DataTypes.STRING,
			met: DataTypes.DECIMAL,
			image: DataTypes.STRING,
		},
		{}
	)
	Exercise.associate = function (models) {
		Exercise.belongsTo(models.Category, { foreignKey: 'categoryId' })
		Exercise.hasMany(models.Workout, { foreignKey: 'exerciseId' })
	}
	return Exercise
}
