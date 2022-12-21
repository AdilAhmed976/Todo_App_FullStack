import { Flex } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { getLocalData } from '../../utils/localStorage'

export const Pending = () => {

    const [tokenof,setTokenof] = useState("")

    // const url = "http://localhost:8080/todo"
    useEffect(() => {
console.log("IOHIPSIPSJPISJOJDODS")
        // axios.get("http://localhost:8080/todo") 
        //     .then(res=> console.log(res))
        //     .catch(err=> console.log(err))
        //     setTokenof( getLocalData("token"))
        // return () => {
        
        // }
        }, [])
        console.log(tokenof)
  return (
    <div>
        <Flex border={"2px solid red"}  >
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae debitis vel assumenda non reiciendis impedit nulla excepturi itaque laborum unde! Amet magni illum ducimus tempore quibusdam accusamus nam earum blanditiis!
        </Flex>
        {/* <Outlet/> */}
    </div>
  )
}
