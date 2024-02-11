import React, { useState } from 'react';
import Modal from "@/components/Modal";

function Advisor({ show, onClose }) {
    const [transcription, setTranscription] = useState(""); // State to store transcription
    const [isListening, setIsListening] = useState(false); // State to track if speech recognition is active
    const [inputData, setInputData] = useState(""); // State to store input data for FastAPI call
    const [response, setResponse] = useState(""); // State to store the response from FastAPI

    let recognition = null;

    const startSpeechRecognition = () => {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = () => {
            console.log('Speech recognition started');
            setIsListening(true);
        };

        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join('');
            setTranscription(transcript); // Update transcription with the latest result
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };

        recognition.onend = () => {
            console.log('Speech recognition ended');
            setIsListening(false);
        };

        recognition.start();
    };

    const stopSpeechRecognition = () => {
        if (recognition) {
            recognition.onend = null; // Remove the onend event handler to prevent further actions after stopping
            recognition.stop();
            setIsListening(false);
        }
    };

    const handleSubmit = () => {
        // Make a fetch request to FastAPI endpoint with input data
        fetch(`http://localhost:8000/generate_response?input_data=${encodeURIComponent(inputData)}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setResponse(data.response); // Store the response
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="input-group">
                <label htmlFor="Prompt">Financial advise</label>
                <input
                    name="prompt"
                    type="text"
                    placeholder="enter your prompt"
                    required
                    value={inputData} // Bind value to inputData state
                    onChange={(e) => setInputData(e.target.value)} // Update inputData state
                />
                <button className=".btn-primary" onClick={startSpeechRecognition} disabled={isListening}>Start Voice Input</button>
                <button className=".btn-primary" onClick={stopSpeechRecognition} disabled={!isListening}>End Voice Input</button>
                <button className=".btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
            {response && <div className="response">{response}</div>}
            <style>
                {`
                .input-group {
                    margin-bottom: 20px;
                }

                label {
                    display: block;
                    margin-bottom: 5px;
                }

                input[type="text"] {
                    width: 100%;
                    padding: 8px;
                    font-size: 16px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }

                button {
                    margin-right: 10px;
                    padding: 8px 15px;
                    font-size: 16px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }

                .response {
                    margin-top: 10px;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    background-color: #black;
                }
                `}
            </style>
        </Modal>
    );
}

export default Advisor;
