const gitHubUserModule = (Urls) => {
    function searchUser(param) {
      // assuming param is String
      return fetch(Urls.search + `?q= ${encodeURIComponent(param)}` , {
        headers: {
          Origin: "codesandbox.io"
        }
      });
    }
    function getUserDetails(userName) {
      // assuming param is String
      return fetch(Urls.userDetails + `/${ encodeURIComponent(userName) }`, {
        headers: {
          Origin: "codesandbox.io"
        }
      });
    }
    return {
      searchUser,
      getUserDetails,
    };
  };
  export default gitHubUserModule;
  