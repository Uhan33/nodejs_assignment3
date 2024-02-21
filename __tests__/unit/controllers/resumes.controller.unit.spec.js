// __tests__/unit/posts.controller.unit.spec.js

import { expect, jest } from '@jest/globals';
import { ResumeController } from '../../../src/controllers/resume.controller.js';

// posts.service.js 에서는 아래 5개의 Method만을 사용합니다.
const mockResumesService = {
  makeResume: jest.fn(),
  findAllResumes: jest.fn(),
  findResume: jest.fn(),
  updateResume: jest.fn(),
  deleteResume: jest.fn(),
};

const mockRequest = {
  body: jest.fn(),
  params: jest.fn(),
  user: jest.fn(),
  query: jest.fn(),
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

const mockNext = jest.fn();

// postsController의 Service를 Mock Service로 의존성을 주입합니다.
const resumesController = new ResumeController(mockResumesService);

describe('Posts Controller Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.

    // mockResponse.status의 경우 메서드 체이닝으로 인해 반환값이 Response(자신: this)로 설정되어야합니다.
    mockResponse.status.mockReturnValue(mockResponse);
  });

  test('createPost Method by Success', async () => {
    const createResumeRequestBodyParams = {
      title: 'Nickname_Success',
      content: 'Password_Success',
    };

    const user = { userId: 1 };

    mockRequest.body = createResumeRequestBodyParams;
    mockRequest.user = user;

    // Service 계증에 있는 createPost 메서드를 실행했을 떄 반환되는 데이터베이스의 데이터 형식
    const createResumeReturnValue = {
      resumeId: 1,
      userId: user.userId,
      ...createResumeRequestBodyParams,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };
    mockResumesService.makeResume.mockReturnValue(createResumeReturnValue);

    const createResume = await resumesController.makeResume(mockRequest, mockResponse, mockNext);

    // Service의 createPost
    expect(mockResumesService.makeResume).toHaveBeenCalledTimes(1);
    expect(mockResumesService.makeResume).toHaveBeenCalledWith(
      1,
      createResumeRequestBodyParams.title,
      createResumeRequestBodyParams.content
    );

    // Response status
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);

    // Response json
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: createResumeReturnValue,
    });
  });

  test('findAllResumes Method by Success', async () => {
    const sampleResumes = [
      {
        resumeId: 2,
        userId: 2,
        title: 'Title_2',
        content: 'Content_2',
        createdAt: new Date('07 October 2011 15:50 UTC'),
        updatedAt: new Date('07 October 2011 15:50 UTC'),
      },
      {
        resumeId: 1,
        userId: 1,
        title: 'Title_1',
        content: 'Content_1',
        createdAt: new Date('06 October 2011 15:50 UTC'),
        updatedAt: new Date('06 October 2011 15:50 UTC'),
      },
    ];

    mockRequest.user = { email: 'email' };
    mockRequest.query = { orderKey: 'createdAt', orderValue: 'ASC' };

    mockResumesService.findAllResumes.mockReturnValue(sampleResumes);

    await resumesController.findAllResumes(mockRequest, mockResponse, mockNext);

    expect(mockResumesService.findAllResumes).toHaveBeenCalledTimes(1);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: sampleResumes,
    });
  });

  test('findResume Method by Invalid Params Error', async () => {
    const sampleResumes = {
      resumeId: 1,
      userId: 1,
      title: 'Title_1',
      content: 'Content_1',
      createdAt: new Date('06 October 2011 15:50 UTC'),
      updatedAt: new Date('06 October 2011 15:50 UTC'),
    };

    mockRequest.user = { userId: 1 ,email: 'email' };
    mockRequest.params = {resumeId : 1};

    mockResumesService.findResume.mockReturnValue(sampleResumes);

    await resumesController.findResume(mockRequest, mockResponse, mockNext);

    expect(mockResumesService.findResume).toHaveBeenCalledTimes(1);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: sampleResumes,
    });
  });

  test('updateResume Method by Invalid Params Error', async () => {
    const sampleResumes = {
      resumeId: 1,
      userId: 1,
      title: 'Title_1',
      content: 'Content_1',
      createdAt: new Date('06 October 2011 15:50 UTC'),
      updatedAt: new Date('06 October 2011 15:50 UTC'),
    };

    const updateResume = {
        title: 'title',
        content: 'content',
        status: 'APPLY'
    }

    mockRequest.user = { userId: 1 ,email: 'email' };
    mockRequest.params = {resumeId : 1};
    mockRequest.body = updateResume;

    mockResumesService.updateResume.mockReturnValue(sampleResumes);

    await resumesController.updateResume(mockRequest, mockResponse, mockNext);

    expect(mockResumesService.updateResume).toHaveBeenCalledTimes(1);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: sampleResumes,
    });
  });

  test('deleteResume Method by Invalid Params Error', async () => {
    const sampleResumes = {
      resumeId: 1,
      userId: 1,
      title: 'Title_1',
      content: 'Content_1',
      createdAt: new Date('06 October 2011 15:50 UTC'),
      updatedAt: new Date('06 October 2011 15:50 UTC'),
    };

    mockRequest.user = { userId: 1 ,email: 'email' };
    mockRequest.params = {resumeId : 1};

    mockResumesService.deleteResume.mockReturnValue(sampleResumes);

    await resumesController.deleteResume(mockRequest, mockResponse, mockNext);

    expect(mockResumesService.deleteResume).toHaveBeenCalledTimes(1);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: sampleResumes,
    });
  });
});
