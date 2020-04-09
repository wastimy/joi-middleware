import { Request, Response } from 'express';

import JoiValidator from '../validator';

jest.mock('@hapi/joi');

beforeEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.clearAllMocks();
});

describe('Test validator', () => {
  it('Should throw: unknow context', () => {
    const AddProductValidator = new JoiValidator(
      {},
      'toto',
    );

    expect(() => { AddProductValidator.validate({} as Request, {} as Response, jest.fn()); }).toThrow(
      '[JoiValidator] `validate` function not implemented for context key toto',
    );
  });

  it('Should fail validating the body', () => {
    const JoiSchema = { validate: jest.fn(() => ({ error: 'Missing mandatory field `password`' })) };
    const AddProductValidator = new JoiValidator(
      JoiSchema,
      'body',
    );

    expect(() => { AddProductValidator.validate({} as Request, {} as Response, jest.fn()); }).toThrow();
  });

  it('Should validate with success the body', () => {
    const JoiSchema = { validate: jest.fn(() => ({})) };
    const next = jest.fn();

    const AddProductValidator = new JoiValidator(
      JoiSchema,
      'body',
    );

    AddProductValidator.validate({} as Request, {} as Response, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('Should validate with success the query parameters', () => {
    const JoiSchema = { validate: jest.fn(() => ({})) };
    const next = jest.fn();

    const AddProductValidator = new JoiValidator(
      JoiSchema,
      'query',
    );

    AddProductValidator.validate({} as Request, {} as Response, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('Should validate with success the route parameters', () => {
    const JoiSchema = { validate: jest.fn(() => ({})) };
    const next = jest.fn();

    const AddProductValidator = new JoiValidator(
      JoiSchema,
      'params',
    );

    AddProductValidator.validate({} as Request, {} as Response, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('Should validate with success the cookies', () => {
    const JoiSchema = { validate: jest.fn(() => ({})) };
    const next = jest.fn();

    const AddProductValidator = new JoiValidator(
      JoiSchema,
      'cookies',
    );

    AddProductValidator.validate({} as Request, {} as Response, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('Should validate with success the signed cookies', () => {
    const JoiSchema = { validate: jest.fn(() => true) };
    const next = jest.fn();

    const AddProductValidator = new JoiValidator(
      JoiSchema,
      'signedCookies',
    );

    AddProductValidator.validate({} as Request, {} as Response, next);

    expect(next).toHaveBeenCalledTimes(1);
  });
});
