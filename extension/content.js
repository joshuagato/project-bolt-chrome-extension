// Content script
import { NotePanel } from './components/notePanel.js';

class MeetingNotes {
  constructor() {
    this.notePanel = new NotePanel();
    this.setupMessageListener();
  }

  setupMessageListener() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'SHOW_NOTES') {
        this.notePanel.show();
      }
    });
  }
}

// Initialize when the content script loads
new MeetingNotes();