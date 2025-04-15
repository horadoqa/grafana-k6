import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  vus: 100,
  duration: '60s',
};

export default function () {
//   const response = http.get('https://www.globo.com/healthcheck/');
  const response = http.get('http://pagenotgfound/');
  check(response, { 'status was 200': (r) => r.status == 200 });
  check(response, { 'status was 404': (r) => r.status == 404 });
//   sleep(1);
}