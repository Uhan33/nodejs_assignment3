import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class UsersService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  signUp = async (email, password, name, age, gender) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await this.usersRepository.signUp(email, hashedPassword, name, age, gender);

    return {
      userId: createdUser.userId,
      email: createdUser.email,
      name: createdUser.name,
      age: createdUser.age,
      gender: createdUser.gender,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    };
  };

  signIn = async (email, password) => {
    const user = await this.usersRepository.signIn(email, password);

    const accessToken = jwt.sign({ userId: user.userId }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '12h' });
    const refreshToken = jwt.sign({ userId: user.userId }, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: '7d' });

    return {
      name: user.name,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  };

  userInfo = async (userId) => {
    const user = await this.usersRepository.userInfo(userId);

    if(!user) throw new Error('존재하지 않는 이메일입니다.');

    return {
      userId: user.userId,
      email: user.email,
      name: user.name,
      age: user.age,
      gender: user.gender,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  };

  updateUserInfo = async (updateData, userId) => {
    const user = await this.usersRepository.userInfo(userId);

    if(!user) throw new Error('존재하지 않는 이메일입니다.');

    const updatedUser = await this.usersRepository.updateUserInfo(user, updateData, userId);

    return {
      userId: updatedUser.userId,
      email: updatedUser.email,
      name: updatedUser.name,
      age: updatedUser.age,
      gender: updatedUser.gender,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };
  };

  deleteUser = async (userId) => {
    const user = await this.usersRepository.userInfo(userId);
    
    if(!user) throw new Error('존재하지 않는 이메일입니다.');

    const deletedUser = await this.usersRepository.deleteUser(userId);

    return {
      userId: deletedUser.userId,
      email: deletedUser.email,
      name: deletedUser.name,
      age: deletedUser.age,
      gender: deletedUser.gender,
    };
  };

  refresh = async (refreshToken) => {
    const token = this.jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
    if (!token) {
      throw new Error('refreshToken이 없습니다.');
    }

    const user = await this.usersRepository.refresh(token.userId);
    if (!user) throw new Error('유저 정보가 없습니다.');

    const newAccessToken = this.jwt.sign({ userId: user.userId }, process.env.ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: '12h',
    });

    return newAccessToken;
  };
}
