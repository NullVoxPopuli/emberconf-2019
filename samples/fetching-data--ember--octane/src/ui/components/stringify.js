import { helper as buildHelper } from '@ember/component/helper';

export function stringify(params/*, hash*/) {
  const value = params[0];

  return JSON.stringify(value, undefined, 4);
}

export const helper = buildHelper(stringify);
