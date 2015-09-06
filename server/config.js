import path from 'path';

export default {
  listenPort: 3500,
  distFolder: path.resolve(__dirname, '../client/dist'),
  staticUrl: path.resolve(__dirname, '../client/dist/static'),
};
