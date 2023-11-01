"use client";

import { logout } from "@/app/_redux/slices/authSlice";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  const { push } = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    push("/login");
  };

  return (
    <Flex alignItems={"center"}>
      <Heading size={"md"} mr={3}>
        Hi, Edbert
      </Heading>
      <Menu>
        <MenuButton as={Avatar} aria-label="profile" size={"md"} />
        <MenuList>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Profile;
