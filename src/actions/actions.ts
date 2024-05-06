export const setUserLoggedIn = (isLoggedIn: boolean) => {
    return {
      type: 'SET_USER_LOGGED_IN',
      payload: isLoggedIn,
    };
  };
  