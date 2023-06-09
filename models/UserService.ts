import mongoose from 'mongoose'

const activeDate = new mongoose.Schema({
  start: {
    type: Date,
    require: false
  },
  end: {
    type: Date,
    require: false
  }
})

const UserServiceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Service'
  },
  fee: {
    type: Number,
    required: true
  },
  commission: {
    type: Number,
    required: true
  },
  serviceType: {
    type: String,
    enum: ['MONTHLY', 'SESSION'],
    required: true
  },
  activeDate: {
    type: activeDate,
    required: true
  }
})

export default mongoose.models.UserService ||
  mongoose.model('UserService', UserServiceSchema)
