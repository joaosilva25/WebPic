import { Schema,model, connection } from 'mongoose'


type UserType = {
    username: string,
    email: string,
    password: string,
    code:string
}


export const schema= new Schema<UserType>({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    code:String
})

const modelName:string = 'users';


export default (connection && connection.models[modelName])?? model<UserType>(modelName,schema,'users')


