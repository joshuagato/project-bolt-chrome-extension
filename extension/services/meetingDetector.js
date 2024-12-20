// Meeting detection service
export class MeetingDetector {
  static MEETING_PATTERNS = {
    GOOGLE_MEET: '*://meet.google.com/*',
    ZOOM: '*://*.zoom.us/*',
    TEAMS: '*://*.teams.microsoft.com/*',
    SLACK: '*://*.slack.com/call/*'
  };

  static detectPlatform(url) {
    if (url.match(this.MEETING_PATTERNS.GOOGLE_MEET)) return 'Google Meet';
    if (url.match(this.MEETING_PATTERNS.ZOOM)) return 'Zoom';
    if (url.match(this.MEETING_PATTERNS.TEAMS)) return 'Microsoft Teams';
    if (url.match(this.MEETING_PATTERNS.SLACK)) return 'Slack';
    return null;
  }
}