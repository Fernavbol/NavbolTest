export const validLoginFixture = {
  username: 'testuser@example.com',
  password: 'TestPassword123!',
  expectedDashboard: 'Dashboard',
};

export const invalidLoginFixture = {
  username: 'invalid@example.com',
  password: 'WrongPassword',
  expectedError: 'Credenciales inválidas',
};
