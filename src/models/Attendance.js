export class Attendance {
  constructor(studentName, status, time) {
    this.studentName = studentName;
    this.status = status;
    this.time = time;
  }

  static fromJson(json) {
    return new Attendance(
      json.student_name,
      json.status,
      new Date(json.time)
    );
  }
}
