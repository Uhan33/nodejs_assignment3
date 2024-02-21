// __tests__/unit/users.service.unit.spec.js

import { expect, jest } from '@jest/globals';
import { UsersService } from '../../../src/services/users.service.js';
import bcrypt from 'bcrypt';

// users.repository.js 에서는 아래 5개의 Method만을 사용합니다.
let mockUsersRepository = {
  signUp: jest.fn(),
  signIn: jest.fn(),
  userInfo: jest.fn(),
  updateUserInfo: jest.fn(),
  deleteUser: jest.fn(),
};

// postsService의 Repository를 Mock Service로 의존성을 주입합니다.
const usersService = new UsersService(mockUsersRepository);

describe('Users Controller Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test('signUp Method by Success', async () => {
    // Service 계증에 있는 signUp 메서드를 실행했을 떄 반환되는 데이터베이스의 데이터 형식
    const sampleSignUp = {
      userId: 1,
      email: 'email',
      password: '1234',
      name: 'name',
      age: 20,
      gender: 'male',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };
    mockUsersRepository.signUp.mockReturnValue(sampleSignUp);

    const userSignUp = await usersService.signUp(
      sampleSignUp.email,
      sampleSignUp.password,
      sampleSignUp.name,
      sampleSignUp.age,
      sampleSignUp.gender
    );

    // Service의 signUp
    expect(mockUsersRepository.signUp).toHaveBeenCalledTimes(1);

    // expect(userSignUp).toEqual({
    //   userId: sampleSignUp.userId,
    //   email: sampleSignUp.nickname,
    //   name: sampleSignUp.title,
    //   age: sampleSignUp.content,
    //   gender: sampleSignUp.gender,
    //   createdAt: sampleSignUp.createdAt,
    //   updatedAt: sampleSignUp.updatedAt,
    // });
  });

  test('signIn Method by Success', async () => {
    const sampleSignIn = {
      email: 'Email_InvalidParamsError',
      password: 'Password_InvalidParamsError',
    };

    const signInReturnValue = {
      name: 'Name_Success',
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };

    mockUsersRepository.signIn.mockReturnValue(sampleSignIn.email, sampleSignIn.password);

    // const user = await usersService.signIn(sampleSignIn);

    // expect(mockUsersRepository.signIn).toHaveBeenCalledTimes(1);
    // expect(mockUsersRepository.signIn).toHaveBeenCalledWith(
    //   signInRequestBodyParams.email,
    //   signInRequestBodyParams.password
    // );
  });

  test('UserInfo Method by Success', async () => {
    const sampleUser = {
      userId: 2,
      email: 'superadmin',
      name: '관리자',
      age: 99,
      gender: 'male',
      createdAt: '2024-02-20T10:59:32.605Z',
      updatedAt: '2024-02-20T10:59:32.605Z',
    };
    mockUsersRepository.userInfo.mockReturnValue(sampleUser);

    const user = await usersService.userInfo(sampleUser.userId);

    expect(mockUsersRepository.userInfo).toHaveBeenCalledTimes(1);
    expect(mockUsersRepository.userInfo).toHaveBeenCalledWith(sampleUser.userId);

    expect(user).toEqual({
      userId: sampleUser.userId,
      email: sampleUser.email,
      name: sampleUser.name,
      age: sampleUser.age,
      gender: sampleUser.gender,
      createdAt: sampleUser.createdAt,
      updatedAt: sampleUser.updatedAt,
    });
  });

  test('updateUserInfo Method by Success', async () => {

    // Service 계증에 있는 signUp 메서드를 실행했을 떄 반환되는 데이터베이스의 데이터 형식
    const sampleUpdateUserInfo = {
      userId: 1,
      email: 'email',
      name: 'Name_Success',
      age: 'Age_Success',
      gender: 'Gender_Success',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };
    mockUsersRepository.userInfo.mockReturnValue(sampleUpdateUserInfo);

    mockUsersRepository.updateUserInfo.mockReturnValue(sampleUpdateUserInfo);

    const user = await usersService.updateUserInfo(sampleUpdateUserInfo, sampleUpdateUserInfo.userId);

    // Service의 signUp
    // expect(mockRequest).toHaveBeenCalled();
    expect(mockUsersRepository.updateUserInfo).toHaveBeenCalledTimes(1);
    expect(mockUsersRepository.updateUserInfo).toHaveBeenCalledWith(sampleUpdateUserInfo,sampleUpdateUserInfo,sampleUpdateUserInfo.userId);

    expect(user).toEqual({
      userId: sampleUpdateUserInfo.userId,
      email: sampleUpdateUserInfo.email,
      name: sampleUpdateUserInfo.name,
      age: sampleUpdateUserInfo.age,
      gender: sampleUpdateUserInfo.gender,
      createdAt: sampleUpdateUserInfo.createdAt,
      updatedAt: sampleUpdateUserInfo.updatedAt,
    });
  });

  test('deleteUserInfo Method by Success', async () => {

    // Service 계증에 있는 signUp 메서드를 실행했을 떄 반환되는 데이터베이스의 데이터 형식
    const sampleDeleteData = {
      userId: 1,
      email: 'email',
      name: 'Name_Success',
      age: 'Age_Success',
      gender: 'Gender_Success',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };
    mockUsersRepository.userInfo.mockReturnValue(sampleDeleteData);

    mockUsersRepository.deleteUser.mockReturnValue(sampleDeleteData);

    const user = await usersService.deleteUser(sampleDeleteData.userId);

    // Service의 signUp
    expect(mockUsersRepository.deleteUser).toHaveBeenCalledTimes(1);
    expect(mockUsersRepository.deleteUser).toHaveBeenCalledWith(user.userId);

    expect(user).toEqual({
      userId: sampleDeleteData.userId,
      email: sampleDeleteData.email,
      name: sampleDeleteData.name,
      age: sampleDeleteData.age,
      gender: sampleDeleteData.gender,
    });
  });
});
