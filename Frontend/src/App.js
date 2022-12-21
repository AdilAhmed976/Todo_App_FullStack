import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import { AllRoutes } from './routes/AllRoutes';


function App() {
  return (
    <Box>
      <Navbar/>
      <AllRoutes/>
    </Box>
  );
}

export default App;
