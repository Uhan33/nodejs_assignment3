export class ResumeService {
  constructor(resumeRepository) {
    this.resumeRepository = resumeRepository;
  }

  makeResume = async (userId, title, content) => {
    const resume = await this.resumeRepository.makeResume(userId, title, content);

    return {
      resumeId: resume.resumeId,
      title: resume.title,
      content: resume.content,
      status: resume.status,
      createdAt: resume.createdAt,
    };
  };

  findAllResumes = async (email, orderKey, orderValue) => {
    if (email !== 'superadmin') throw new Error('관리자 전용 접근구역 입니다.');

    if (orderKey !== 'userId' && orderKey !== 'status') orderKey = 'createdAt';

    if (!orderValue) orderValue = 'desc';
    else orderValue.toUpperCase() !== 'ASC' ? (orderValue = 'desc') : (orderValue = 'asc');

    const resumes = await this.resumeRepository.findAllResumes(email, orderKey, orderValue);

    return resumes.map((resume) => {
      return {
        resumeId: resume.resumeId,
        title: resume.title,
        name: resume.name,
        status: resume.status,
        createdAt: resume.createdAt,
      };
    });
  };

  findResume = async (resumeId, userId, email) => {
    const resume = await this.resumeRepository.findResume(resumeId);

    if (!resume) throw new Error('존재하지 않는 이력서 입니다.');

    if (email !== 'superadmin') {
      if (resume.userId !== userId) throw new Error('본인의 이력서만 열람할 수 있습니다.');
    }

    return {
      resumeId: resume.resumeId,
      title: resume.title,
      content: resume.content,
      name: resume.name,
      status: resume.status,
      createdAt: resume.createdAt,
    };
  };

  updateResume = async (resumeId, userId, email, updateResume) => {
    const stat = ['APPLY', 'DROP', 'PASS', 'INTERVIEW1', 'INTERVIEW2', 'FINAL_PASS'];
    let check = false;

    const resume = await this.resumeRepository.findResume(resumeId);
    if (!resume) throw new Error('존재하지 않는 이력서 입니다.');

    if (email !== 'superadmin') {
      if (resume.userId !== userId) throw new Error('본인의 이력서만 열람할 수 있습니다.');
    }

    if (updateResume.status) {
      for (let i of stat) {
        if (updateResume.status === i) {
          check = true;
          break;
        }
      }

      if (!check) throw new Error('이력서의 상태가 올바르지 않습니다.');
    }

    const updatedResume = await this.resumeRepository.updateResume(resumeId, updateResume);

    return {
      resumeId: updatedResume.resumeId,
      title: updatedResume.title,
      content: updatedResume.content,
      name: updatedResume.name,
      status: updatedResume.status,
      createdAt: updatedResume.createdAt,
    };
  };

  deleteResume = async (resumeId, userId, email) => {
    const resume = await this.resumeRepository.findResume(resumeId);
    if (!resume) throw new Error('존재하지 않는 이력서 입니다.');

    if (email !== 'superadmin') {
      if (resume.userId !== userId) throw new Error('본인의 이력서만 열람할 수 있습니다.');
    }

    const deletedResume = await this.resumeRepository.deleteResume(resumeId);

    return {
      resumeId: deletedResume.resumeId,
      title: deletedResume.title,
      content: deletedResume.content,
      name: deletedResume.name,
      status: deletedResume.status,
      createdAt: deletedResume.createdAt,
    };
  };
}
