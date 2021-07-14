const router = require('express').Router()

const asyncHandler = require('express-async-handler')
const { Category } = require('../../db/models')

//GET /api/categories
router.get(
	'/',
	asyncHandler(async (req, res) => {
		const categories = await Category.findAll()
		return res.json({ count: categories.length, categories })
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
