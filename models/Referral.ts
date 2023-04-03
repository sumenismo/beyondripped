import User from '@/models/User'
import mongoose from 'mongoose'

const FeesSchema = new mongoose.Schema({
  monthlyFee: {
    type: Number,
    required: true
  },
  commissionPercent: {
    type: Number,
    required: true
  }
})

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
  },
  isActive: {
    type: Boolean,
    required: false
  },
  fees: {
    type: FeesSchema,
    required: true
  }
})

export default mongoose.models.Referral ||
  mongoose.model('Referral', ReferralSchema)

// echpacmn
// ilnamrnm
