import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
export enum ValidationSource {
  BODY = 'body',
  HEADER = 'headers',
  QUERY = 'query',
  PARAM = 'params',
}
export default (
    schema: Joi.ObjectSchema,
    source: ValidationSource = ValidationSource.BODY
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req[source]);

      if (!error) return next();

      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/['"]+/g, ''))
        .join(',');
      console.error(message);
      res.status(400).json({ status: 'failed', message: 'BAD REQUEST' });
      next();
    } catch (error) {
      next(error);
    }
  };
