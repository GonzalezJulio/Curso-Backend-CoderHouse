export default class SafeUsersDTO {
    constructor(user) {
        this.fullName = user.name + ' ' + user.lastname
        this.email = user.email;
        this.role = user.role;
    }
}