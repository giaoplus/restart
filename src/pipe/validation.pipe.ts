import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if(!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if(errors.length > 0){
      const errorMessage = errors.map(error => Object.values(error.constraints).join(';')).join(';');
      throw new BadRequestException(`Validation failed: ${errorMessage}`);
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [ String, Number, Boolean, Array, Object ];
    return !types.includes(metatype)
  }
}
