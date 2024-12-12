import http from 'k6/http';
import { sleep, check } from 'k6';

//Load test 10 virtual users accessing url for 3 minutes, expect 200 OK
//and duration < 200
export const options = {
  vus: 10,
  duration: '3m',
};

export default function () {
  const res = http.get('http://exnodebackapi_6:3000/v1/api/customers');
  check(res, {
    'status was 200': (r) => r.status === 200,
    'duration was <= 200ms': (r) => r.timings.duration < 200,
  });
  sleep(1);
}
