import axios from 'axios';
import {API_URL} from '../../consts';

export async function tags_request() {
  return await axios.get(`${API_URL}/api/tags?populate=icon`);
}
