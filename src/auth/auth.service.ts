import { Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { compareSync } from 'bcrypt'

@Injectable()
export class AuthService {

  constructor (
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ){}

  async login(email: string, password: string ) {
    let user = await this.userRepository.findOne({ where: {email: email},  select: ["id", "name", "email", "password"]})
    if (user) {
      let result = compareSync(password, user.password)
      if (result) {
        let token = this.genToken(user.id)
        let username = user.name

        return {token, username}
      } else {
        throw new HttpException("Senha incorreta", 401)
      }      
    } else {
      throw new HttpException("Usuário não encontrado", 403)
    }
  }

  genToken(payload) {
    return this.jwtService.sign({payload})
  }

}
