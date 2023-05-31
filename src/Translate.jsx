import { useState } from "react";
import axios from 'axios';

const TranslateComponent = (prop) => {
    console.log(prop)

  const [targetText, setTargetText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('hi');
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const synthRef = useRef(window.speechSynthesis);

  const handleTranslate = () => {
    const options = {
      method: 'POST',
      url: 'https://google-translator9.p.rapidapi.com/v2',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'a24dcbab02msh0f6ab2b3ef9be4cp155048jsn24599ba63061',
        'X-RapidAPI-Host': 'google-translator9.p.rapidapi.com'
      },
      data: JSON.stringify({
        q: prop.value,
        source: 'en',
        target: targetLanguage,
        format: 'text'
      })
    };

    axios.request(options)
      .then(function (response) {
        setTargetText(response.data.data.translations[0].translatedText);
        console.log(response)
      }).catch(function (error) {
        console.error(error);
      });
  };

  const handleLanguageChange = (e) => {
    setTargetLanguage(e.target.value);
  };

//   function handleClick() {
//     console.log("btn-clicked")
//     const message = new SpeechSynthesisUtterance(targetText);
//     message.voice = window.speechSynthesis.getVoices()[1]; // Use the first available voice
//     message.pitch = 1.0; // Set the pitch to 1.0 (default)
//     message.rate = 1.0; // Set the rate to 1.0 (default)
//     setIsSpeaking(true);
//     message.onend = () => setIsSpeaking(false);
//     synthRef.current.speak(message);
//   }

//   function handleStopClick() {
//     synthRef.current.cancel();
//     setIsSpeaking(false);
//   }

  return (
    <div className="mt-10 "> 
     <div className='mt-5 mb-5 flex flex-row justify-between'>
        <div className="flex flex-row">
        <select class="select select-info w-full max-w-xs" value={targetLanguage} onChange={handleLanguageChange}>
        <option value="hi">Hindi</option>
        <option value="mr">Marathi</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="es">Spanish</option>
      </select>
      <button  className="btn btn-primary ml-10"onClick={handleTranslate}>Translate</button>
      </div>
      {/* <div>
      <div className="flex justify-between">
      <div className="">
        <button className="mr-2"onClick={handleClick} disabled={isSpeaking}>
      {isSpeaking ? 'Speaking...' : (  <svg class="swap-on fill-current btn-primary btn" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"/></svg>)}
    </button>
    <button onClick={handleStopClick} disabled={!isSpeaking}>
    <svg class="swap-off btn btn-error fill-current" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z"/></svg>
      </button>
      </div>
      </div>
      </div> */}
      </div> 
      <p>{targetText} </p>
    </div>
  );
};

export default TranslateComponent;
