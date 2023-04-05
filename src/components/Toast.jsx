import React from 'react'
import { FaInfoCircle, FaTimesCircle, FaCheckCircle } from 'react-icons/fa'

const Toast = (props) => {

    const toast_msg = props.msg || ''
    const toast_type = props.type || ''
    let toast_color = 'blue'
    let toast_icon = <FaInfoCircle />

    switch (toast_type) {
        case 'error':
            toast_color = 'red'
            toast_icon = <FaTimesCircle />
            break
        case 'success':
            toast_color = 'green'
            toast_icon = <FaCheckCircle />
            break
        case 'info':
            toast_color = 'blue'
            toast_icon = <FaInfoCircle />
            break
        default:
            toast_color = 'blue'
    }


    return (
        // <div className="fixed right-5 top-20 px-5 py-4 border-l-8 drop-shadow-lg rounded-lg border-green-700 bg-green-500 ">
        <div className={`fixed right-5 top-20 px-5 py-4 border-l-8 drop-shadow-lg rounded-lg border-${toast_color}-700 bg-${toast_color}-500`}>
            <p className="text-sm flex items-center">
                <span className="mr-0 px-3 text-white font-extrabold text-lg">{toast_icon}</span>
                {toast_msg}
            </p>
        </div>
    )
}

export default Toast
