import React, { useState } from 'react';
import OptInput from './otp-input';

const PhoneOtpForm = () => {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [showOtpInput, setShowOtpInput] = useState(false)

    const handlePhoneNumber = (event) => {
        setPhoneNumber(event.target.value)
    }

    const handlePhoneSubmit = (event) => {
        event.preventDefault()
        // phone validation
        const regex = /[^0-9]/g;
        if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
            alert("Invalid Phone Number")
            return;
        }

        // call be api
        // show api failed
        setShowOtpInput(true)
    };

    const onOtpSubmit = (otp) => {
        console.log("Login Successful with Otp", otp);
    };

    return (
        <div>
            {!showOtpInput ? (
                <form onSubmit={handlePhoneSubmit}>
                    <input 
                        type="text" 
                        value={phoneNumber} 
                        onChange={handlePhoneNumber} 
                        placeholder="Enter Phone Number" 
                    />
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <div>
                    <p>Enter OTP sent to {phoneNumber}</p>
                    <OptInput length={4} onOtpSubmit={onOtpSubmit} />
                </div>
            )}
        </div>
    );
};

// --------------------------


// --------------------------

export default PhoneOtpForm


