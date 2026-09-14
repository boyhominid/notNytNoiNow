chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getAudio") {
    const audioList = getAudioFiles();
    sendResponse({audio: audioList});
  }
});

function getAudioFiles() {
  const audio = [];

  // Find <audio> tags
  document.querySelectorAll('audio').forEach(audioElement => {
    // Check for <source> elements inside <audio>
    audioElement.querySelectorAll('source').forEach(source => {
      if (source.src) {
        audio.push({url: source.src});
      }
    });
    // If audio tag has src attribute directly
    if (audioElement.src) {
      audio.push({url: audioElement.src});
    }
  });

  // Find MP3 links
  document.querySelectorAll('a[href*=".mp3"]').forEach(link => {
    if (link.href) {
      audio.push({url: link.href});
    }
  });

  // Remove duplicates
  const uniqueAudio = audio.filter((item, index, self) =>
    index === self.findIndex(t => t.url === item.url)
  );

  console.log("Found audio files:", uniqueAudio);
  return uniqueAudio;
}
