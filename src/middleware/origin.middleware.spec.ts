import { OriginMiddleware } from './origin.middleware';

describe('OriginMiddleware', () => {
  it('should be defined', () => {
    expect(new OriginMiddleware()).toBeDefined();
  });
});
