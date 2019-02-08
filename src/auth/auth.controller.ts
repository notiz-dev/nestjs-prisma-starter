import { Controller, Get, UseGuards, Req, Res, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleLogin() {
        // initiates the Google OAuth2 login flow
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleLoginCallback(@Req() req, @Res() res) {
        const token = req.user.token;
        if (token) {
            res.redirect('http://localhost:4200/login/succes/' + token);
        } else {
            res.redirect('http://localhost:4200/login/failure');
        }
    }

    @Get('app/:token')
    app(@Req() req, @Param('token') token: string) {
        return `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="Content-Security-Policy" content="default-src
            'none';script-src 'unsafe-inline';">
        </head>
        <body>
        <script>window.location.assign('ismiregal://token#${token}' +
        window.location.hash);</script>
            <h1>Hello google</h1>
        </body>
        </html>`;
    }
}
