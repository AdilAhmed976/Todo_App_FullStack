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
import { DeleteIcon } from '@chakra-ui/icons'
export const DeleteModal = ({id,getTodo}) => {
  //  export  function InitialFocus(e) {
        const { isOpen, onOpen, onClose } = useDisclosure()
      
        const initialRef = React.useRef(null)
        const finalRef = React.useRef(null)

        const [todo,SetTodo] = useState("")
        const [heading,setHeading] = useState("")
        const [status,setStatus] = useState("false")
        const [tokenof,setTokenof] = useState(getLocalData("token"))
        const toast = useToast()

        const navigate = useNavigate();

const addtodo = () => {
    

      
      let url = `https://todobackend-asac.onrender.com/todo/delete/${id}`
      const config = {
          headers:{
              "Authorization": `Bearer ${tokenof}`
          }
      };
 
      axios.delete(url,config)
      .then((response) => {
        console.log(response)
        if (response.data=="Deleted")
        toast({
          position: 'top',
          marginTop: '150px',
          description: response.data,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        // navigate("/todo")
        // onClose(true)
        getTodo()
      })  
      .catch(function (error) {
          console.log(error);
      })
}


        return (
          <>
            <Button leftIcon={<DeleteIcon/>} onClick={onOpen}>Delete</Button>     
            <Modal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Delete TODO?</ModalHeader>
                <ModalCloseButton />
                {/* <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Heading</FormLabel>
                    <Input ref={initialRef} placeholder='Heading' onChange={(e)=> {setHeading(e.target.value)} }  />
                  </FormControl>
      
                  <FormControl mt={4}>
                    <FormLabel>Todo</FormLabel>
                    <Input placeholder='Todo' onChange={(e)=> {SetTodo(e.target.value)} }  />
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
                </ModalBody> */}
      
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
