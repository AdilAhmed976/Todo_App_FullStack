import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Input,
    FormControl,
    FormLabel,
    HStack,
    Radio,
    RadioGroup,
    useToast,
  } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { getLocalData } from '../../utils/localStorage'
import axios from 'axios'
import { FaRegEdit } from 'react-icons/fa'
export const EditModal = ({id,getTodo,headProp,todoProp}) => {
  //  export  function InitialFocus(e) {
        const { isOpen, onOpen, onClose } = useDisclosure()
      
        const initialRef = React.useRef(null)
        const finalRef = React.useRef(null)

        const [todo,SetTodo] = useState(todoProp || "")
        const [heading,setHeading] = useState(headProp || "")
        const [status,setStatus] = useState("false")
        const [tokenof,setTokenof] = useState(getLocalData("token"))
        const toast = useToast()

        const navigate = useNavigate();

const addtodo = () => {
    console.log(id)
    if (todo&&heading&&status) {

      const data = {
        Heading:heading,
        Todo: todo,
        Status:status
      }
      let url = `https://todobackend-asac.onrender.com/todo/edit/${id}`
      const config = {
          headers:{
              "Authorization": `Bearer ${tokenof}`
          }
      };
      console.log(config)
      axios.patch(url,data,config)
      .then((response) => {
        console.log(response)
        if (response.data.msg=="success")
        toast({
          position: 'top',
          marginTop: '150px',
          description: response.data.msg,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        // navigate("/todo")
        onClose(true)
        getTodo()
      })  
      .catch(function (error) {
          console.log(error);
      })
    }
    else {
      toast({
        position: 'top',
        marginTop: '150px',
        description: "Please fill all the inputs",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
// return
}


        return (
          <>
            <Button leftIcon={<FaRegEdit/>} onClick={onOpen}>Edit</Button>     
            <Modal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit TODO</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Heading</FormLabel>
                    <Input ref={initialRef} value={heading} placeholder='Heading' onChange={(e)=> {setHeading(e.target.value)} }  />
                  </FormControl>
      
                  <FormControl mt={4}>
                    <FormLabel>Todo</FormLabel>
                    <Input value={todo} placeholder='Todo' onChange={(e)=> {SetTodo(e.target.value)} }  />
                  </FormControl>

                  <FormControl mt={4}>
                  <FormLabel as='legend'>Status</FormLabel>
                    <RadioGroup 
                        defaultValue='false' 
                        onClick={(e)=> {setStatus(e.target.value)}} 
                    >
                        <HStack spacing='24px'>
                        <Radio value={"true"}>Completed</Radio>
                        <Radio value={"false"}>Not Completed</Radio>
                        </HStack>
                    </RadioGroup>
                  </FormControl>
                </ModalBody>
      
                <ModalFooter>
                  <Button colorScheme='blue' mr={3}  onClick={() =>{addtodo()}} >
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )
      // }
}
