import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 150,
    duration: '30s',
};

export default function () {
    http.get('http://localhost:8000/api/books');
    sleep(1);
}
