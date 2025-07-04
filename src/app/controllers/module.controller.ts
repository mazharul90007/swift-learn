import { Request, Response } from 'express'
import { Module } from '../models/module.model'
import { asyncHandler } from '../utils/asyncHandler'
import { Course } from '../models/course.model'



const getAllModule = asyncHandler(async (req: Request, res: Response) => {
    const data = await Module.find()
    res.status(200).json({
        success: true,
        massage: "Get Enrolment Successfully",
        data
    })
})

const createModule = asyncHandler(async (req: Request, res: Response) => {
    const module = req.body
    const data = await Module.create(module)
    if (!data) {
        res.status(404).json(
            {
                success: false,
                massage: "data not create"
            }
        )
        return
    }

    await Course.findByIdAndUpdate(
        data.course,              // course ID
        {
            $addToSet: {
                modules: data._id,    //  module ID added
            },
        }, { new: true }
    );

    res.status(200).json({
        success: true,
        massage: "Get Enrolment Successfully",
        data
    })
})


export { getAllModule, createModule }