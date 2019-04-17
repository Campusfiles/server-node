import { Schema, model } from "mongoose";
import { dateOptions, emailRegex } from "../variables";

const defaultPhotoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1KKk22o-PiYCzh7Mc7G8KvPbiSFypE06mkSKWnRqP9lmjp1Yy";

const UserSchema = new Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: emailRegex
    },
    password: { 
      type: String, 
      required: true 
    },
    firstName: String,
    middleName: String,
    lastName: String, 
    photo: {
      type: String,
      default: defaultPhotoUrl
    },
    address: String, 
    birthdate: {
      type: Date,
      required: true,
      default: Date.now
    },
    anonymous: {
      type: Boolean,
      required: true,
      default: true
    },
    type: {
      type: String,
      enum: ["normal", "administrator", "technicalAdministrator"],
      default: "normal"
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
}, dateOptions);

export const users = model(
  "Users",
  UserSchema
);
