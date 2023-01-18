import { Habit } from "./components/Habit"
import './styles/teste.css'

function App() {
  return (
    <>
      <h1>Hello, World</h1>
      <Habit completed={3}/>
      <Habit completed={30}/>
      <Habit completed={10}/>
    </>
  )
}

export default App
