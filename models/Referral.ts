import User from '@/models/User'
import mongoose from 'mongoose'

const ReferralSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User
  },
  referred: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User
  },
  date: {
    type: Date,
    required: true
  },
  isPaid: {
    type: Boolean,
    required: false
  }
})

export default mongoose.models.Referral ||
  mongoose.model('Referral', ReferralSchema)

// echpacmn
