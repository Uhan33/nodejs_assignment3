import {DataSource} from 'typeorm';
import dotenv from 'dotenv';
import {users} from './entity/user.entity.js';
import {resumes} from './entity/resume.entity.js';

dotenv.config();

export const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    entities: [
        users, resumes
    ],
})

dataSource.initialize();

// export default {
//     dataSource,
// }
