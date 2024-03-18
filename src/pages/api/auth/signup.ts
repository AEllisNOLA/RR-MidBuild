import User from "@/models/User";
import connectDb from "@/utils/connectDb";
import type { NextApiRequest, NextApiResponse } from "next";
import validator from 'validator';
import bcrypt from 'bcryptjs';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectDb();
        const { first_name, last_name, email, password } = req.body;

        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({ message: "All fields are required." })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "E-mail address is required." })
        }



        const user = await User.findOne({
            email,
        })

        if (user) {
            return res.status(400).json({ message: "This e-mail address already has an account." })
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters." })
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: `${first_name + " " + last_name}`,
            email,
            password: encryptedPassword
        })
        await newUser.save();
        res.json({
            message: "Registration successful."
        })
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }


}