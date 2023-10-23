import mongoose from "mongoose";

export const connectionToDB  = async () => {
    try {
        await mongoose.connect("mongodb://localhost/technical-test");
        console.log("DB is connected");
    } catch (error) {
        console.log(error);
    }
};
