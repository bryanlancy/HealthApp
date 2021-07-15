const router = require('express').Router()

const asyncHandler = require('express-async-handler')
const { Category, Exercise, ExerciseCategory } = require('../../db/models')

//GET /api/categories
router.get(
	'/',
	asyncHandler(async (req, res) => {
		let categories = await Category.findAll({
			include: [
				{
					model: ExerciseCategory,
					include: [
						{
							model: Exercise,
						},
					],
				},
			],
		})

		categories = Object.assign(
			{},
			...categories.map(category => {
				const { id, label, ExerciseCategories } = category
				return {
					[id]: {
						label,
						exercises: Object.assign(
							{},
							...ExerciseCategories.map(exercise => {
								const { id, label, description, met, image } = exercise.Exercise
								return {
									[id]: {
										label,
										description,
										met: parseFloat(met),
										image,
									},
								}
							})
						),
					},
				}
			})
		)

		return res.json({
			count: Object.keys(categories).length,
			categories,
		})
	})
)
router.post(
	'/',
	asyncHandler(async (req, res) => {
		const { label } = req.body
		const category = await Category.create({ label })
		return res.json({ category })
	})
)

module.exports = router
