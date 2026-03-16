import { loginUser, registerUser, logoutUser } from "../services/authService";
import { createUserProfile } from "../services/userService";

export const login = (email, password) => loginUser(email, password);

export const signup = async (data) => {
  const { email, password, name, phone, gender, dob, address } = data;

  const user = await registerUser(email, password);

  await createUserProfile(user.uid, {
    name,
    email,
    phone,
    gender,
    dob,
    address,
    role: "user", // default role
  });

  return user;
};

export const logout = () => logoutUser();
