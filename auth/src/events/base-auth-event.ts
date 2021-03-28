export abstract class BaseAuthEvent<TRest = unknown> {
  protected abstract statusCode: number;

  abstract serializeRest(): TRest;

  abstract getStatusCode(): number;
}
