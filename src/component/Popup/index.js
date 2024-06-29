import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import './index.js'

export default function Popup() {
    const [showPrompt, setShowPrompt] = useState(true);
    const [inputValue, setInputValue] = useState('');

    // Function to handle input change
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Do something with the input value (e.g., submit a form)
        console.log('Submitted value:', inputValue);
        // Close the prompt box
        setShowPrompt(false);
    };

    // Close the prompt box after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPrompt(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div>
                {/* Prompt box */}
                {showPrompt && (
                    <div className="prompt-box-overlay">
                        <div className="prompt-box">
                            
                        </div>
                    </div>
                )}
            </div>


        </>
    )
}
