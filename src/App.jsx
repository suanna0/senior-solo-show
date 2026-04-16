import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './components/Home'
import About from './components/About'
import Info from './components/Info'
import Footer from './components/Footer'
import PreLaunch from './components/PreLaunch'

const LAUNCH_DATE = new Date('2026-04-24T00:00:00')

export default function App() {
  if (new Date() < LAUNCH_DATE) {
    return <PreLaunch />
  }

  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
