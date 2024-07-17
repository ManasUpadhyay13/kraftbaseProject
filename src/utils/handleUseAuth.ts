import { errorMessage, successMessage } from "./toastMessage";

interface User {
    name: string;
    email: string;
    password: string;
}

const USERS_KEY = 'users';


const getUsers = (): User[] => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
};

const saveUsers = (users: User[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};



export const handleSignUp = (values: { email: string; password: string; name: string }) => {
    const users = getUsers();

    const existingUser = users.find(user => user.email === values.email);
    if (existingUser) {
        errorMessage("User with this email already exists")
        return;
    }

    const newUser: User = {
        name: values.name,
        email: values.email,
        password: values.password,
    };

    users.push(newUser);
    saveUsers(users);
    successMessage("Account created successfully  🥳")
    return true
}

export const handleLogIn = (values: { email: string; password: string }) => {
    const users = getUsers();

    const existingUser = users.find(user => user.email === values.email && user.password === values.password);
    if (existingUser) {
        localStorage.setItem('isUserLoggedIn', 'true');
        successMessage("User logged in successfully  🥳")
        return true
    } else {
        errorMessage("Invalid Credentials.")
    }
};
