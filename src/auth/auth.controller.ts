import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {
        // Essa rota inicia o fluxo de autenticação com o Google
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
        console.log('Usuário autenticado:', req.user);
        return {
            message: 'Login com Google bem-sucedido',
            user: req.user,
            token: req.user.token,
        };
    }


    // Rota para login com Facebook
    @Get('facebook')
    @UseGuards(AuthGuard('facebook'))
    async facebookAuth(@Req() req) { }

    // Callback do Facebook
    @Get('facebook/callback')
    @UseGuards(AuthGuard('facebook'))
    facebookAuthRedirect(@Req() req) {
        return {
            message: 'Login com Facebook bem-sucedido',
            user: req.user,
        };
    }
}
