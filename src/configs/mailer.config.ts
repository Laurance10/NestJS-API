/* eslint-disable prettier/prettier */
import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer';
import * as path from 'path';

// Configurando o Mailer
export const mailerConfig: MailerOptions = {
  template: {

    dir: path.resolve(__dirname, '..', '..', 'templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      extName: '.hbs',
      layoutsDir: path.resolve(__dirname, '..', '..', 'templates'),
    },

  },
  transport: `smtps://contato@gmail.com:senhasuperforte@smtp.gmail.com`,
};