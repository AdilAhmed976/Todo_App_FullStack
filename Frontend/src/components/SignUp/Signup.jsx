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
      <Flex h={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
            </FormControl>
            <Stack spacing={10}>
              
              <Button
                isLoading={isLoading ? isLoading : false}
                onClick={handleSignUp}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
              <Text>Already have a Account ? <Link to="/login" > Log In</Link></Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    );
  }