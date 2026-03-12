import { loginUser, registerUser, logoutUser } from "../services/authService";
import { createUserProfile } from "../services/userService";

const ADMIN_EMAIL = "uttamrootways@gmail.com";

export const login = (email, password) => loginUser(email, password);

export const signup = async (data) => {
  const { email, password, name, phone, gender, dob, address } = data;

  const user = await registerUser(email, password);

  const role =
    email.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? "admin" : "user";

  await createUserProfile(user.uid, {
    name,
    email,
    phone,
    gender,
    dob,
    address,
    role,
  });

  return user;
};

export const logout = () => logoutUser();
