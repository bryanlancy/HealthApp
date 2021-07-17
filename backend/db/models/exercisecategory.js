'use strict'
module.exports = (sequelize, DataTypes) => {
	const ExerciseCategory = sequelize.define(
		'ExerciseCategory',
		{
			exerciseId: DataTypes.INTEGER,
			categoryId: DataTypes.INTEGER,
		},
		{}
	)
	ExerciseCategory.associate = function (models) {
		ExerciseCategory.belongsTo(models.Exercise, { foreignKey: 'exerciseId' })
		ExerciseCategory.belongsTo(models.Category, { foreignKey: 'categoryId' })
	}
	return ExerciseCategory
}
