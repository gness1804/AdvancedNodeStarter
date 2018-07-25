/* global it, describe, expect */
const sinon = require('sinon');
const App = require('../../middlewares/requireLogin');

describe('App', () => {
  const req = {
    user: 'Yogi Berra',
  };
  const res = {
    status: function (status) {
      expect(status).toEqual(401);
      return this;
    },
    send: sinon.spy(),
  };
  const next = sinon.spy();

  it('should return next if there is a user', () => {
    App(req, res, next);
    sinon.assert.calledOnce(next);
  });

  /* eslint-disable quotes */
  it('should return a 401 status if no user', () => {
    const req2 = {
      user: undefined,
    };
    App(req2, res, next);
    sinon.assert.calledWith(res.send, { error: "You must log in!" });
  });
  /* eslint-enable quotes */
});
