/**
 * Taken from https://github.com/backstage/backstage/blob/e0b5cd9fdba98c9559bd0e98a68276b527dbb1ae/plugins/catalog-backend/src/database/conversion.test.ts#L19
 * so that we have a test for the timestampToDateTime function that came from Backstage.
 */

import { timestampToDateTime } from './utils';

describe('timestampToDateTime', () => {
  it('converts all known types', () => {
    const js = new Date(Date.UTC(2021, 7, 20, 10, 11, 12));
    const sql = '2021-08-20 10:11:12';
    const iso = '2021-08-20T10:11:12Z';
    expect(timestampToDateTime(js).toISO()).toBe('2021-08-20T10:11:12.000Z');
    expect(timestampToDateTime(sql).toISO()).toBe('2021-08-20T10:11:12.000Z');
    expect(timestampToDateTime(iso).toISO()).toBe('2021-08-20T10:11:12.000Z');
  });

  it('throws error', () => {
    expect(() => timestampToDateTime('foo')).toThrow('Not valid');
  });
});
