import './App.css'
import Header from './Components/header/Header'
import Card from './Components/crousalCard/ProductCarousel'
import SecCard from './Components/SecondCards/SecCard'
import ThirCard from './Components/thirdCard/ThirdCard'
import img from '../public/img.jpeg'
import FourthCard from './Components/FouCard/FourthCard'
import chalImg from '../public/chal.png'
import SecCrousal from './Components/secCrousal/SecCrousal'
import makhana from '../public/makha.png'

function App() {

  return (
    <>
      <Header/>
      <Card/>
      <SecCard/>
      <FourthCard img={chalImg}/>
      <ThirCard img={img}/>
      <SecCrousal img={makhana}/>
      
    </>
  )
}

export default App
