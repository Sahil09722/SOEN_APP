import userModel from '../models/user.model.js';
import * as userService from '../services/user.service.js';
import { validationResult } from 'express-validator';
import redisClient from '../services/redis.service.js';

export const createUserController = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const user = await userService.createUser(req.body);
        const token = await user.generateToken();
        delete user._doc.password;//deleting password from the response
        res.status(201).json({user, token});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const loginUserController = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email}).select('+password');
        if(!user){
            res.status(401).json({message: 'User not found'});     
        }

        const isMatch = await user.isValidPassword(password);
       
        if(!isMatch){
            res.status(401).json({message: 'Invalid credentials'});
        }
        const token = await user.generateToken();
        delete user._doc.password;//deleting password from the response
        res.status(200).json({user, token});
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

export const profileUserController = async (req, res) => {
    await res.status(200).json({user: req.user});
}

export const logoutController = async(req,res) =>{
    try{
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
        redisClient.set(token, 'logout', 'EX', 60*60*24);
        res.status(200).json({message: 'Logout successful'});
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
}