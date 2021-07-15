const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const { Workout, Exercise } = require('../../db/models')
const { requireAuth } = require('../../utils/auth')
const { calculateCalories } = require('../../utils/health')

// GET /api/workouts
router.get(
	'/',
	// requireAuth,
	asyncHandler(async (req, res) => {
		const { userId } = req.query
		console.log(req.user)
		const weight = 150
		let workouts = await Workout.findAll({ where: { userId: userId || null }, include: { model: Exercise } })
		workouts = Object.assign(
			{},
			...workouts.map(workout => {
				const { id, reps } = workout
				const { id: exerciseId, label, met, duration } = workout.Exercise
				return {
					[id]: {
						reps,
						calories: calculateCalories(met, weight, reps * duration),
						exercise: {
							id: exerciseId,
							label,
						},
					},
				}
			})
		)
		return res.json({ count: workouts.length, workouts })
	})
)

// POST /api/workouts
router.post(
	'/',
	asyncHandler(async (req, res) => {
		const { exerciseId, userId, reps } = req.body
		const workout = await Workout.create({ exerciseId, userId, reps })
		return res.json({ workout })
	})
)

module.exports = router
