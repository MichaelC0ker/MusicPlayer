import config from '../resources/config.json' assert { type: 'json' };

export const playlistService = async (accessToken) => {
  if (!accessToken) {
    // TODO: Handle anonymous journey
  }

  return {
    ok: false,
    data: {
      error: 'not implemented'
    },
    status: 501
  };
};
