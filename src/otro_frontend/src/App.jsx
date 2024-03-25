import  Home  from './components/Home';
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function App(){
    return(
        <div className='contanier' style={{width: "100%"}} >
            {/* <Menu /> */}
            <Home />
            {/* <Login /> */}
        </div>
    )
}

export default App