// Notification management service
export class NotificationManager {
  static async showMeetingDetected(platform) {
    return chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon128.png',
      title: 'Meeting Detected',
      message: `${platform} meeting detected. Click to start taking notes.`,
      buttons: [{ title: 'Take Notes' }],
      requireInteraction: true
    });
  }
}