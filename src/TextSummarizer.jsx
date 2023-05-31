import { useState ,useRef} from "react";
import axios from "axios";
import TranslateComponent from './Translate'


function TextSummarizer() {
  
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef(window.speechSynthesis);


  function handleClick() {
    console.log("btn-clicked")
    const message = new SpeechSynthesisUtterance(summary);
    message.voice = window.speechSynthesis.getVoices()[1]; // Use the first available voice
    message.pitch = 1.0; // Set the pitch to 1.0 (default)
    message.rate = 1.0; // Set the rate to 1.0 (default)
    setIsSpeaking(true);
    message.onend = () => setIsSpeaking(false);
    synthRef.current.speak(message);
  }

  function handleStopClick() {
    synthRef.current.cancel();
    setIsSpeaking(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize-text',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'a24dcbab02msh0f6ab2b3ef9be4cp155048jsn24599ba63061',
        'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
        // 'X-RapidAPI-Key': '8c7f29b975msh95a00df47c4313dp1ccad3jsn6a985ce50b09',
       // 'X-RapidAPI-Host': 'youtube-transcriptor.p.rapidapi.com'
      },
      data: `{"text":"${text}"}`
    };

    setLoading(true);
    axios.request(options).then(function (response) {
      setSummary(response.data.summary);
      console.log(response.data.summary);
      setLoading(false);
    }).catch(function (error) {
      console.error(error);
      setLoading(false);
    });
  };

  return (
    <>
     <div class="p-6 flex flex-col items-center">
     <textarea
    label="Enter text to summarize"
    placeholder="Type your text here..."
    className="mb-4 border border-gray-300 rounded-lg p-2 resize-none h-40 w-full "
    value={text}
    onChange={(event) => setText(event.target.value)}
  />


  <button
      class="px-4 py-2 bg-blue-500 btn btn-info text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:bg-blue-600 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
    disabled={loading}
    onClick={handleSubmit}
    type="submit"
  >
    {loading ? (
      <div class="flex items-center justify-center">
        <div
          class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-900"
        ></div>
        <span class="sr-only">Loading...</span>
      </div>
    ) : (
      "Summarize"
    )}
  </button>

  {summary && (
    
    <div class="mt-4">
      
      <div className="flex justify-between	">
      <h2 class="text-lg font-bold">Summary:</h2>
      <div className="text-right">
        <button className="mr-2"onClick={handleClick} disabled={isSpeaking}>
      {isSpeaking ? 'Speaking...' : (  <svg class="swap-on fill-current btn-primary btn" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"/></svg>)}
    </button>
    <button onClick={handleStopClick} disabled={!isSpeaking}>
    <svg class="swap-off btn btn-error fill-current" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z"/></svg>
      </button>
      </div>
      </div>
      <p>{summary}</p>
      
    </div>
  )}


<TranslateComponent value={summary}/>
</div>

    </>
  );
};

export default TextSummarizer;
