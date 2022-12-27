import { Box } from '@chakra-ui/react'
import React from 'react'
import { Routes,Route,} from "react-router-dom";
import { Homepage } from '../components/Homepage/Homepage';
import { Completed } from '../components/completed/Completed';
import  Login  from '../components/Login/Login';
import Signup from '../components/SignUp/Signup';
import { Pending } from '../components/pending/Pending';
import { AllTodo } from '../components/Homepage/AllTodo';
import { ReqAuth } from '../protectedRoute/ReqAuth';
import { Edit } from '../components/editpage/Edit';
import { Filters } from '../components/Filters/Filters';
export const AllRoutes = () => {
  return (
    <Box>
        <Routes>

              <Route path="/" element={<ReqAuth> <Homepage/> </ReqAuth> }/>           
              <Route path="/todo" element={ <ReqAuth> <AllTodo/> </ReqAuth>} />
              <Route path="/filter" element={ <ReqAuth> <Filters/> </ReqAuth>} />
              <Route path="/completed" element={<ReqAuth> <Completed/> </ReqAuth>} />
              <Route path="/pending" element={<ReqAuth> <Pending/> </ReqAuth> } />
              <Route path="todo/edit/:id" element={<ReqAuth> <Edit/> </ReqAuth> } />
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>

        </Routes>
    </Box>
  )
}
