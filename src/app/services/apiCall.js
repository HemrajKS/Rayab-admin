import axios from 'axios';

const makeHttpRequest = async (url, method, data) => {
  const config = {
    method: method,
    url: url,
  };

  if (data) {
    config.data = data;
  }

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export default makeHttpRequest;
