import MainLayout from './layouts/MainLayout'
import { useDirection } from './hooks/useDirection'
import Hero from './sections/Hero'
import About from './sections/About'
import Classes from './sections/Classes'
import AppSection from './sections/AppSection'

function App() {
  useDirection()

  return (
    <MainLayout>
      <Hero />
      <About />
      <Classes />
      <AppSection />
    </MainLayout>
  )
}

export default App