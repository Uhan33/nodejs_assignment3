import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

export class UsersRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    signUp = async (email, password, name, age, gender) => {
        const createdUser = await this.prisma.users.create({
            data: {
                email,
                password,
                name,
                age,
                gender
            }
        });

        return createdUser;
    }

    signIn = async (email, password) => {
        const user = await this.prisma.users.findUnique({
            where: {email},
        });

        if(!user) throw new Error('존재하지 않는 이메일입니다.');

        if(!(await bcrypt.compare(password, user.password)))
            throw new Error('비밀번호가 일치하지 않습니다.');

        return user;
    }

    userInfo = async (userId) => {
        const user = await this.prisma.users.findUnique({
            where: {userId: +userId},
        });

        return user;
    }

    updateUserInfo = async (user, updateData, userId) => {
        let updatedUser;

        await this.prisma.$transaction(async (tx) => {
            updatedUser = await tx.users.update({
                where: {userId: +userId},
                data: {
                    ...updateData,
                },
            });

            for (let key in updateData) {
                if (user[key] !== updateData[key]) {
                  await tx.userHistories.create(
                    {
                      data: {
                        userId: +userId,
                        changedField: key,
                        oldValue: String(user[key]),
                        newValue: String(updateData[key]),
                      },
                    },
                    {
                      isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted,
                    }
                  );
                }
              }
        });

        return updatedUser;
    }

    deleteUser = async (userId) => {
        const deletedUser = await this.prisma.users.delete({
            where: {userId: +userId}
        });

        return deletedUser;
    }
}