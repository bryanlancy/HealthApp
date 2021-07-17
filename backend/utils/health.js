function calculateCalories(met, bodyweight, seconds) {
	//lb to kg
	const kilgograms = bodyweight / 2.205
	//calories per minute
	const cpm = (met * 3.5 * kilgograms) / 200
	return seconds * (cpm / 60)
}
module.exports = {
	calculateCalories,
}
