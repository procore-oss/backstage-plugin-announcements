import { DateTime } from 'luxon';

/**
 * Takes a TIMESTAMP type column and converts it to a DateTime.
 *
 * Some engines return the SQL string form (e.g. 'YYYY-MM-DD hh:mm:ss'), some
 * return ISO string form (e.g. 'YYYY-MM-DDThh:mm:ss.SSSZ'), some return a js
 * Date object.
 *
 * https://github.com/backstage/backstage/blob/e0b5cd9fdba98c9559bd0e98a68276b527dbb1ae/plugins/catalog-backend/src/database/conversion.ts#L28
 */
export const timestampToDateTime = (input: Date | string): DateTime => {
  if (typeof input === 'object') {
    return DateTime.fromJSDate(input).toUTC();
  }

  const result = input.includes(' ')
    ? DateTime.fromSQL(input, { zone: 'utc' })
    : DateTime.fromISO(input, { zone: 'utc' });
  if (!result.isValid) {
    throw new TypeError('Not valid');
  }

  return result;
};
