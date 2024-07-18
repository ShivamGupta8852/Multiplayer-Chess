
// configured the routes in client side
import {createBrowserRouter} from 'react-router-dom';
import Chessboard from "../components/Chessboard.jsx";
import Home from "../components/Home.jsx";
import App from '../App.jsx';

const route = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children : [
            {
                path:"/",
                element:<Home/>,
            },
            {
                path:"/game/:roomID",
                element: <Chessboard/>,
            }
        ]
  
    }
])

export default route;