import { useNavigate } from "react-router-dom";

export const handleLogout = (navigate: ReturnType<typeof useNavigate>) => {
    // Clear local storage item
    window.localStorage.removeItem('isUserLoggedIn');

    // Clear browsing history and redirect to login page
    navigate('/login', { replace: true });
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function () {
        window.history.pushState(null, document.title, window.location.href);
    });
};
