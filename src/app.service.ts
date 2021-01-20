import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { createTransport } from 'nodemailer';
import * as moment from 'moment';
import { Library } from './library/library.entity';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  // run scheduler on everyday 8 AM O'Clock
  @Cron(`0 0 8 * * *`)
  async handleEmailSchedule() {
    this.logger.debug('Notify user on everyday 8 AM O Clock');

    const transporter = await createTransport({
      service: 'gmail',
      auth: {
        user: 'email',
        pass: 'pass',
      },
    });

    // find the users who need to notify
    const issuedUsers = await Library.find({
      where: { status: 'issued' },
      relations: ['userinfo'],
    });

    // get email list
    const emails = issuedUsers.map((u) => {
      if (moment(new Date()).diff(moment(u.created_at), 'days') > 6) {
        return u.userinfo.email;
      } else {
        return;
      }
    });

    if (emails[0] !== undefined) {
      try {
        let mailRes = await transporter.sendMail({
          from: 'noreply@libraryAdmin',
          to: emails.join(','),
          subject: 'book return reminder',
          html: `<h1>Hello, Please Return your book</h1>`,
        });
        console.log('reminder mail sent to users', mailRes);
      } catch (error) {
        console.log('unable to send reminder mail', error);
      }
    } else {
      console.log('no reminder for today');
    }
  }
}
