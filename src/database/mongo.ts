import { connect } from 'mongoose'
import dotenv from  'dotenv'
import db from './database'

dotenv.config()


export const mongoConnect= async () => {
    try {
        console.log('Conectando ao BD')
        await connect(db.db)
        console.log('BD connected')
    }

    catch (err) {
        console.log('Erro na conexão')
    }
}