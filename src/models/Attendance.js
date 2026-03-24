export class Attendance {
  constructor(uid, status, deviceId, timestamp) {
    this.uid = uid;
    this.status = status;
    this.deviceId = deviceId;
    this.timestamp = timestamp;
  }

  static fromJson(json) {
    return new Attendance(
      json.uid,
      json.status,
      json.device_id,
      json.timestamp
    );
  }

  toJson() {
    return {
      uid: this.uid,
      status: this.status,
      device_id: this.deviceId,
      timestamp: this.timestamp
    };
  }
}
