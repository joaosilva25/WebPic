import dotenv from 'dotenv';

dotenv.config()

let db= {
    db:process.env.MONGO_DB as string
}

if (process.env.NODE_ENV === 'test') {

    db= {
        db:process.env.MONGO_TEST_DB as string
    }

}

export default db;