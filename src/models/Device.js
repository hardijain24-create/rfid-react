export class Device {
  constructor(deviceId, locationName, isActive, lastSeenAt, updatedAt, wifiSsid, wifiPassword) {
    this.deviceId = deviceId;
    this.locationName = locationName;
    this.isActive = isActive;
    this.lastSeenAt = lastSeenAt;
    this.updatedAt = updatedAt;
    this.wifiSsid = wifiSsid;
    this.wifiPassword = wifiPassword;
  }

  static fromJson(json) {
    return new Device(
      json.device_id,
      json.location_name,
      json.is_active ?? true,
      json.last_seen_at ? new Date(json.last_seen_at) : null,
      json.updated_at ? new Date(json.updated_at) : null,
      json.wifi_ssid,
      json.wifi_password
    );
  }

  toJson() {
    return {
      device_id: this.deviceId,
      location_name: this.locationName,
      is_active: this.isActive,
      wifi_ssid: this.wifiSsid,
      wifi_password: this.wifiPassword,
    };
  }
}
