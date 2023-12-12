import {Request, Response} from 'express'
import Links from '../models/Links'



export const logged= async (req: Request, res: Response)=> {
    res.redirect('/')
}



export const allArea = async(req:Request, res:Response)=> {
    let allLinks = await Links.find()
    console.log(allLinks)

    res.render('pages/list', {
        allLinks
    });

}

export const animalsArea=async(req:Request,res:Response)=> {
    const animals = 'animals'
    let allLinks = await Links.find({type:animals})
    

    res.render('pages/list', {
        allLinks
    })
}

export const landscapeArea=async(req:Request,res:Response)=> {
    const landscape = 'landscape'

    let allLinks = await Links.find({type:landscape})

    res.render('pages/list', {
        allLinks
    })
}

export const vaporwaveArea=async(req:Request,res:Response)=> {
    const vaporwave = 'vaporwave'

    let allLinks = await Links.find({type:vaporwave})

    res.render('pages/list', {
        allLinks
    })
}
