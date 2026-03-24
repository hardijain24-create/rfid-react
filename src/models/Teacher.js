export class Teacher {
  constructor(id, email, name, role) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.role = role;
  }

  static fromJson(json) {
    return new Teacher(
      json.id || json._id,
      json.email,
      json.name,
      json.role || 'teacher'
    );
  }

  toJson() {
    return {
      email: this.email,
      name: this.name,
      role: this.role,
    };
  }
}
