import axios from "axios";
import { useState } from 'react';

import styles from "./dist/output.css"
import TextSummarizer from "./TextSummarizer";

function ApiFetcher() {
  const [inputValue, setInputValue] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [transcription, SetTranscription] = useState([])
 
  const [error, setError] = useState(null);


  function extractYoutubeVideoId(url) {
    // Check if the URL is a valid YouTube video URL
    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);

    if (match) {
      // Extract the video ID from the matched URL
      const videoId = match[1];
      return videoId;
    } else {
      // If the URL is not a valid YouTube video URL, return null or throw an error
      return null;
    }
  }


  const videoId = extractYoutubeVideoId(inputValue);
  console.log(videoId); // Output: dQw4w9WgXcQ


  // console.log(subtitle)
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const options = {
    method: 'GET',
    url: 'https://youtube-transcriptor.p.rapidapi.com/transcript',
    params: { video_id: videoId, lang: 'en' },
    headers: {
      'X-RapidAPI-Key': 'a24dcbab02msh0f6ab2b3ef9be4cp155048jsn24599ba63061',
      'X-RapidAPI-Host': 'youtube-transcriptor.p.rapidapi.com'

      // 'X-RapidAPI-Key': '8c7f29b975msh95a00df47c4313dp1ccad3jsn6a985ce50b09',
      // 'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
    }
  };

  const handleFetch = async () => {
    // setIsLoading(true);
    console.log("btn-clicked")
    setError(null);
    axios.request(options).then(function (response) {
      console.log(response.data[0].transcription);
      setResponseData(response.data[0]);
      SetTranscription(response.data[0].transcription)
    }).catch(function (error) {
      console.error(error);
      setError(error.message);
    })
    console.log(transcription)
  };




  const yt = {
    fontSize: "50px",
    color: "red"
  }

  return (
    <>
      <div className="flex justify-center flex-col align-center">

        <div className="flex flex-row  text-center justify-center mt-10 align-center">
          <i class="fa fa-youtube-play mr-4 mt-2" style={yt}></i>
          <h1 className="text-[38px] underline underline-offset-8 "> YouTube Video Transcript Summarizer</h1></div>
        <div className="flex felx-row align-center justify-center mt-10 mb-10">

          <div className="form-control w-full max-w-xs">

            <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Enter youtube url" className="input input-bordered w-full max-w-xs" />
          </div>
          <button className="btn btn-priamry  align-center ml-2" onClick={handleFetch}>Fetch</button>
        </div>
        <div className="m-10">
          <div className="flex flex-col w-full border-opacity-50 mt-10 ">

            <div className="grid h-auto p-10 card bg-base-300 rounded-box place-items-center">
              <h2 className="text-lg font-bold">Transcript</h2>
              <p>{error}</p>
              <hr style={{ "width": "100%", "margin-bottom": "5px" }} />
              {responseData && (
                <p>
                  {
                    transcription.map((subtitle) => {
                      let subtitleText = '';
                      if (Array.isArray(subtitle)) {
                        subtitleText = subtitle.subtitle.join(' ');
                      } else {
                        subtitleText = subtitle;
                      }
                      return (
                        <p className="inline">{subtitleText.subtitle}</p>
                      );
                    })

                  }
                </p>)}
            </div>
            <div className="divider">-</div>
            <div className="grid h-auto card bg-base-300 rounded-box place-items-center p-10">
              <h2 className="text-lg font-bold">Summarize Text</h2>
              <hr style={{ "width": "100%", "margin-bottom": "5px" }} />

              <TextSummarizer />

            </div>
          </div>
        </div>

      </div>
      <footer>
        <p className="text-center mb-10 ">&copy;Made by Chetan & Team</p>
      </footer>

    </>
  );
}

export default ApiFetcher;
