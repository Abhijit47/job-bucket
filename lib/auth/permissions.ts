import { createAccessControl } from 'better-auth/plugins/access';
import { adminAc, defaultStatements } from 'better-auth/plugins/admin/access';

/**
 * make sure to use `as const` so typescript can infer the type correctly
 */
const statement = {
  ...defaultStatements,
  jobCreate: ['create', 'share', 'update', 'delete', 'publish'],
  jobApply: ['apply', 'withdraw'],
  job: ['delete', 'publish'],
} as const;

export const ac = createAccessControl(statement);

export const candidate = ac.newRole({
  jobApply: ['apply', 'withdraw'],
  user: ['get', 'update', 'set-password'],
});

export const employer = ac.newRole({
  jobCreate: ['create', 'share', 'update', 'publish'],
  user: ['get', 'update', 'set-password'],
});

export const admin = ac.newRole({
  job: ['delete', 'publish'],
  ...adminAc.statements,
});
