import { postData, datas} from '../scenes/functions.js';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve('Resolve'),
}));

beforeEach(() => {
  fetch.mockClear();
});


describe('postData function', () => {
  test('it should save scores to scoreboard api', async () => {
    const playerInfo = { "user": "Joe", "score":  30};
    fetch.mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve('Leaderboard score created correctly.') }));
    await expect(postData(playerInfo)).resolves.toEqual('Leaderboard score created correctly.');
  });

  test('it should throw an error', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('API is Down')));
    await expect(postData('')).rejects.toThrow('API is Down');
  });
});

describe('datas function', () => {
  test('it should get the score from the scoreboard api', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve({ user: 'John', score: 220 }) }));
    await expect(datas('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ip0JlGDyAdoLM8OImZTq/scores/')).resolves.toEqual({ user: 'John', score: 220 });
  });

  test('it should throw an error', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('API is Down')));
    await expect(datas('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ip0JlGDyAdoLM8OImZTq/scores/')).rejects.toThrow('API is Down');
  });
});