import mongoose from 'mongoose'

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  fee: {
    type: Number,
    required: true
  },
  commission: {
    type: Number,
    required: true
  },
  isMultiple: {
    type: Boolean
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  }
})

export default mongoose.models.Service ||
  mongoose.model('Service', ServiceSchema)
