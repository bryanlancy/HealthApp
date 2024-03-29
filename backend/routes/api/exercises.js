const router = require('express').Router()

const asyncHandler = require('express-async-handler')
const { Exercise, ExerciseCategory } = require('../../db/models')

// GET /api/exercises?categoryId
router.get(
	'/',
	asyncHandler(async (req, res) => {
		let exercises = await ExerciseCategory.findAll({
			where: { ...req.query },
			include: [
				{
					model: Exercise,
				},
			],
		})
		exercises = Object.assign(
			{},
			...exercises.map(exercise => {
				const { id, label, description, met, image, quantity } = exercise.Exercise
				return {
					[id]: {
						label,
						description,
						met: parseFloat(met),
						image,
						quantity,
					},
				}
			})
		)
		return res.json({ count: Object.keys(exercises).length, exercises })
	})
)

// POST /api/exercises
router.post(
	'/',
	asyncHandler(async (req, res) => {
		const { categoryId, label, description, quantity, met, duration, image } = req.body
		console.log(categoryId)
		const exercise = await Exercise.create({
			label,
			description,
			quantity,
			met,
			duration,
			image,
		})

		const { id: exerciseId } = exercise
		const exerciseCategory = await ExerciseCategory.create({
			categoryId,
			exerciseId,
		})
		return res.json({ exercise })
	})
)
module.exports = router
