const UserRouter = require('./UserRouter')
const DoctorRouter = require('./DoctorRouter')
const ScheduleRouter = require('./ScheduleRouter')
const MedicineRouter = require('./MedicineRouter')
const PrescriptionRouter = require('./PrescriptionRouter')
const SpecialtyRouter = require('./SpecialtyRouter')
const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/doctor', DoctorRouter)
    app.use('/api/schedule', ScheduleRouter)
    app.use('/api/medicine', MedicineRouter)
    app.use('/api/prescription', PrescriptionRouter)
    app.use('/api/specialty', SpecialtyRouter)
}

module.exports = routes