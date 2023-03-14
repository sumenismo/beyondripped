import { addDays } from '@/lib/utils'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import { v4 } from 'uuid'

const verify = new mongoose.Schema({
  verified: {
    type: Boolean,
    require: true
  },
  code: {
    type: String,
    require: true
  },
  expire: {
    type: String,
    require: true
  },
  sent: {
    type: Boolean,
    require: false
  }
})

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: false },
  password: { type: String, required: false },
  role: {
    type: String,
    enum: ['ADMIN', 'MEMBER', 'FINANCE'],
    required: true
  },
  createdBy: { type: String, required: false },
  referrer: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  },
  referralCode: {
    type: String,
    required: true
  },
  verify: {
    type: verify,
    required: true
  }
})

UserSchema.methods.verifyPassword = function (password: string) {
  try {
    const userPassword = this.password
    const isAuthenticated = bcrypt.compareSync(password, userPassword)
    return isAuthenticated
  } catch (error) {
    return false
  }
}

UserSchema.methods.generateVerify = function () {
  try {
    this.verify = {
      verified: this.verify.verified,
      code: v4(),
      expire: addDays(new Date(), 3),
      sent: true
    }
    this.save()
  } catch (error) {
    console.log('generate verify error', error)
  }
}

export default mongoose.models.User || mongoose.model('User', UserSchema)
