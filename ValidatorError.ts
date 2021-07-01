export default class ValidatorError extends Error {
  protected status: number;

  public constructor(message, stack) {
    super(message);

    this.name = 'ValidatorError';
    this.stack = stack;
    this.status = 400;
  }
}
