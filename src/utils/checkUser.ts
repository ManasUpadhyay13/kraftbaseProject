export const checkUserStatus = (): boolean => {
    const userLoggedIn = window.localStorage.getItem("isUserLoggedIn");
    return userLoggedIn ? JSON.parse(userLoggedIn) : false;
};
