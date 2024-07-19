import { createNewColumn, createNewTask } from "./kanbanBoard";
import { getColumns, getTasks } from "./redux";
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

    // logic for admin 

    if (values.email === 'admin@gmail.com') {

        // creating three columns

        createNewColumn(getColumns(), 'Todo', 2345)
        createNewColumn(getColumns(), 'In Process', 7653)
        createNewColumn(getColumns(), 'Finished', 9843)

        // creating pre defined tasks for admin

        createNewTask(2345, 'Learn HTML', "Easy", getTasks(), 3453)
        createNewTask(2345, 'Start DSA', "Medium", getTasks(), 3413)
        createNewTask(2345, 'Make notes on express.js', "Hard", getTasks(), 3423)

        createNewTask(7653, 'Adding backend in e-commerece project', "Hard", getTasks(), 6453)
        createNewTask(7653, 'Studying about Stripe', "Medium", getTasks(), 5438)

        createNewTask(9843, 'Post a reel on BST.', "Hard", getTasks(), 4567)
        createNewTask(9843, 'Send cold email to MARK', "Easy", getTasks(), 3245)
        createNewTask(9843, '4 Hours of code', "Hard", getTasks(), 9872)


        localStorage.setItem('isUserLoggedIn', 'true');
        successMessage("User logged in successfully  🥳")
        return true
    }

    const existingUser = users.find(user => user.email === values.email && user.password === values.password);

    if (existingUser) {
        localStorage.setItem('isUserLoggedIn', 'true');
        successMessage("User logged in successfully  🥳")
        return true
    } else {
        errorMessage("Invalid Credentials.")
    }
};
