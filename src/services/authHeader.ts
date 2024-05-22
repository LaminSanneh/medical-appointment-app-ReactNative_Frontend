const authHeader = {
  accessToken: null,

  initializeToken: (accessToken: any) => {
    authHeader.accessToken = accessToken;
  },

  getAuthHeader: () => {
    if (authHeader.accessToken) {
      return {Authorization: 'Bearer ' + authHeader.accessToken};
    } else {
      return {};
    }
  },
};

export default authHeader;
