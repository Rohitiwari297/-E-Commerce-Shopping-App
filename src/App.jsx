import './App.css'
import Header from './Components/header/Header'
import Card from './Components/crousalCard/ProductCarousel'
import SecCard from './Components/SecondCards/SecCard'
import ThirCard from './thirdCard/ThirCard'
import img from '../public/img.jpeg'

function App() {

  return (
    <>
      <Header/>
      <Card/>
      <SecCard/>
      <ThirCard img={img}/>
    </>
  )
}

export default App
