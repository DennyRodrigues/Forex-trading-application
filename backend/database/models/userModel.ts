import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    wallet: {
      JPY: {
        type: Number,
        required: [true, "Please add a JPY value"],
        default: 5000,
      },
      USD: {
        type: Number,
        required: [true, "Please add a USD value"],
        default: 5000,
      },
    },
    trades: {
      type: Array,
      required: [true, "Please add a trade array"],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
