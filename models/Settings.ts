import mongoose from 'mongoose'

const SettingsSchema = new mongoose.Schema({
  monthlyFee: {
    type: Number,
    required: true
  },
  commissionPercent: {
    type: Number,
    required: true
  }
})

export default mongoose.models.Settings ||
  mongoose.model('Settings', SettingsSchema)
