const queryParamExtrator = (url) => {
  if (!url || url.indexOf('?') === -1) {
    // TODO:  Improve error handling to avoid unnecessary try blocks.
    // TODO:  Define errors for reusable error handling
    return [];
  }

  const paramEntries = url.split('?')[1].split('&').map((param) => param.split('='));

  return Object.fromEntries(paramEntries ?? []);
};

export default {
  queryParamExtrator
};
