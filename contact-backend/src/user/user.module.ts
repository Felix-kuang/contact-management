import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '@app/auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [AuthModule],
})
export class UserModule {}
