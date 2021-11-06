import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://whatsapp-clone-13.herokuapp.com/',
});

export default instance;