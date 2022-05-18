import axios from 'axios';

export default function (data: any) {
  return axios.post('http://localhost:1337/api/auth/local/register', data);
}
