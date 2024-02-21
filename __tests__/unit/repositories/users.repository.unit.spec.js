// __tests__/unit/users.repository.unit.spec.js

import { expect, jest } from '@jest/globals';
import { UsersRepository } from '../../../src/repositories/users.repository.js';
import bcrypt from 'bcrypt';

// users.repository.js 에서는 아래 5개의 Method만을 사용합니다.
let mockPrisma = {
  users: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    $transaction: jest.fn(),
  },
};

let usersRepository = new UsersRepository(mockPrisma);

describe('Users Repository Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test('signUp Method by Success', async () => {
    const mockReturn = 'create String';
    mockPrisma.users.create.mockReturnValue(mockReturn);

    const signUpParams = {
      email: 'signUpParams',
      password: 'signUpParams',
      name: 'signUpParams',
      age: 'signUpParams',
      gender: 'signUpParams',
    };

    const user = await usersRepository.signUp(
      signUpParams.email,
      signUpParams.password,
      signUpParams.name,
      signUpParams.age,
      signUpParams.gender
    );

    expect(user).toEqual(mockReturn);

    expect(mockPrisma.users.create).toHaveBeenCalledTimes(1);

    expect(mockPrisma.users.create).toHaveBeenCalledWith({
      data: {
        email: signUpParams.email,
        password: signUpParams.password,
        name: signUpParams.name,
        age: signUpParams.age,
        gender: signUpParams.gender,
      },
    });
  });

  test('signIn Method by Success', async () => {
    const mockReturn = 'findUnique String';
    mockPrisma.users.findUnique.mockReturnValue(mockReturn);

    const signInParams = {
      email: 'signUpParams',
      password: 'signUpParams',
    };

    const user = await usersRepository.signIn(signInParams.email, signInParams.password);

    expect(user).toBe(mockReturn);

    expect(mockPrisma.users.findUnique).toHaveBeenCalledTimes(1);
    expect(mockPrisma.users.findUnique).toHaveBeenCalledWith({
      data: {
        email: signInParams.email,
        password: signInParams.password
      },
    });
  });

  test('userInfo Method by Success', async () => {
    const mockReturn = 'findUnique String';
    mockPrisma.users.findUnique.mockReturnValue(mockReturn);

    const user = await usersRepository.signIn();

    expect(user).toBe(mockReturn);

    expect(usersRepository.prisma.users.findUnique).toHaveBeenCalledTimes(1);
  });

  test('updateUserInfo Method by Success', async () => {
    const mockReturn = 'create String';
    mockPrisma.users.create.mockReturnValue(mockReturn);

    const userData = {
      userId: 1,
      email: 'signUpParams',
      password: 'signUpParams',
      name: 'signUpParams',
      age: 'signUpParams',
      gender: 'signUpParams',
    }

    const updateData = {
      name: 'signUpParams',
      age: 'signUpParams',
      gender: 'signUpParams',
    };

    const user = await usersRepository.updateUserInfo(
      userData.userId,
      userData.email,
      userData.password,
      userData.name,
      userData.age,
      userData.gender
    );

    expect(user).toEqual(mockReturn);

    // expect(mockPrisma.users.$transaction).toHaveBeenCalledTimes(1);

    // expect(mockPrisma.users.$transaction).toHaveBeenCalledWith({
    //   data: {
    //     email: signUpParams.email,
    //     password: signUpParams.password,
    //     name: signUpParams.name,
    //     age: signUpParams.age,
    //     gender: signUpParams.gender,
    //   },
    // });
  });

  test('deleteUserInfo Method by Success', async () => {
    // Service 계증에 있는 signUp 메서드를 실행했을 떄 반환되는 데이터베이스의 데이터 형식

    const mockReturn = 'delete String';
    mockPrisma.users.delete.mockReturnValue(mockReturn);

    const sampleDeleteData = {
      userId: 1
    };

    const user = await usersRepository.deleteUser(sampleDeleteData.userId);

    expect(user).toBe(mockReturn);

    expect(mockPrisma.users.delete).toHaveBeenCalledTimes(1);
  });
});
