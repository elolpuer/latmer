import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class CompanyAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    const user = request.session.user
    if (user && user.isCompany){
        return true
    }
    throw new HttpException('Unauthorized access or this is not company', HttpStatus.UNAUTHORIZED);
  }
}