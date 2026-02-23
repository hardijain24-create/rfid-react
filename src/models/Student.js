export class Student {
  constructor(id, name, uid) {
    this.id = id;
    this.name = name;
    this.uid = uid;
  }

  static fromJson(json) {
    return new Student(
      json._id,
      json.name,
      json.uid ?? ''
    );
  }

  toJson() {
    return {
      name: this.name,
      uid: this.uid,
    };
  }
}
