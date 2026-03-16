// tests/setup.js
// Global test setup — runs before each test suite
process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-jwt-secret-key-for-testing-only";
process.env.JWT_EXPIRE = "1h";
process.env.PORT = "0"; // random port for tests
