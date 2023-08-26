"use strict"
import * as Joi from "joi"
import { apiResponse } from '../common'
import { isValidObjectId } from 'mongoose'
import { Request, Response } from 'express'

export const add_booking = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        firstName: Joi.string().required().error(new Error('firstName is required!')),
        lastName: Joi.string().required().error(new Error('lastName is required!')),
        email: Joi.string().email().max(50).required().error(new Error('email is required! & max length is 50')),
        phoneNumber: Joi.number().integer().min(1000000000).max(9999999999).required().error(new Error('phoneNumber is required! & max length is 10')),
        address: Joi.string().required().error(new Error('address is required!')),
    })
    schema.validateAsync(req.body).then(async result => {
        req.body = result
        return next()
    }).catch(async error => {
        res.status(400).json(await apiResponse(400, error.message, {}, {}));
    })
}