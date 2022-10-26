import { 
  CallHandler, 
  ExecutionContext, 
  Injectable, 
  NestInterceptor, 
  RequestTimeoutException
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(3000),
      catchError(err => {
        if (err instanceof TimeoutError) {
          // throwError() is deprecated. Error message told me to do this.
          // throwError(() => new Error('test'));
          return throwError(() => new RequestTimeoutException());
          // return throwError(new RequestTimeoutException());
        }
        // return throwError(err);
      }),
    );
  }
}
