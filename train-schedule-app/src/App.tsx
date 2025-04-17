import './App.css'
import { ActionFunctionArgs, createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import RootLayout from './pages/RootLayout'
import Home from './pages/Home'
import TrainSchedule, {loader as trainScheduleListLoader} from './pages/TrainSchedule'
import TrainScheduleInfo, {loader as trainScheduleBuIdLoader} from './pages/TrainScheduleInfo'
import NewTrainSchedule from './pages/NewTrainSchedule'
import EditTrainSchedule from './pages/EditTrainSchedule'
import Login, {authAction} from './pages/Login'
import { clearToken, readToken } from './utils/tokenUtil'
import { trainScheduleFormAction } from './components/TrainScheduleForm'

const router = createBrowserRouter([
  { 
    path:'', 
    element: <RootLayout/>,
    id:'root',
    loader: async ()=>{return readToken()},
    //errorElement: ,
    children: [
      { index: true, element: <Home/>},
      { path: 'train-schedule', 
        children:[
          { index: true, element: <TrainSchedule/>, loader: trainScheduleListLoader},
          { 
            path: ':id', 
            element: <TrainScheduleInfo/>,
            loader: trainScheduleBuIdLoader,
            id: 'trainSchedule',
          },
          { path: ':id/edit', element: <EditTrainSchedule/>, action: trainScheduleFormAction},
          { path: ':id/delete', action: async ({params}:ActionFunctionArgs)=>{
              console.log('g');
              await fetch('http://localhost:3000/train-schedule/'+params.id,{
                method: "DELETE",
                headers:{
                  Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdnQGdnLmNvbSIsInN1YiI6MSwiaWF0IjoxNzQ0ODg3NTk0LCJleHAiOjE3NDQ5NzM5OTR9.fvL6a_0ZGw7VVleRoXsrAoAbzmWbhHaAQJJc3tppeLI'
                }
              });
              console.log(params.id);
              return redirect('/train-schedule');
            }
          },
          { path: 'add', element: <NewTrainSchedule/>, action: trainScheduleFormAction}
        ]
      },
      { path: 'auth', element: <Login/>, action: authAction},
    ]
  },
  { path: 'logout', action: async ()=>{
    clearToken(); 
    return redirect('/')
  }}
])

function App() {
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App
