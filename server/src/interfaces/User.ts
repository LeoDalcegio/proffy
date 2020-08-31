export default interface User {
    id: number;
    name: string;
    surename: string;
    email: string;
    password: string;
    passwordResetToken: string;
    passwordResetExpires: Date;
}
