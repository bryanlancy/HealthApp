const router = require('express').Router()

const asyncHandler = require('express-async-handler')
const { Workout } = require('../../db/models')

// GET /api/workouts
router.get(
	'/',
	asyncHandler(async (req, res) => {
		const { userId } = req.query
		const workouts = await Workout.findAll({ where: { userId: userId || null } })
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
