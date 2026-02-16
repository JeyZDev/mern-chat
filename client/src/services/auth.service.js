import instance from "./api"

const register = async(data) => {
    const response = await instance.post("/api/v1/auth/register", data);
    return response.data;
}

const login = async(data) => {
    const response = await instance.post("/api/v1/auth/login", data);
    return response.data;
}

const logout = async () => {
  const response = await instance.post("/api/v1/auth/logout");
  return response.data;
};

const checkAuth = async () => {
    const response = await instance.get("/api/v1/users/check");
    return response.data;
}

const AuthService = {
  register,
  login,
  logout,
  checkAuth,
};

export default AuthService;