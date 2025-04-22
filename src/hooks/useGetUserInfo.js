//This hook retrieves user information from local storage and returns it.
//We can use this hook in any component to get the user information
export const useGetUserInfo = () => {
    const { name, profilePic, userId, isAuth } = 
    JSON.parse(localStorage.getItem("auth")) || {};

    return { name, profilePic, userId, isAuth };
};