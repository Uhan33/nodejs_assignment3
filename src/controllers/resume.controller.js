export class ResumeController {
  constructor(resumeService) {
    this.resumeService = resumeService;
  }

  makeResume = async (req, res, next) => {
    try {
      const { title, content } = req.body;
      const { userId } = req.user;

      if (!title || !content) throw new Error('필수 값이 입력되지 않았습니다.');

      const resume = await this.resumeService.makeResume(userId, title, content);

      return res.status(201).json({ data: resume });
    } catch (err) {
      next(err);
    }
  };

  findAllResumes = async (req, res, next) => {
    try {
      const { email } = req.user;

      let orderKey = req.query.orderKey ?? 'createdAt';
      let orderValue = req.query.orderValue;

      const resumes = await this.resumeService.findAllResumes(email, orderKey, orderValue);

      return res.status(200).json({ data: resumes });
    } catch (err) {
      next(err);
    }
  };

  findResume = async (req, res, next) => {
    try {
      const { resumeId } = req.params;

      if (!resumeId) throw new Error('올바르지 않은 요청입니다.');

      const { userId, email } = req.user;

      const resume = await this.resumeService.findResume(resumeId, userId, email);

      return res.status(200).json({ data: resume });
    } catch (err) {
      next(err);
    }
  };

  updateResume = async (req, res, next) => {
    try {
      const { resumeId } = req.params;
      const { userId, email } = req.user;
      const updateResume = req.body;

      if (!updateResume) throw new Error('요청 값이 존재하지 않습니다.');

      const updatedResume = await this.resumeService.updateResume(resumeId, userId, email, updateResume);

      return res.status(200).json({ data: updatedResume });
    } catch (err) {
      next(err);
    }
  };

  deleteResume = async (req, res, next) => {
    try {
      const { resumeId } = req.params;
      const { userId, email } = req.user;

      const deletedResume = await this.resumeService.deleteResume(resumeId, userId, email);

      return res.status(200).json({ data: deletedResume });
    } catch (err) {
      next(err);
    }
  };
}
