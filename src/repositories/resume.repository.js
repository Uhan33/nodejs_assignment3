export class ResumeRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  makeResume = async (userId, title, content) => {
    const resume = await this.prisma.resumes.create({
      data: {
        userId: +userId,
        title: title,
        content: content,
      },
    });

    return resume;
  };

  findAllResumes = async (email, orderKey, orderValue) => {
    const resumes = await this.prisma.resumes.findMany({
      select: {
        resumeId: true,
        title: true,
        user: {
          select: {
            name: true,
          },
        },
        status: true,
        createdAt: true,
      },
      orderBy: {
        [orderKey]: orderValue,
      },
    });

    return resumes;
  };

  findResume = async (resumeId) => {
    const resume = await this.prisma.resumes.findUnique({
      where: { resumeId: resumeId },
    });

    return resume;
  };

  updateResume = async (resumeId, updateResume) => {
    const resume = await this.prisma.resumes.update({
      where: { resumeId: resumeId },
      data: {
        ...updateResume,
      },
    });

    return resume;
  };

  deleteResume = async (resumeId) => {
    const resume = await this.prisma.resumes.delete({
      where: { resumeId: resumeId },
    });

    return resume;
  };
}
