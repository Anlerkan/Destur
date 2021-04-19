export abstract class BaseAuthEvent<TRest = unknown> {
  abstract serializeRest(): TRest;

  abstract getStatusCode(): number;
}
