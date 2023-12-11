import {Schema,model,connection} from 'mongoose'


type LinkType = {
    type: string,
    href:string
}

export const schema = new Schema<LinkType>({
    type:{type:String,required:true},
    href:{type:String,required:true}
});


const linksModel:string= 'links';


export default (connection && connection.models[linksModel])?? model<LinkType>(linksModel,schema)
