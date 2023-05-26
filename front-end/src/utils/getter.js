export const getUserByID = (users, id) => {
    return users.filter((val) => val.uid === id)[0];
}