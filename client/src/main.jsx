//import react
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
//import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
//import app
import App from './App.jsx'
//import pages
import SearchBooks from './pages/SearchBooks.jsx'
import SavedBooks from './pages/SavedBooks.jsx'

//create router
const router = createBrowserRouter([
  //define routes
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <SearchBooks />
      }, {
        path: '/saved',
        element: <SavedBooks />
      }
    ]
  }
])

//render app
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
