document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {action: "getAudio"}, (response) => {
      if (response && response.audio) {
        const list = document.getElementById('audio-list');
        response.audio.forEach(audio => {
          const div = document.createElement('div');
          div.className = 'audio-item';
          
          const p = document.createElement('p');
          p.textContent = audio.url;
          
          const downloadBtn = document.createElement('button');
          downloadBtn.textContent = 'Download';
          downloadBtn.addEventListener('click', () => downloadAudio(audio.url));
          
          const speedInput = document.createElement('input');
          speedInput.type = 'range';
          speedInput.min = '0.25';
          speedInput.max = '2';
          speedInput.step = '0.25';
          speedInput.value = '1';
          speedInput.addEventListener('change', (e) => setSpeed(audio.url, e.target.value));
          
          div.appendChild(p);
          div.appendChild(downloadBtn);
          div.appendChild(speedInput);
          list.appendChild(div);
        });
      }
    });
  });
});

function downloadAudio(url) {
  chrome.downloads.download({url: url, saveAs: true});
}

function setSpeed(url, speed) {
  console.log(`Setting speed for ${url} to ${speed}x`);
}
