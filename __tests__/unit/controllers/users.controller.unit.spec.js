// __tests__/unit/posts.controller.unit.spec.js

import { expect, jest } from '@jest/globals';
import { UsersController } from '../../../src/controllers/users.controller.js';

// posts.service.js 에서는 아래 5개의 Method만을 사용합니다.
const mockUsersService = {
  signUp: jest.fn(),
  signIn: jest.fn(),
  userInfo: jest.fn(),
  updateUserInfo: jest.fn(),
  deleteUser: jest.fn(),
  refresh: jest.fn(),
};

const mockRequest = {
  body: jest.fn(),
  user: jest.fn(),
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
  cookie: jest.fn()
};

const mockNext = jest.fn();

// postsController의 Service를 Mock Service로 의존성을 주입합니다.
const usersController = new UsersController(mockUsersService);

describe('Users Controller Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.

    // mockResponse.status의 경우 메서드 체이닝으로 인해 반환값이 Response(자신: this)로 설정되어야합니다.
    mockResponse.status.mockReturnValue(mockResponse);
  });

  test('signUp Method by Success', async () => {
    const signUpRequestBodyParams = {
      email: 'email_Success',
      password: 'Password_Success',
      passwordConfirm: 'Password_Success',
      name: 'Name_Success',
      age: 'Age_Success',
      gender: 'Gender_Success',
    };

    mockRequest.body = signUpRequestBodyParams;

    // Service 계증에 있는 signUp 메서드를 실행했을 떄 반환되는 데이터베이스의 데이터 형식
    const signUpReturnValue = {
      postId: 1,
      email: 'email_Success',
      name: 'Name_Success',
      age: 'Age_Success',
      gender: 'Gender_Success',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };
    mockUsersService.signUp.mockReturnValue(signUpReturnValue);

    await usersController.signUp(mockRequest, mockResponse, mockNext);

    // Service의 signUp
    expect(mockUsersService.signUp).toHaveBeenCalledTimes(1);
    expect(mockUsersService.signUp).toHaveBeenCalledWith(
      signUpRequestBodyParams.email,
      signUpRequestBodyParams.password,
      signUpRequestBodyParams.name,
      signUpRequestBodyParams.age,
      signUpRequestBodyParams.gender
    );

    // Response status
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);

    // Response json
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: signUpReturnValue,
    });
  });

  test('signIn Method by Success', async () => {
    const signInRequestBodyParams = {
      email: 'Email_InvalidParamsError',
      password: 'Password_InvalidParamsError',
    };
    mockRequest.body = signInRequestBodyParams;

    const signInReturnValue = {
      name: 'Name_Success',
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };

    mockUsersService.signIn.mockReturnValue(signInReturnValue);

    await usersController.signIn(mockRequest, mockResponse, mockNext);

    expect(mockUsersService.signIn).toHaveBeenCalledTimes(1);
    expect(mockUsersService.signIn).toHaveBeenCalledWith(
      signInRequestBodyParams.email,
      signInRequestBodyParams.password
    );

    expect(mockResponse.cookie).toHaveBeenCalledTimes(2);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith(`환영합니다 ${signInReturnValue.name}님!`);
  });

  test('UserInfo Method by Success', async () => {
    const sampleUser = [
      {
        userId: 2,
        email: 'superadmin',
        name: '관리자',
        age: 99,
        gender: 'male',
        createdAt: '2024-02-20T10:59:32.605Z',
        updatedAt: '2024-02-20T10:59:32.605Z',
      },
    ];
    mockUsersService.userInfo.mockReturnValue(sampleUser);

    await usersController.userInfo(mockRequest, mockResponse, mockNext);

    expect(mockUsersService.userInfo).toHaveBeenCalledTimes(1);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: sampleUser,
    });
  });

  test('updateUserInfo Method by Success', async () => {
    const updateUserInfoRequestBodyParams = { name: 'Name_Success', age: 'Age_Success', gender: 'Gender_Success' }
    const user = {userId : 1, email: "email"}

    mockRequest.body = updateUserInfoRequestBodyParams;
    mockRequest.user = user;

    // Service 계증에 있는 signUp 메서드를 실행했을 떄 반환되는 데이터베이스의 데이터 형식
    const updateUserInfoReturnValue = {
      userId: 1,
      email: 'email',
      name: 'Name_Success',
      age: 'Age_Success',
      gender: 'Gender_Success',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };
    mockUsersService.updateUserInfo.mockReturnValue(updateUserInfoReturnValue);

    await usersController.updateUserInfo(mockRequest, mockResponse, mockNext);

    // Service의 signUp
    // expect(mockRequest).toHaveBeenCalled();
    expect(mockUsersService.updateUserInfo).toHaveBeenCalledTimes(1);
    expect(mockUsersService.updateUserInfo).toHaveBeenCalledWith(
      updateUserInfoRequestBodyParams,
      user.userId
    );

    // Response status
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    // Response json
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: updateUserInfoReturnValue,
    });
  });

  test('deleteUserInfo Method by Success', async () => {
    const user = {userId : 1, email: "email"}

    mockRequest.user = user;

    // Service 계증에 있는 signUp 메서드를 실행했을 떄 반환되는 데이터베이스의 데이터 형식
    const deleteUserInfoReturnValue = {
      userId: 1,
      email: 'email',
      name: 'Name_Success',
      age: 'Age_Success',
      gender: 'Gender_Success',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };
    mockUsersService.deleteUser.mockReturnValue(deleteUserInfoReturnValue);

    await usersController.deleteUser(mockRequest, mockResponse, mockNext);

    // Service의 signUp
    expect(mockUsersService.deleteUser).toHaveBeenCalledTimes(1);
    expect(mockUsersService.deleteUser).toHaveBeenCalledWith(
      user.userId
    );

    // Response status
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    // Response json
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: deleteUserInfoReturnValue,
    });
  });

  test('refresh Method by Success', async () => {
    const refreshRequestBodyParams = { refreshToken: 'token',};

    mockRequest.body = refreshRequestBodyParams;

    // Service 계증에 있는 signUp 메서드를 실행했을 떄 반환되는 데이터베이스의 데이터 형식
    const refreshInfoReturnValue = {
      newAccessToken: "newToken"
    };
    mockUsersService.refresh.mockReturnValue(refreshInfoReturnValue);

    await usersController.refresh(mockRequest, mockResponse, mockNext);

    // Service의 signUp
    expect(mockUsersService.refresh).toHaveBeenCalledTimes(1);
    expect(mockUsersService.refresh).toHaveBeenCalledWith(
      refreshRequestBodyParams.refreshToken
    );

    expect(mockResponse.cookie).toHaveBeenCalledTimes(1);

    // Response status
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    // Response json
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: '토큰 재발급 완료'
    });
  });
});
