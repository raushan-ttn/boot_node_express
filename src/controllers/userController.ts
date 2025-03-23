import User from "../models/User";

export const getAllUsers = async () => {
  try {
    const users = await User.getAllUsers();
    if (users) {
      return users;
    }
  } catch (error) {
    return { error: error };
  }
};

type createUserParams = {
  username: string;
  mail: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
  status: boolean;
};

export const createUser = async (user: createUserParams) => {
  const {
    username,
    mail,
    password,
    confirm_password,
    first_name,
    last_name,
    status,
  } = user;

  // Check if all fields are provided
  if (
    !username ||
    !mail ||
    !password ||
    !confirm_password ||
    !first_name ||
    !last_name
  ) {
    return {
      success: false,
      message: "All fields are required.",
    };
  }
  // Check if password and confirmPassword match
  if (password !== confirm_password) {
    return {
      success: false,
      message: "Password and Confirm Password do not match.",
    };
  }
  // Check if user already exists
  const userExists = await User.checkUserExists(mail, username);
  console.log(userExists, "user");
  if (!userExists) {
    console.log(userExists, "user");
    try {
      const newUser = await User.createUser(
        username,
        mail,
        password,
        first_name,
        last_name,
        status
      );
      return {
        success: true,
        message: "User created successfully.",
        data: newUser,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error creating user.",
      };
    }
  } else {
    return {
      success: false,
      message: "User already exists.",
    };
  }
};

export const findAllUsers = async (params: string | undefined) => {
  const users = await User.searchAllUsers(params);
  if (users) {
    return {
      success: true,
      message: "User fetched successfully.",
      data: users,
    };
  } else {
    return {
      success: false,
      message: "No record found.",
      data: [],
    };
  }
};
