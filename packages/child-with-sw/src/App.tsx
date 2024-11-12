import './App.css'

function App() {
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
          <span>Error: </span>
          <span id="sw-error" />
        </div>
      </div>
    </>
  )
}

export default App
