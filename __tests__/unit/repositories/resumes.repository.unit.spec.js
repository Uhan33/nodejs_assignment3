// __tests__/unit/users.service.unit.spec.js

import { expect, jest } from '@jest/globals';
import { ResumeRepository } from '../../../src/repositories/resume.repository.js';

// users.repository.js 에서는 아래 5개의 Method만을 사용합니다.
let mockPrisma = {
  resumes: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

// postsService의 Repository를 Mock Service로 의존성을 주입합니다.
const resumeRepository = new ResumeRepository(mockPrisma);

describe('Users Controller Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test('makeResume Method by Success', async () => {
    // Service 계증에 있는 signUp 메서드를 실행했을 떄 반환되는 데이터베이스의 데이터 형식

    const mockReturn = 'create String';
    mockPrisma.resumes.create.mockReturnValue(mockReturn);

    const sampleResume = {
      userId: 1,
      title: 'title',
      content: 'conent',
    };
    const resume = await resumeRepository.makeResume(sampleResume.userId, sampleResume.title, sampleResume.content);

    expect(mockPrisma.resumes.create).toHaveBeenCalledTimes(1);
    expect(mockPrisma.resumes.create).toHaveBeenCalledWith({
      data: {
        userId: sampleResume.userId,
        title: sampleResume.title,
        content: sampleResume.content,
      },
    });
  });

  test('findAllResumes Method by Success', async () => {
    const mockReturn = 'findMany String';
    mockPrisma.resumes.findMany.mockReturnValue(mockReturn);

    const allResumes = await resumeRepository.findAllResumes('superadmin', 'createdAt', 'desc');

    expect(allResumes).toBe(mockReturn);

    expect(mockPrisma.resumes.findMany).toHaveBeenCalledTimes(1);
  });

  test('findResume Method by Success', async () => {
    const mockReturn = 'findUnique String';
    mockPrisma.resumes.findUnique.mockReturnValue(mockReturn);

    const Resume = await resumeRepository.findResume(1);

    expect(mockPrisma.resumes.findUnique).toHaveBeenCalledTimes(1);
  });

  test('updateResume Method by Success', async () => {
    const mockReturn = 'update String';
    mockPrisma.resumes.update.mockReturnValue(mockReturn);

    const updateData = {
      title: 'ㅎㅇ',
      content: 'ㅎㅇ',
      status: 'APPLY',
    };

    const updatedResume = {
      resumeId: 1,
      userId: 1,
      title: updateData.title,
      content: updateData.content,
      status: updateData.status
    }

    const Resume = await resumeRepository.updateResume(1, updateData);

    expect(Resume).toEqual(mockReturn);

    expect(mockPrisma.resumes.update).toHaveBeenCalledTimes(1);
  });

  test('deleteResume Method by Success', async () => {
    const mockReturn = 'delete String';
    mockPrisma.resumes.delete.mockReturnValue(mockReturn);

    const Resume = await resumeRepository.deleteResume(1);

    expect(Resume).toBe(mockReturn)

    expect(mockPrisma.resumes.delete).toHaveBeenCalledTimes(1);
  });
});
