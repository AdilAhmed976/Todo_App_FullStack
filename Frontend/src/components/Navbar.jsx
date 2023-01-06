import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Spacer,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getLocalData, SaveTheToken } from '../utils/localStorage';
import { FaRegIdBadge } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logOutTheUser } from '../Redux/AuthReducer/action';
import { RiLogoutCircleLine } from "react-icons/ri";
import { BsArrowBarRight } from "react-icons/bs";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const token = getLocalData("token")
  const isAuth = useSelector((store) => store.AuthReducer.isAuth);
  const isLoading = useSelector((store) => store.AuthReducer.isLoading);

  const dispatch = useDispatch()
  // const [logincheck,setLoginCheck] = ()
  const [updateNavbar, setUpdateNavbar] = useState(false)
  const navigate =useNavigate()
  // this function will change the navbar color
  const scrollBarHandler = () => {
    if (window.scrollY >= 1) {
      setUpdateNavbar(true)
    }
    else {
      setUpdateNavbar(false)
    }
  }
// console.log(logincheck)
  window.addEventListener("scroll", scrollBarHandler)

  return (
    <Box
      position={"sticky"}
      top={'0px'} zIndex={"999"} >
      <Flex
        // bg={"rgb(0,104,74)"}
        fontFamily={"Roboto Mono"}
        fontWeight={"500"}
        shadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;" 
        bg={updateNavbar ? "white" : "rgb(0,30,43)"}
        color={updateNavbar? 'black' :"white" }
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        // borderStyle={'solid'}
        // borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >

        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon  w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>

        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} >
          <Text width={{ base: "70%", sm: "42%", md: "12%", lg: "12%", xl: "12%",'2xl': '12%'}}
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}>
              <img style={{width:"100%"}} src={updateNavbar ? "https://i.imgur.com/MUpQoOE.png" : "https://i.imgur.com/iufOl7v.png" } alt="" srcset="" />
          </Text>

          <Spacer />

          <Flex display={{ base: 'none', md: 'flex' }} margin={"auto"} ml={10}>
            <DesktopNav />
          </Flex>

          <Spacer />

        </Flex>
        {token ? 
        <Button 
          bg={"rgb(23,194,46)"}
          border={"2px solid rgb(23,194,46)"}
          _hover={{bg:"rgb(23,194,46)", border:"2px solid white", borderColor:"2px solid white"}} 
          _focus={{bg:"rgb(23,194,46)",borderColor:"2px solid white"}} 
          color="white"
          shadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;"
          onClick={()=> {
            dispatch(logOutTheUser())
            navigate("/login")
          }} 
          rightIcon={<RiLogoutCircleLine color="white" />} 
          fontSize={{ base: '12px', md: '16px' }} 
          colorScheme='white' 
          variant='filled'
        >
            Logout
        </Button> 
          : 
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          <Link to={"/login"} >
            <Button
              bg={"rgb(23,194,46)"}
              border={"2px solid rgb(23,194,46)"}
              _hover={{bg:"rgb(23,194,46)", border:"2px solid white", borderColor:"2px solid white"}} 
              _focus={{bg:"rgb(23,194,46)",borderColor:"2px solid white"}} 
              color="white"
              shadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;"
              fontSize={'sm'}
              fontWeight={400}
              >
              Log In
            </Button>
          </Link>

          <Link to="/signup">
            <Button
              display={{ md: 'inline-flex' }}
              border={'1px solid white'}
              fontSize={'sm'}
              fontWeight={600}
              // color={'balck'}
              bg={'none'}
              _hover={{
                bg: 'none',
                color: 'white',
                borderColor:"white"
              }}>

              Sign Up
            </Button>
          </Link>
        </Stack> }
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={{base:8,sm:80, md:18,lg:20,xl:18,"2xl":40}} >
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                to={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent 
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack  >
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link 
      to={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}  >
        <Box >
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}>
            {label}  
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={"rgb(0,30,43)"}
      color={"white"}
      fontFamily="Roboto Mono"
      p={4}
      display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        to={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        color={"rgb(23,194,46)"}
        _hover={{
          textDecoration: 'black',
        }}>
          <Box width={"100%"} color='rgb(23,194,46)' display={"flex"} alignItems="center" gap="10px" _hover={{borderBottom:"1px solid rgb(23,194,46)"}} >
            <BsArrowBarRight color='rgb(23,194,46)' />
            <Text
              fontWeight={600}
              color={"white"}>
              {label}
            </Text>
          </Box>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} to={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NavItem = {
  label: String,
  subLabel: String,
  children: String,
  href: String,
}

const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'All Todos',
    href: '/todo',
  },
  {
    label: 'Filter',
    href: '/filter',
  },
  {
    label: 'Completed',
    href: '/completed',
  },
  {
    label: 'Pending',
    href: "/pending"
  }
];