import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js", {
      scope: "./",
    })
    .then((registration) => {
      let serviceWorker;
      if (registration.installing) {
        serviceWorker = registration.installing;
        // @ts-expect-error document object is always available
        document.querySelector("#sw-status").textContent = "installing";
      } else if (registration.waiting) {
        serviceWorker = registration.waiting;
        // @ts-expect-error document object is always available
        document.querySelector("#sw-status").textContent = "waiting";
      } else if (registration.active) {
        serviceWorker = registration.active;
        // @ts-expect-error document object is always available
        document.querySelector("#sw-status").textContent = "active";
      }
      if (serviceWorker) {
        // logState(serviceWorker.state);
        serviceWorker.addEventListener("statechange", (e) => {
          // logState(e.target.state);
          // @ts-expect-error document object is always available
          document.querySelector("#sw-state").textContent = e.target.state;
        });
      }
    })
    .catch((error) => {
      // @ts-expect-error document object is always available
      document.querySelector("#sw-error").textContent = error.message;
    });
} else {
  // @ts-expect-error document object is always available
  document.querySelector("#sw-error").textContent = "Service Worker is not supported";
}
