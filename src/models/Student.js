export class Student {
  constructor(id, studentId, name, grade, section, uid) {
    this.id = id;
    this.studentId = studentId;
    this.name = name;
    this.grade = grade;
    this.section = section;
    this.uid = uid;
  }

  static fromJson(json) {
    return new Student(
      json._id || json.id, 
      json.student_id,
      json.full_name || json.name,
      json.grade,
      json.section,
      json.uid ?? ''
    );
  }

  toJson() {
    return {
      student_id: this.studentId,
      full_name: this.name,
      grade: this.grade,
      section: this.section,
      uid: this.uid,
    };
  }
}
