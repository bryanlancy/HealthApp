'use strict'
module.exports = (sequelize, DataTypes) => {
	const Category = sequelize.define(
		'Category',
		{
			label: DataTypes.STRING,
		},
		{}
	)
	Category.associate = function (models) {
		Category.hasMany(models.ExerciseCategory, { foreignKey: 'categoryId', onDelete: 'CASCADE' })
	}
	return Category
}
