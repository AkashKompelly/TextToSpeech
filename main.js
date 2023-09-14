let speech = new SpeechSynthesisUtterance();

let voices = [];

let voiceSelect = document.querySelector("select");


function stopSpeech() {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }
}

function populateVoiceList() {
  voices = speechSynthesis.getVoices();
  speech.voice = voices[0];

  voiceSelect.innerHTML = "";

  voices.forEach((voice, i) => {
    voiceSelect.options[i] = new Option(voice.name, voice.name);
  });
}

populateVoiceList();
window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();

  speech.voice = voices[0];

  voices.forEach(
    (voice, i) => (voiceSelect.options[i] = new Option(voice.name, i))
  );
};

voiceSelect.addEventListener("change", () => {
  stopSpeech();
  speech.voice = voices[voiceSelect.value];
});

document.querySelector("button").addEventListener("click", () => {
  speech.text = document.querySelector("textarea").value;

  window.speechSynthesis.speak(speech);
});
