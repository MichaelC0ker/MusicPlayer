const queryParamExtrator = (url) => {
  if (!url || url.indexOf('?') === -1) {
    // TODO:  Improve error handling to avoid unnecessary try blocks.
    // TODO:  Define errors for reusable error handling
    return [];
  }

  const paramEntries = url.split('?')[1].split('&').map((param) => param.split('='));

  return Object.fromEntries(paramEntries ?? []);
};

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
     try {
         let body = '';
         req.on('data', chunk => {
             body += chunk.toString();
         });

         req.on('end', () => {
            resolve(body);
         });
     }
     catch (e) {
         reject(e);
     }
  });

}

export default {
  queryParamExtrator, getPostData
};
