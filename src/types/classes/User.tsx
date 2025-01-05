export class User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  avatar: string;
  role: string;

  constructor(
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    avatar: string,
    role: string,
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.avatar = avatar;
    this.role = role;
  }
}
