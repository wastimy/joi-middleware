[![airbnb-style](https://flat.badgen.net/badge/eslint/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)

https://www.npmjs.org/package/@wastimy/joi-middleware
```bash
npm install --save @wastimy/joi-middleware
```

Joi-Middleware is an express middleware function that wraps the [joi](https://github.com/hapijs/joi/tree/master) validation library. This allows you to use this middleware on route to ensure that all received inputs are correct before any handler function. The middleware allows you to validate `req.params`, `req.headers`, and `req.query`.

The middleware will also validate:

* `req.body` — provided you are using [`body-parser`](https://github.com/expressjs/body-parser)
* `req.cookies` — provided you are using [`cookie-parser`](https://github.com/expressjs/cookie-parser)
* `req.signedCookies` — provided you are using [`cookie-parser`](https://github.com/expressjs/cookie-parser)


## express Compatibility

Joi-Middleware is tested and has full compatibility with express 4 and 5.

## Example Usage

Example of using  on a single POST route to validate `req.body`.
```js
const express = require('express');
const BodyParser = require('body-parser');
const Joi = require('@hapi/joi');
const JoiValidator = require('@wastimy/joi-middleware');

const AddProductSchema = Joi.object().keys({
  form: Joi.object().keys({
    name: Joi.string().required(),
  }).required(),
}).required();

const AddProductValidator = new JoiValidator(
  AddProductSchema,
  'body',
  { stripUnknown: true } // Check Joi documentation for allowed options
).validate;

const app = express();
app.use(BodyParser.json());

app.post(
  '/product',
  productBodyValidator, // Just add the validator function before your handler one
  (req, res) => {
    // At this point, req.body has been validated
    res.json({ message: 'Body is valid' });
  }
);
```

### `Joi`

Joi-Middleware use local version of Joi. We will regulary upgrade version of Joi if any major version is pushed to ensure the best compatibility.

### `Allowed keys`

An enum containing all the segments of `req` objects that joi-middleware should be able to validate.

```js
{
  Body: 'body',
  Query: 'query',
  Cookies: 'cookies',
  Headers: 'headers',
  Params: 'params',
  SignedCookies: 'signedCookies',
}
```

### Error

If an error happen while validating your data the original Joi error is throw.
Note that express will treat this thrown error with the default error handler.

## Issues

*Before* opening issues on this repo, make sure your joi schema is correct and working as you intended. The bulk of this code is just exposing the joi API as express middleware. All of the heavy lifting still happens inside Joi.
