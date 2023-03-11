import bcrypt from 'bcrypt'

export const generateHash = async (password: string) => {
  try {
    if (!password) {
      return null
    }

    const salt = await bcrypt.genSalt(12)
    const hashed = await bcrypt.hash(password, salt)

    return hashed
  } catch (error) {
    console.error(error)
  }

  return null
}

export const validate = (input: string, hashed: string) => {
  try {
    return bcrypt.compareSync(input, hashed)
  } catch (error) {
    console.error(error)
  }
  return false
}
