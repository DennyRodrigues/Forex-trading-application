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
      USD: {
        type: Number,
        required: [true, "Please add a USD value"],
        default: 1000000,
      },
      BTC: {
        type: Number,
        required: [true, "Please add a BTC value"],
        default: 5,
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
