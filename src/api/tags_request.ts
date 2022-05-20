import axios from 'axios';

export async function tags_request() {
  return await axios.get('http://localhost:1337/api/tags?populate=icon');
}
