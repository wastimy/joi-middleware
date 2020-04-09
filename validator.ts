import { Schema } from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

enum ContextKey {
  Body = 'body',
  Query = 'query',
  Params = 'params',
  Headers = 'headers',
  Cookies = 'cookies',
  SignedCookies = 'signedCookies',
}

class JoiMiddleware {
  private schema: Schema;

  private contextKey: string;

  private options: object;

  constructor(schema: Schema, contextKey: string, options = {}) {
    this.schema = schema;
    this.contextKey = contextKey;
    this.options = options;
  }

  public validate = (req: Request, res: Response, next: NextFunction) => {
    let entityToValidate: object;

    switch (this.contextKey) {
      case ContextKey.Body:
        entityToValidate = req.body;

        break;
      case ContextKey.Params:
        entityToValidate = req.params;

        break;
      case ContextKey.Query:
        entityToValidate = req.query;

        break;
      case ContextKey.Headers:
        entityToValidate = req.headers;

        break;
      case ContextKey.Cookies:
        entityToValidate = req.cookies;

        break;
      case ContextKey.SignedCookies:
        entityToValidate = req.signedCookies;

        break;
      default:
        throw new Error(`[JoiValidator] \`validate\` function not implemented for context key ${this.contextKey}`);
    }

    const validation = this.schema.validate(entityToValidate, this.options);
    if (validation.error) throw validation.error;

    next();
  };
}

export default JoiMiddleware;
