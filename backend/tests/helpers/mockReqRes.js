// tests/helpers/mockReqRes.js
// Creates mock Express request/response/next for controller unit tests

const mockRequest = (overrides = {}) => ({
  body: {},
  params: {},
  query: {},
  headers: {},
  user: { userId: "user123", role: "user", email: "test@example.com" },
  file: null,
  ...overrides,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext = () => jest.fn();

module.exports = { mockRequest, mockResponse, mockNext };
