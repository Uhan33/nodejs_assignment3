import { EntitySchema } from "typeorm"

export const resumes = new EntitySchema({
    name: "resumes", // Will use table name `category` as default behaviour.
    tableName: "Resumes", // Optional: Provide `tableName` property to override the default behaviour for table name.
    columns: {
        resumeId: {
            primary: true,
            type: "int",
            generated: true,
        },
        userId: {
            type: "int",
        },
        title: {
            type: "varchar",
        },
        content: {
            type: "varchar",
        },
        status: {
            type: "varchar",
        },
        createdAt: {
            type: "datetime",
        },
        updatedAt: {
            type: "datetime",
        },
    },
    relations: {
        '': {
            target: 'users',
            type: 'many-to-one',
            joinTable: true,
            joinColume: {name: 'userId'},
            cascade: true,
        }
    }
})