import redis from 'redis';

// const redisClient = redis.createClient({
//   password: 
// })

export class UsersController {
  constructor(usersService) {
    this.usersService = usersService;
  }



  signUp = async (req, res, next) => {
    try {
      const { email, password, passwordConfirm, name, age, gender } = req.body;

      if (!email || !password || !passwordConfirm || !name || !gender)
        throw new Error('필수 값이 입력되지 않았습니다.');

      if (password !== passwordConfirm) throw new Error('비밀번호가 일치하지 않습니다.');

      if (password.length < 6) throw new Error('비밀번호는 6자 이상이어야 합니다.');

      const createdUser = await this.usersService.signUp(email, password, name, age, gender);

      return res.status(201).json({ data: createdUser });
    } catch (err) {
      next(err);
    }
  };

  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if(!email || !password)
        throw new Error('필수 값이 입력되지 않았습니다.');

      const user = await this.usersService.signIn(email, password);



      res.cookie('authorization', `Bearer ${user.accessToken}`);
      res.cookie('refreshToken', `Bearer ${user.refreshToken}`);

      return res.status(200).json(`환영합니다 ${user.name}님!`);
    } catch (err) {
      next(err);
    }
  };

  userInfo = async (req, res, next) => {
    try {
      const { userId } = req.user;

      const user = await this.usersService.userInfo(userId);

      return res.status(200).json({ data: user });
    } catch (err) {
      next(err);
    }
  };

  updateUserInfo = async (req, res, next) => {
    try {
      const updateData = req.body;
      const { userId } = req.user;

      const updatedUser = await this.usersService.updateUserInfo(updateData, userId);

      return res.status(200).json({ data: updatedUser });
    } catch (err) {
      next(err);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const { userId } = req.user;

      const deletedUser = await this.usersService.deleteUser(userId);

      return res.status(200).json({ data: deletedUser });
    } catch (err) {
      next(err);
    }
  };

  refresh = async (req, res, next) => {
    try {
        const {refreshToken} = req.body;
        
        const newAccessToken = await this.usersService.refresh(refreshToken);

        res.cookie('authorization', `Bearer ${newAccessToken}`);

        return res.status(200).json({message: '토큰 재발급 완료'});
    } catch (err) {
      next(err);
    }
  };
}
