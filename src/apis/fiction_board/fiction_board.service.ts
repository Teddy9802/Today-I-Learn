import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { FictionBoard } from './entities/fiction_board.entity';

@Injectable()
export class FictionBoardService {
  constructor(
    @InjectRepository(FictionBoard)
    private readonly fictionBoardRepository: Repository<FictionBoard>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneById({ fictionBoardId }) {
    const fictionBoardUser = await this.fictionBoardRepository.findOne({
      where: { id: fictionBoardId },
      relations: ['user'],
    });
    return fictionBoardUser;
  }

  findAllByUserId({ userId }) {
    return this.fictionBoardRepository.find({
      where: { user: { id: userId } },
    });
  }

  async findByMyUserId({ userId, fictionBoardId }) {
    const result = await this.fictionBoardRepository.findOne({
      where: {
        id: fictionBoardId,
        user: { id: userId },
      },
      relations: ['user'],
    });
    return result;
  }

  findAllByMyUserId({ userId, page }) {
    return this.fictionBoardRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
      take: 5,
      skip: page ? (page - 1) * 5 : 0,
    });
  }

  findAll({ page }) {
    return this.fictionBoardRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
      take: 10,
      skip: page ? (page - 1) * 10 : 0,
    });
  }

  findAllWithLikeCount({ page }) {
    return this.fictionBoardRepository.find({
      relations: ['user'],
      order: { like: 'DESC' },
      take: 10,
      skip: page ? (page - 1) * 10 : 0,
    });
  }

  async searchAllBoard({ word, page }) {
    const findFictionBoard = await this.fictionBoardRepository.find({
      where: { title: Like(`%${word}%`) },
      relations: ['user'],
      order: { createdAt: 'DESC' },
      take: 10,
      skip: page ? (page - 1) * 10 : 0,
    });
    return findFictionBoard;
  }

  async create({ userId, createFictionBoardInput }) {
    const User = await this.userRepository.findOne({
      where: { id: userId },
    });

    const result = await this.fictionBoardRepository.save({
      ...createFictionBoardInput,
      user: { ...User },
    });
    return result;
  }

  async update({ fictionBoardId, userId, updateFictionBoardInput }) {
    const findUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    const findFictionBoard = await this.fictionBoardRepository.findOne({
      where: { id: fictionBoardId },
      relations: ['user'],
    });

    if (userId !== findFictionBoard.user.id) {
      throw new ConflictException('수정 권한이 없습니다.');
    }

    return await this.fictionBoardRepository.save({
      ...findFictionBoard,
      ...updateFictionBoardInput,
      user: findUser,
    });
  }

  async delete({ fictionBoardId, userId }) {
    const FictionBoard = await this.fictionBoardRepository.findOne({
      where: { id: fictionBoardId },
      relations: ['user'],
    });

    if (userId !== FictionBoard.user.id) {
      throw new ConflictException('삭제 권한이 없습니다.');
    }

    const result = await this.fictionBoardRepository.delete({
      id: fictionBoardId,
      user: { id: userId },
    });
    return result.affected ? true : false;
  }
}
