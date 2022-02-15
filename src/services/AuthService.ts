const refreshCsrfToken = async () => {};

const signup = async (userName: string, password: string) => {
  return Promise.resolve();
};

// 本来はDB上で管理すべき
const login = async (userName: string, password: string, signUsername: string, signPassword: string) => {
  return Promise.resolve([userName === signUsername && password === signPassword]);
};

const logout = async () => {
  return Promise.resolve();
};

export const AuthService = {
  signup,
  login,
  logout,
  refreshCsrfToken,
};
