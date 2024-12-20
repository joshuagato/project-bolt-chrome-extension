// Background script
import { MeetingDetector } from './services/meetingDetector.js';
import { NotificationManager } from './services/notificationManager.js';

let activeMeeting = null;

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    const platform = MeetingDetector.detectPlatform(tab.url);
    
    if (platform && !activeMeeting) {
      activeMeeting = { platform, tabId };
      NotificationManager.showMeetingDetected(platform);
    }
  }
});

// Handle notification clicks
chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
  if (buttonIndex === 0 && activeMeeting) {
    chrome.scripting.executeScript({
      target: { tabId: activeMeeting.tabId },
      func: () => {
        window.postMessage({ action: 'SHOW_NOTES' }, '*');
      },
    });

    // chrome.tabs.sendMessage(activeMeeting.tabId, {
    //   action: 'SHOW_NOTES'
    // });
  }
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'MEETING_ENDED') {
    activeMeeting = null;
  }
});