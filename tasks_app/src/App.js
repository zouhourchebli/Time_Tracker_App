import React from "react";
import Box from '@mui/material/Box';
import Header from "./components/Header";
import List from "./components/List";

  
function App() {
  return (
    <React.Fragment>
        <Box position='fixed'sx={{ bgcolor: '#E5E5E5', height:'100vh', width:'100vw'}} >

            <Header />
            <List />
  
        </Box>
    </React.Fragment>   
  );
}
export default App;