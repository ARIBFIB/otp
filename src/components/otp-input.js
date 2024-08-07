import React, { useEffect, useRef, useState } from 'react'

const OptInput = ({length = 4, onOtpSubmit = () =>{}}) => {
    const [otp, setotp] = useState(new Array(length).fill(""))
    const inputRefs = useRef([])

    useEffect(() => {
        if(inputRefs.current[0]){
            inputRefs.current[0].focus()
        }
    }, [])


    const handleChange = (e,index)=>{
        const value = e.target.value
        // NaN not a number
        if(isNaN(value)) return

        const newOtp = [...otp];
        // allow only one input
        newOtp[index] = value.substring(value.length - 1)
        setotp(newOtp)

        // submit trigger
        const combinedOtp = newOtp.join("")
        if(combinedOtp.length === length) onOtpSubmit(combinedOtp)
        if(value && index<length-1 && inputRefs.current[index+1]){
            inputRefs.current[index + 1].focus()
        }
    }
    const handleClick = (index)=>{
        inputRefs.current[index].setSelectionRange(0,1)

        //optional
        if(index>0 && !otp[index-1]){
            inputRefs.current[otp.indexOf("")].focus()
        }
    }
    const handleKeyDown = (e,index)=>{
        if(e.key==="Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]){
            inputRefs.current[index - 1].focus()
        }
    }
    
  return (
    <div>
      {
        otp.map((value, index) => {
            return( 
            <input  
            key={index} 
                type='text'
                ref={(input)=>(inputRefs.current[index] = input)} 
            value={value}
            onChange={(e)=>{handleChange(e,index)}}
            onClick={()=>{handleClick(index)}}
            onKeyDown={(e)=>{handleKeyDown(e,index)}}
            className='otpInput'
            />
            )
        })}
    </div>
  )
}

export default OptInput
