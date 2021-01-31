import { OpenCvProvider } from 'opencv-react'
import ReactDOM from 'react-dom'
import React from 'react'

// import reportWebVitals from './reportWebVitals'
import App from './App'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <OpenCvProvider onLoad={() => console.log('OpenCV loaded')}>
      <App />
    </OpenCvProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// reportWebVitals(console.log)
