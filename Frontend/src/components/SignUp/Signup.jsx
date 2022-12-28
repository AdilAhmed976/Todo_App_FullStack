import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Alert,
    AlertIcon,
    useToast,
  } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import {Link} from "react-router-dom";
import { signupCheck } from '../../Redux/AuthReducer/action';
import { useDispatch, useSelector } from 'react-redux';
  export default function Signup() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const isError = email === ''
    const toast = useToast()
    const [user,setUser] = useState(false)
    const dispatch = useDispatch()
    const isLoading = useSelector((store) => store.AuthReducer.isLoading);


    const handleSignUp = () => {
      const payload = { email, password };

      dispatch(signupCheck(payload))
        .then(function (response) {

          if (response.type == "SIGNUP_SUCCESS") {
            toast({
              position: "top",
              marginTop: "150px",
              description: response.type,
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          } else {
            toast({
              position: "top",
              marginTop: "150px",
              description: "Invalid Details",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        })
        .catch(function (error) {
          console.log("ERROR", error);
        });
    }

    return (
      <Flex 
        h={"100vh"}
        align={"center"}
        justify={"center"}
        fontFamily={"Roboto Mono"}
        bg={"rgb(0,104,74)"}
      >
      <Stack boxShadow = {"rgba(0, 0, 0, 0.35) 0px 5px 15px"}  bg={"rgb(0,30,43)"} borderRadius={"10px"}  spacing={8} mx={"auto"} maxW={"lg"} py={12} px={8}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} color={"white"} >Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'white'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          bg={"rgb(0,30,43)"}
          boxShadow = {"rgba(0, 0, 0, 0.35) 0px 5px 15px"} 
          rounded={"lg"}
          color="white"
          border={"2px solid rgb(0,104,74)"}
          p={8}
          >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input focusBorderColor='rgb(0,104,74)' type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input focusBorderColor='rgb(0,104,74)' type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
            </FormControl>
            <Stack spacing={10}>
              
              <Button
                isLoading={isLoading ? isLoading : false}
                onClick={handleSignUp}
                bg={"rgb(23,194,46)"}
                border={"1px solid rgb(23,194,46)"}
                _hover={{bg:"rgb(23,194,46)",borderColor:"2px solid white"}} 
                _focus={{bg:"rgb(23,194,46)",borderColor:"2px solid white"}} 
                color="white"
                shadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;"
                >
                Sign in
              </Button>
              <Text>Already have a Account ? <Link to="/login" style={{textDecoration:"underline",color:"rgb(23,194,46)"}} > Log In</Link></Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    );
  }