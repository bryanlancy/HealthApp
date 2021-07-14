const router = require('express').Router()

const asyncHandler = require('express-async-handler')
const { Category, Exercise } = require('../../db/models')

//GET /api/categories
router.get(
	'/',
	asyncHandler(async (req, res) => {
		const categories = await Category.findAll({ include: Exercise })

		return res.json({
			count: categories.length,
			categories: Object.assign(
				{},
				...categories.map(cat => {
					const { id, label, Exercises: exercises } = cat.dataValues
					return {
						[id]: {
							label,
							exercises: Object.assign(
								{},
								...exercises.map(ex => {
									const { id, label, description, met, image } = ex
									return {
										[id]: { label, description, met, image },
									}
								})
							),
						},
					}
				})
			),
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
