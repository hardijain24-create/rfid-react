export class Device {
  constructor(deviceId, deviceType, enabled, firmwareVersion, wifiSsid) {
    this.deviceId = deviceId;
    this.deviceType = deviceType;
    this.enabled = enabled;
    this.firmwareVersion = firmwareVersion;
    this.wifiSsid = wifiSsid;
  }

  static fromJson(json) {
    return new Device(
      json.device_id,
      json.device_type,
      json.enabled ?? true,
      json.firmware_version ?? 'unknown',
      json.wifi_ssid
    );
  }

  toJson() {
    return {
      device_id: this.deviceId,
      device_type: this.deviceType,
      enabled: this.enabled,
      firmware_version: this.firmwareVersion,
      wifi_ssid: this.wifiSsid,
    };
  }
}
