import {Request, Response} from 'express'



export const logged= async (req: Request, res: Response)=> {
    res.redirect('/')
}



export const allArea = async(req:Request, res:Response)=> {
    let allLinks = await homeService.findAllTypes()

    res.render('pages/list', {
        allLinks
    });

}

export const animalsArea=async(req:Request,res:Response)=> {
    const animals = 'animals'
    let allLinks = await homeService.findAnimals(animals)

    res.render('pages/list', {
        allLinks
    })
}

export const landscapeArea=async(req:Request,res:Response)=> {
    const landscape = 'landscape'

    let allLinks = await homeService.findLandscape(landscape)

    res.render('pages/list', {
        allLinks
    })
}

export const vaporwaveArea=async(req:Request,res:Response)=> {
    const vaporwave = 'vaporwave'

    let allLinks = await homeService.findVaporwave(vaporwave)

    res.render('pages/list', {
        allLinks
    })
}
