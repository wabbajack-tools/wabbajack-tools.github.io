/* eslint-disable node/no-unpublished-import */
import axios from 'axios';

test('build server online', () => {
  axios
    .get('http://build.wabbajack.org/lists/status.json')
    .then(res => expect(res.status).toBe(200));
});
