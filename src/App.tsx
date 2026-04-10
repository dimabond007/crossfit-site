
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDirection } from './hooks/useDirection'
import SchedulePage from './pages/SchedulePage'
import HomePage from './pages/HomePage'

function App() {
  useDirection()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/schedule" element={<SchedulePage />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App