import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './components/3D/App.jsx'

const root = createRoot(document.querySelector('#root'))
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)