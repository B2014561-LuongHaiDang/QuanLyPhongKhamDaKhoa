const express = require("express");
const router = express.Router()
const ScheduleController = require('../controllers/ScheduleController');


router.post('/', ScheduleController.createSchedule)
router.put('/:id', ScheduleController.updateSchedule)
router.get('/', ScheduleController.getAllSchedule)
router.get('/user/:id', ScheduleController.getByUserId)
router.get('/doctor/:id', ScheduleController.getByDoctorId)
router.get('/:id', ScheduleController.getDetailsSchedule)

module.exports = router