import logo from './logo.svg';
import './App.css';
import { store } from "./actions/store";
import { Provider } from "react-redux";
import ToDoItems from './components/ToDoItems';
import Container from '@mui/material/Container';


function App() {
  return (
      <Provider store={store}>  
        <Container maxWidth="lg" sx={{ bgcolor: "lightcyan" }}>         
          <ToDoItems />
        </Container>
      </Provider>
  );
}

export default App;
