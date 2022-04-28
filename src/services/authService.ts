import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  Auth,
} from "firebase/auth";

const register = (auth: Auth, email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
      localStorage.setItem("accessToken", res.user.refreshToken);
      return { accessToken: res.user.refreshToken, email: res.user.email };
    })
    .catch((error) => {
      return error;
    });
};

const login = (auth: Auth, email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
      localStorage.setItem("accessToken", res.user.refreshToken);
      return { accessToken: res.user.refreshToken, email: res.user.email };
    })
    .catch((error) => {
      return error;
    });
};

const logout = () => {
  localStorage.removeItem("accessToken");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
