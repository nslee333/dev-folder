import {Request, Response} from 'express';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require("../models/userModel");




// @desc Register new user
// @route POST /api/users
// @access Private

const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password} = req.body;

    if(!name || !email || !password) {
        res.status(400);
        throw new Error("Please add all fields.");
    }

    const userExists = await User.findOne({email});

    if(userExists) {
        res.status(400);
        throw new Error("User alread exists.")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }

});

// @desc Login new user
// @route POST /api/users/login
// @access Public

const loginUser = asyncHandler(async (req: Request, res: Response) => {
    res.json({message: "Login User"})
});

// @desc Get user data
// @route GET /api/users/me
// @access Private

const getMe = asyncHandler(async (req: Request, res: Response) => {
    res.json({message: "Display user data."})
});

module.exports = {registerUser, loginUser, getMe};