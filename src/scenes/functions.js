const datas = async (url = '') => {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const have = await response.json();
  return have;
};

const postData = async (data = {}) => {
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ip0JlGDyAdoLM8OImZTq/scores/', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });
  const have = await response.json();
  return have;
};

export { datas, postData };