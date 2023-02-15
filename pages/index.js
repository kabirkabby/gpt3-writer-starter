import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState(''); 
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  
  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Generate Content for your Website!</h1>
          </div>
          <div className="header-subtitle">
            <h2>Tell us what your website is about and We will generate a Hero text and an Article on it.</h2>
          </div>
        </div>
        <div className="prompt-container">
            <textarea
                  className="prompt-box"
                  placeholder="Type here"
                  value={userInput}
                  onChange={onUserChangedText}
            />;
           <div className="prompt-buttons">
              <a
                className={isGenerating ? 'generate-button loading' : 'generate-button'}
                onClick={callGenerateEndpoint}
              >
                <div className="generate">
                {isGenerating ? <span class="loader"></span> : <p>Generate</p>}
                </div>
              </a>
            </div>
              {apiOutput && (
                  <div className="output">
                    <div className="output-header-container">
                      <div className="output-header">
                        <h3>Output</h3>
                      </div>
                    </div>
                    <div className="output-content">
                      <p>{apiOutput}</p>
                    </div>
                  </div>
                )}   
        </div>
      </div>
      <div className='foot'>
        <h3> Made By Kabir Singh</h3>
      </div>
    </div>
  );
};


export default Home;
