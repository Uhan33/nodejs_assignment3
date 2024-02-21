import { EntitySchema } from "typeorm"

export const users = new EntitySchema({
    name: "users", // Will use table name `category` as default behaviour.
    tableName: "Users", // Optional: Provide `tableName` property to override the default behaviour for table name.
    columns: {
        userId: {
            primary: true,
            type: "int",
            generated: true,
        },
        clientId: {
            type: "varchar",
        },
        email: {
            type: "varchar",
        },
        password: {
            type: "varchar",
        },
        name: {
            type: "varchar",
        },
        age: {
            type: "int",
        },
        gender: {
            type: "varchar",
        },
        createdAt: {
            type: "datetime",
        },
        updatedAt: {
            type: "datetime",
        },
    },
})