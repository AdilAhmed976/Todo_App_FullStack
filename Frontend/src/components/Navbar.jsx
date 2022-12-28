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
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>

        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} >
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}>
           <svg
              xmlns="http://www.w3.org/2000/svg"
              width="150"
              height="40"
              version="1"
              viewBox="0 0 487 123"
            >
              <path
                d="M571 1058c30-57 362-644 369-651 6-7 390 649 390 667 0 3-173 6-385 6H559l12-22zM2304 1021c-52-24-81-65-96-136-21-105 21-209 99-241 42-18 124-18 166 0 102 42 139 225 66 328-28 39-91 68-149 68-25 0-63-9-86-19zm153-67c46-29 55-169 15-224-39-52-126-50-166 3-28 38-30 159-3 200 29 44 101 54 154 21zM3209 1031c-84-28-123-90-123-201 0-61 4-83 23-116 39-69 122-102 209-83 91 19 136 85 136 199 0 90-25 146-79 180-38 24-124 35-166 21zm135-90c20-21 29-42 33-83 10-102-32-168-107-168s-117 66-107 169c5 46 11 61 37 84 43 39 106 38 144-2zM1840 1000v-30h120V630h80v340h55c41 0 55 4 55 14 0 8 3 21 6 30 5 14-12 16-155 16h-161v-30zM2670 829V628l113 3c133 5 177 24 208 93 27 60 25 159-3 216-35 69-85 90-215 90h-103V829zm199 128c45-23 63-59 63-126 0-73-18-106-69-127-19-8-54-14-76-12l-42 3-3 124c-1 69 0 131 2 138 7 17 92 17 125 0zM3776 1021c-5-8-136-381-136-388 0-2 17-3 39-3 37 0 39 2 51 45l13 45h164l13-45c12-43 14-45 51-45 22 0 39 2 39 5s-30 93-66 200l-66 195h-49c-26 0-50-4-53-9zm83-158c11-39 21-74 21-77s-25-6-55-6-55 3-55 7c0 24 53 163 60 156 4-4 17-40 29-80zM4080 830V630h80v150h55c103 0 155 42 155 125 0 92-52 125-194 125h-96V830zm194 124c9-9 16-32 16-54 0-47-18-60-84-60h-46v130h49c32 0 55-6 65-16zM4452 828l3-203 38-3 37-3v161h71c67 0 73 2 105 34 29 29 34 41 34 80 0 102-50 136-200 136h-90l2-202zm182 131c33-15 43-61 22-94-14-22-24-25-71-25h-55v130h40c21 0 50-5 64-11zM457 768C329 550 130 197 133 194c5-5 767-17 767-12 0 6-378 669-385 676-2 2-28-38-58-90zM1341 809c-17-29-105-182-195-339L981 185l195-3c107-1 281-1 388 0l194 3-180 315c-98 173-185 326-192 339-14 25-14 25-45-30zM2680 405c0-50 4-85 10-85s10 35 10 85-4 85-10 85-10-35-10-85zM2900 405c0-84 16-119 22-49 3 36 29 66 44 51 4-4 11-26 15-50l6-42 2 51c1 57-14 73-50 54-17-10-19-7-19 30 0 22-4 40-10 40s-10-35-10-85zM1867 405c-26-53-33-75-23-75 8 0 16 7 20 15 8 22 75 20 92-2 7-10 15-15 19-12 5 6-60 149-68 149-1 0-19-34-40-75zm58 5l16-30h-31c-16 0-30 2-30 5 0 7 23 55 26 55 2 0 10-13 19-30zM4420 445c0-33-1-34-30-29-38 8-60-10-60-47 0-33 24-49 69-46l31 2v78c0 42-2 77-5 77s-5-16-5-35zm-22-44c8-4 12-19 10-32-2-18-9-24-28-24-28 0-39 27-20 50 14 17 20 18 38 6zM2740 460c0-5 5-10 10-10 6 0 10 5 10 10 0 6-4 10-10 10-5 0-10-4-10-10zM2018 419c-21-12-24-59-6-77 7-7 26-11 43-11l30 1-30 7c-25 5-30 11-30 36s4 30 28 33c15 2 25 8 22 13-8 12-35 11-57-2zM2115 410c-15-16-17-26-9-48s16-27 44-29c19 0 25 1 12 4-47 10-52 73-5 73 13 0 21 4 18 10-10 17-41 11-60-10zM2228 419c-21-12-24-59-6-77 15-15 61-15 76 0 17 17 15 54-4 72-18 18-41 20-66 5zm60-35c4-25-22-49-43-40-15 5-21 47-8 60 14 14 48 1 51-20zM2381 421c-8-5-20-7-28-4-10 4-13-7-13-46 0-28 5-51 10-51 6 0 10 15 10 33 0 34 15 57 37 57 8 0 13-14 13-39 0-22 5-43 10-46 6-4 10 5 10 20 0 33 17 65 34 65s26-22 26-63c0-23 3-28 11-20 15 15 2 90-17 97-9 3-23 2-33-3-10-6-23-6-32 0-17 11-21 11-38 0zM2581 421c-8-5-20-7-28-4-10 4-13-11-13-71 0-44 4-76 10-76s10 17 10 37c0 29 3 34 12 25 7-7 18-12 25-12 18 0 53 37 53 55 0 16-34 55-47 55-5 0-14-4-22-9zm43-33c8-14 7-21-6-34-30-30-75 9-48 42 16 18 39 15 54-8zM2818 423c-27-7-22-42 7-55 33-15 32-28-2-28-20 0-24-3-16-11 7-7 23-9 37-5 34 8 34 39 1 54-30 14-33 32-4 32 11 0 17 5 14 10-6 10-9 11-37 3zM3130 420c-7-4-19-6-27-3-10 4-13-7-13-41 0-55 17-62 22-8 2 29 7 37 23 37s21-8 23-42c2-24 7-43 12-43s10 19 12 43c2 34 7 42 23 42s21-8 23-42c4-57 22-55 22 2 0 49-21 71-53 54-11-6-23-6-35 0-10 5-24 6-32 1zM3302 414c-50-34-2-111 53-86 33 15 34 64 3 86-12 9-25 16-28 16s-16-7-28-16zm53-39c0-23-5-31-22-33-26-4-41 31-22 54 20 24 44 13 44-21zM2740 370c0-27 5-50 10-50 6 0 10 23 10 50 0 28-4 50-10 50-5 0-10-22-10-50zM3410 368c0-26 5-48 10-48 6 0 10 16 10 36 0 27 5 37 20 41 30 8 24 20-10 20-29 0-30-2-30-49zM3502 408c-17-17-15-53 4-72 18-19 60-21 70-4 5 7 1 9-13 6-24-6-56 9-48 23 4 5 22 9 40 9 31 0 34 2 26 23-9 25-59 35-79 15zm58-13c11-13 8-15-20-15s-31 2-20 15c7 8 16 15 20 15s13-7 20-15zM3742 408c-19-19-15-66 7-78 26-13 61-13 61 1 0 6-6 9-12 6-16-5-48 10-48 23 0 6 16 10 36 10 31 0 35 3 32 23-2 16-11 23-33 25-17 2-36-3-43-10zm56-16c2-7-7-12-22-12-27 0-35 15-13 23 17 7 30 3 35-11zM3862 375c12-25 25-45 28-45 7 0 50 73 50 84 0 17-18 2-32-26l-15-33-17 33c-26 50-39 38-14-13zM3972 408c-17-17-15-53 4-72 18-19 60-21 70-4 5 7 1 9-13 6-24-6-56 9-48 23 4 5 22 9 40 9 31 0 34 2 26 23-9 25-59 35-79 15zm58-13c11-13 8-15-20-15s-31 2-20 15c7 8 16 15 20 15s13-7 20-15zM4091 365l1-50 10 43c5 25 15 42 24 42 8 0 14 4 14 9s-11 8-25 7c-23-1-25-4-24-51zM4160 411c0-5 7-26 16-47s13-50 10-66c-10-51 10-29 37 40 30 74 31 82 18 82-5 0-12-13-16-30-10-43-22-45-35-5-10 31-30 49-30 26zM4482 408c-16-16-15-63 1-77 8-6 30-10 50-9l37 1v94l-38 1c-21 1-44-4-50-10zm66-34c4-25-20-47-42-38-16 6-22 45-9 58 14 14 48 1 51-20zM4600 417c0-3 9-27 21-53 16-38 18-53 10-72-13-28-14-32-2-32 7 0 24 36 68 148 3 6 0 12-5 12-6 0-16-16-23-35-16-43-24-44-35-3-5 17-15 33-22 36-6 2-12 1-12-1zM3620 318c0-25 3-29 10-18 13 20 13 50 0 50-5 0-10-15-10-32zM4720 330c0-5 7-10 15-10s15 5 15 10c0 6-7 10-15 10s-15-4-15-10z"
                transform="matrix(.1 0 0 -.1 0 123)"
              ></path>
            </svg>
          </Text>

          <Spacer />

          <Flex display={{ base: 'none', md: 'flex' }} margin={"auto"} ml={10}>
            <DesktopNav />
          </Flex>

          <Spacer />

        </Flex>
        {token ? <Button onClick={()=> {
          dispatch(logOutTheUser())
          navigate("/login")
      }} rightIcon={<FaRegIdBadge/>} border colorScheme='white' variant='filled'>
            Logout
          </Button> : <Stack

          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>

          <Link to={"/login"} >
            <Button
              color={'black'}
              as={'a'}
              fontSize={'sm'}
              fontWeight={400}
              // variant={'link'}
              
              >
              Log In
            </Button>
          </Link>

          <Link to="/signup">
            <Button
              display={{ md: 'inline-flex' }}
              border={'1px solid black'}
              fontSize={'sm'}
              fontWeight={600}
              // color={'balck'}
              bg={'none'}
              _hover={{
                bg: 'rgb(48,112,240)',
                color: 'white'
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
      bg={useColorModeValue('white', 'gray.800')}
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
        _hover={{
          textDecoration: 'black',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
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