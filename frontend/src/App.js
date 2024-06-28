import React, {useState, useMemo} from 'react' // Importing React, useState, and useMemo hooks
import styled from "styled-components"; // Importing styled-components library for styling
import bg from './img/bg.png' // Importing background image
import {MainLayout} from './styles/Layouts' // Importing MainLayout styled component
import Orb from './Components/Orb/Orb' // Importing Orb component
import Navigation from './Components/Navigation/Navigation' // Importing Navigation component
import Dashboard from './Components/Dashboard/Dashboard'; // Importing Dashboard component
import Income from './Components/Income/Income' // Importing Income component
import Expenses from './Components/Expenses/Expenses'; // Importing Expenses component
import { useGlobalContext } from './context/globalContext'; // Importing the custom context hook
import Transactions from './Components/Transactions/Transactions'; 

function App() {
  const [active, setActive] = useState(1) // Defining state variable 'active' with initial value 1

  const global = useGlobalContext() // Getting global context data
  console.log(global); // Logging global context data to the console

  const displayData = () => { // Function to display components based on active state
    switch(active){
      case 1:
        return <Dashboard /> // Returning Dashboard component when active is 1
      case 2:
        return <Transactions /> // Returning Dashboard component when active is 2
      case 3:
        return <Income /> // Returning Income component when active is 3
      case 4: 
        return <Expenses /> // Returning Expenses component when active is 4
      default: 
        return <Dashboard /> // Returning Dashboard component as default
    }
  }

  const orbMemo = useMemo(() => { // Using useMemo to memoize Orb component
    return <Orb /> // Returning Orb component
  },[])

  return (
    <AppStyled bg={bg} className="App"> {/* Setting background image and className */}
      {orbMemo} {/* Rendering memoized Orb component */}
      <MainLayout> {/* Rendering MainLayout styled component */}
        <Navigation active={active} setActive={setActive} /> {/* Rendering Navigation component with active state and setActive function */}
        <main>
          {displayData()} {/* Rendering component based on active state */}
        </main>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div` // Styling for App component
  height: 100vh; // Setting height to full viewport height
  background-image: url(${props => props.bg}); // Setting background image
  position: relative; // Setting position to relative
  main{
    flex: 1; // Flex-grow value
    background: rgba(252, 246, 249, 0.78); // Background color with transparency
    border: 3px solid #FFFFFF; // Border styling
    backdrop-filter: blur(4.5px); // Applying blur effect
    border-radius: 32px; // Border radius
    overflow-x: hidden; // Hiding horizontal overflow
    &::-webkit-scrollbar{
      width: 0; // Hiding scrollbar
    }
  }
`;

export default App; // Exporting App component
