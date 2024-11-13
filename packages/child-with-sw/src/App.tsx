import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const firstCall = useRef<boolean>(true)
  const [message, setMessage] = useState<string>('-')
  useEffect(()=>{
    const callApi = async () => {
      if (firstCall.current === true) {
        firstCall.current = false
        const res = await fetch('https://example.com/test-api')
        // const res = await fetch('/test-api')
        const json = await res.json()
        console.debug('Test API response:', json)
        setMessage(json.message)
      }
    }
    callApi();
  },[])

  return (
    <>
      <h1>Child with SW</h1>
      <div className="card">
        <div style={{display: "flex"}}>
          <span>Status: </span>
          <span id="sw-status" />
        </div>
        <div style={{display: "flex"}}>
          <span>State: </span>
          <span id="sw-state" />
        </div>
        <div style={{display: "flex"}}>
          <span>Test API response: </span>
          <span>{message}</span>
        </div>
        <div style={{display: "flex"}}>
          <span>Error: </span>
          <span id="sw-error" />
        </div>
      </div>
    </>
  )
}

export default App
