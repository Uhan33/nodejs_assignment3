// __tests__/unit/users.service.unit.spec.js

import { expect, jest } from '@jest/globals';
import { ResumeService } from '../../../src/services/resume.service.js';

// users.repository.js 에서는 아래 5개의 Method만을 사용합니다.
let mockResumesRepository = {
  makeResume: jest.fn(),
  findAllResumes: jest.fn(),
  findResume: jest.fn(),
  updateResume: jest.fn(),
  deleteResume: jest.fn(),
};

// postsService의 Repository를 Mock Service로 의존성을 주입합니다.
const resumeService = new ResumeService(mockResumesRepository);

describe('Users Controller Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test('makeResume Method by Success', async () => {
    // Service 계증에 있는 signUp 메서드를 실행했을 떄 반환되는 데이터베이스의 데이터 형식
    const sampleResume = {
      userId: 1,
      resumeId: 1,
      title: 'title',
      content: 'conent',
      status: 'APPLY',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };
    mockResumesRepository.makeResume.mockReturnValue(sampleResume);

    const userSignUp = await resumeService.makeResume(sampleResume.userId, sampleResume.title, sampleResume.content);

    expect(mockResumesRepository.makeResume).toHaveBeenCalledTimes(1);
    expect(mockResumesRepository.makeResume).toHaveBeenCalledWith(
      sampleResume.userId,
      sampleResume.title,
      sampleResume.content
    );
  });

  test('findAllResumes Method by Success', async () => {
    const sampleResumes = [
      {
        resumeId: 2,
        title: '안녕',
        name: '관리자',
        status: 'APPLY',
        createdAt: '2023-08-25T03:43:20.532Z',
      },
      {
        resumeId: 1,
        title: '안녕',
        name: '관리자',
        status: 'APPLY',
        createdAt: '2023-07-25T03:43:20.532Z',
      },
    ];

    mockResumesRepository.findAllResumes.mockReturnValue(sampleResumes);

    const allResumes = await resumeService.findAllResumes('superadmin', 'createdAt', 'desc');

    expect(mockResumesRepository.findAllResumes).toHaveBeenCalledTimes(1);
    expect(mockResumesRepository.findAllResumes).toHaveBeenCalledWith('superadmin', 'createdAt', 'desc');
  });

  test('findResume Method by Success', async () => {
    const sampleResumes = 
      {
        resumeId: 2,
        title: '안녕',
        name: '관리자',
        status: 'APPLY',
        createdAt: '2023-08-25T03:43:20.532Z',
      };

    mockResumesRepository.findResume.mockReturnValue(sampleResumes);

    const Resume = await resumeService.findResume(sampleResumes.resumeId, 2, 'superadmin');

    expect(mockResumesRepository.findResume).toHaveBeenCalledTimes(1);
    expect(mockResumesRepository.findResume).toHaveBeenCalledWith(sampleResumes.resumeId);
  });

  test('updateResume Method by Success', async () => {
    const sampleResumes = 
      {
        resumeId: 2,
        title: 'ㅎㅇ',
        content: 'ㅎㅇ',
        name: '관리자',
        status: 'APPLY',
        createdAt: '2023-08-25T03:43:20.532Z',
      };

    mockResumesRepository.findResume.mockReturnValue(sampleResumes);
    mockResumesRepository.updateResume.mockReturnValue(sampleResumes);

    const updateData = {
      title: 'ㅎㅇ',
      content: 'ㅎㅇ',
      status: 'APPLY',
    }

    const stat = ['APPLY', 'DROP', 'PASS', 'INTERVIEW1', 'INTERVIEW2', 'FINAL_PASS'];

    const Resume = await resumeService.updateResume(sampleResumes.resumeId, 2, 'superadmin', updateData);

    // expect(updateData.status).toEqual(
    //   stat.forEach(e => {
    //     if(e === updateData.status)
    //       return e;
    //   })
    // );

    expect(mockResumesRepository.findResume).toHaveBeenCalledTimes(1);
    expect(mockResumesRepository.findResume).toHaveBeenCalledWith(sampleResumes.resumeId);

    expect(mockResumesRepository.updateResume).toHaveBeenCalledTimes(1);
    expect(mockResumesRepository.updateResume).toHaveBeenCalledWith(sampleResumes.resumeId, updateData);
  });

  test('deleteResume Method by Success', async () => {
    // Service 계증에 있는 signUp 메서드를 실행했을 떄 반환되는 데이터베이스의 데이터 형식
    const sampleDeleteData = {
      resumeId: 2,
      title: 'ㅎㅇ',
      content: 'ㅎㅇ',
      name: '관리자',
      status: 'APPLY',
      createdAt: '2023-08-25T03:43:20.532Z',
    };
    mockResumesRepository.findResume.mockReturnValue(sampleDeleteData);

    mockResumesRepository.deleteResume.mockReturnValue(sampleDeleteData);

    const resume = await resumeService.deleteResume(sampleDeleteData.resumeId, 2, 'superadmin');

    // Service의 signUp
    expect(mockResumesRepository.deleteResume).toHaveBeenCalledTimes(1);
    expect(mockResumesRepository.deleteResume).toHaveBeenCalledWith(sampleDeleteData.resumeId);

    expect(resume).toEqual({
      resumeId: sampleDeleteData.resumeId,
      title: sampleDeleteData.title,
      content: sampleDeleteData.content,
      name: sampleDeleteData.name,
      status: sampleDeleteData.status,
      createdAt: sampleDeleteData.createdAt,
    });
  });
});
