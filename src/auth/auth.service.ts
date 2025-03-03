import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private jwtService: JwtService, // <-- Adicionando JWT
    ) { }

    async validateUser(profile: any): Promise<{ user: UserEntity, token: string }> {
        let user = await this.userRepository.findOne({ where: { email: profile.email } });

        if (!user) {
            user = this.userRepository.create({
                name: profile.name,
                password: 'n/a',
                firstname: profile.given_name || profile.first_name,
                lastname: profile.family_name || profile.last_name,
                email: profile.email,
                profileImage: profile.picture,
                loginWith: profile.provider,
                isVerified: true
            });

            console.log('Salvando usuário:', user); // <-- Verifica se os dados estão corretos

            try {
                await this.userRepository.save(user);
                console.log('Usuário salvo com sucesso!'); // <-- Confirmação do salvamento
                // Criar um token JWT
                const payload = { sub: user.id, email: user.email };
                const token = this.jwtService.sign(payload);

                return { user, token };
            } catch (error) {
                console.error('Erro ao salvar usuário:', error);
            }
        } else {
            console.log('Usuário já existe no banco de dados.');
            const payload = { sub: user.id, email: user.email };
            const token = this.jwtService.sign(payload);
            return { user, token };
        }

    }

}
