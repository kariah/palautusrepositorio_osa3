import React from 'react'

const Notification = (props) => {
    const infoMessage = props.infoMessage
    const errorMessage = props.errorMessage

    if (infoMessage === null && errorMessage === null) {
        return null
    }

    console.log("infomessage ", infoMessage)
    console.log("errorMessage ", errorMessage)


    if (infoMessage !== null) {
        return (
            <div className="info">
                {infoMessage} 
            </div>)
    }
    else if (errorMessage !== null) {
        return (
            <div className="error">
                {errorMessage} 
            </div>)
    }
}
//return (
//    <div className="error">
//        {message}
//        Tämä on message
//    </div>
//)


export default Notification