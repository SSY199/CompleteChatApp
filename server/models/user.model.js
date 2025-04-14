
import { genSalt } from "bcrypt";
import { hash } from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // username: {
  //   type: String,
  //   required: [true, 'Please enter a username.'],
  //   min: 3,
  //   max: 20,
  //   unique: true,
  // },
  firstname: {
    type: String,
    required: false,
    min: 3,
    max: 20,
  },
  lastname: {
    type: String,
    required: false,
    min: 3,
    max: 20,
  },
  image: {
    type: String,
    default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2XpA_J7m2G2hSns2UcaNwHO1vTC96DqbiGw&s',
  },
  color:{
    type: String,
    default: 'black',
  },
  profileSetup:{
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    required: [true, 'Please enter an email.'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter a password.'],
    min: 5,
  },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  const salt = await genSalt();
  this.password = await hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

export default User;