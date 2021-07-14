const router = require('express').Router()

const asyncHandler = require('express-async-handler')
const { Exercise } = require('../../db/models')

// GET /api/exercises?categoryId
router.get(
	'/',
	asyncHandler(async (req, res) => {
		const exercises = await Exercise.findAll({ where: { ...req.query } })
		return res.json({ count: exercises.length, exercises })
	})
)

// POST /api/exercises
router.post(
	'/',
	asyncHandler(async (req, res) => {
		const { categoryId, label, description, met, image } = req.body
		const exercise = await Exercise.create({
			categoryId,
			label,
			description,
			met,
			image,
		})
		return res.json({ exercise })
	})
)
module.exports = router
