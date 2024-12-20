document.addEventListener('DOMContentLoaded', () => {
  const statusText = document.querySelector('.status-text');
  const startButton = document.getElementById('startButton');

  // Check if there's an active meeting
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs[0].url;
    const platform = detectMeetingPlatform(url);
    
    if (platform) {
      statusText.textContent = `${platform} meeting detected`;
      startButton.disabled = false;
    }
  });

  // Handle start button click
  startButton.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'START_RECORDING' });
      window.close();
    });
  });

  function detectMeetingPlatform(url) {
    if (url.includes('meet.google.com')) return 'Google Meet';
    if (url.includes('zoom.us')) return 'Zoom';
    if (url.includes('teams.microsoft.com')) return 'Microsoft Teams';
    if (url.includes('slack.com/call')) return 'Slack';
    return null;
  }
});