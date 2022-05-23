import axios from 'axios';

export default async function (data: any) {
  return await axios.post('http://localhost:1337/api/contacts', {data: data});
}
