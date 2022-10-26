/* @Protocal() decorator FINAL CODE */
import {
  createParamDecorator,
  DefaultValuePipe,
  ExecutionContext,
} from '@nestjs/common';

export const Protocol = createParamDecorator(
  (DefaultValue: string, ctx: ExecutionContext) => {
    console.log({ DefaultValue });
    const request = ctx.switchToHttp().getRequest();
    return request.protocol;
  },
);