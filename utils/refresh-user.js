export default async (id) => {
  // eslint-disable-next-line global-require
  const { managementApi } = require('../lib/auth0');
  const [user, roles, enrollments] = await Promise.all([
    managementApi.getUser({ id }), // Get the latest profile (OAuth only returns the profile at login)
    (await managementApi.getUserRoles({ id })).map((role) => role.name),
    (await managementApi.getGuardianEnrollments({ id })),
  ]);

  user.roles = {
    volunteer: roles.includes('Volunteer'), // || roles.includes('Employee') || roles.includes('Employee - Full-Time');
    employee: roles.includes('Employee') || roles.includes('Employee - Full-Time'),
    staff: roles.includes('Staff'),
    devops: roles.includes('Devops'),
  };

  user.enrollments = enrollments;

  return user;
};
