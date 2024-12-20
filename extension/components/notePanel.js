// Note-taking panel component
export class NotePanel {
  constructor() {
    this.isVisible = false;
    this.isRecording = false;
    this.createPanel();
  }

  createPanel() {
    this.panel = document.createElement('div');
    this.panel.id = 'nexcribe-note-panel';
    this.panel.innerHTML = `
      <div class="note-panel-container">
        <div class="note-panel-header">
          <input type="text" class="note-title" placeholder="Untitled Note">
          <div class="note-controls">
            <button class="minimize-button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 12H4"/>
              </svg>
            </button>
            <button class="close-button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="note-content">
          <textarea class="note-text" placeholder="Start typing your notes..."></textarea>
          <div class="transcription-area">
            <div class="transcription-status">
              <div class="recording-indicator"></div>
              <span>Transcribing...</span>
            </div>
            <div class="transcription-text"></div>
          </div>
        </div>
        <div class="note-footer">
          <button class="record-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="6"/>
            </svg>
            <span>Recording</span>
          </button>
          <button class="enhance-button" style="display: none;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 4V2m0 20v-2M4 15H2m20 0h-2M5.8 5.8L4.5 4.5m14.7 14.7l-1.3-1.3M5.8 18.2l-1.3 1.3M19.2 4.5l-1.3 1.3"/>
            </svg>
            Enhance with AI
          </button>
        </div>
      </div>
    `;
    
    this.addStyles();
    this.setupListeners();
    document.body.appendChild(this.panel);
  }

  addStyles() {
    const styles = document.createElement('style');
    styles.textContent = `
      #nexcribe-note-panel {
        position: fixed;
        top: 0;
        right: -400px;
        width: 400px;
        height: 100vh;
        background: white;
        box-shadow: -2px 0 12px rgba(0, 0, 0, 0.1);
        z-index: 999999;
        transition: right 0.3s ease;
      }

      #nexcribe-note-panel.visible {
        right: 0;
      }

      #nexcribe-note-panel.minimized {
        right: -360px;
      }

      .note-panel-container {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .note-panel-header {
        padding: 16px;
        border-bottom: 1px solid #f0f0f0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .note-title {
        border: none;
        font-size: 16px;
        font-weight: 500;
        width: 200px;
        outline: none;
      }

      .note-controls {
        display: flex;
        gap: 8px;
      }

      .note-controls button {
        padding: 8px;
        border: none;
        background: none;
        border-radius: 6px;
        cursor: pointer;
        color: #666;
      }

      .note-controls button:hover {
        background: #f5f5f5;
      }

      .note-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 16px;
        gap: 16px;
        overflow-y: auto;
      }

      .note-text {
        border: none;
        resize: none;
        height: 200px;
        outline: none;
        font-size: 14px;
        line-height: 1.5;
      }

      .transcription-area {
        border-top: 1px solid #f0f0f0;
        padding-top: 16px;
      }

      .transcription-status {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        font-size: 14px;
        color: #666;
      }

      .recording-indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #ff3b30;
        animation: pulse 1.5s infinite;
      }

      .note-footer {
        padding: 16px;
        border-top: 1px solid #f0f0f0;
        display: flex;
        gap: 12px;
      }

      .record-button, .enhance-button {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        border: none;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
      }

      .record-button {
        background: #ff3b30;
        color: white;
      }

      .enhance-button {
        background: #0071e3;
        color: white;
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.3s, transform 0.3s;
      }

      .enhance-button.visible {
        opacity: 1;
        transform: translateY(0);
      }

      @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
      }
    `;
    document.head.appendChild(styles);
  }

  setupListeners() {
    const minimizeBtn = this.panel.querySelector('.minimize-button');
    const closeBtn = this.panel.querySelector('.close-button');
    const recordBtn = this.panel.querySelector('.record-button');

    minimizeBtn.addEventListener('click', () => this.toggleMinimize());
    closeBtn.addEventListener('click', () => this.hide());
    recordBtn.addEventListener('click', () => this.toggleRecording());
  }

  show() {
    this.isVisible = true;
    this.panel.classList.add('visible');
  }

  hide() {
    this.isVisible = false;
    this.panel.classList.remove('visible', 'minimized');
  }

  toggleMinimize() {
    this.panel.classList.toggle('minimized');
  }

  toggleRecording() {
    this.isRecording = !this.isRecording;
    const enhanceButton = this.panel.querySelector('.enhance-button');
    
    if (!this.isRecording) {
      enhanceButton.style.display = 'flex';
      setTimeout(() => enhanceButton.classList.add('visible'), 10);
    } else {
      enhanceButton.classList.remove('visible');
      setTimeout(() => enhanceButton.style.display = 'none', 300);
    }
  }
}