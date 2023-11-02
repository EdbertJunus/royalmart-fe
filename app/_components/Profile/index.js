"use client";

import { getUsername, logout } from "@/app/_redux/slices/authSlice";
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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TypeAnimation } from "react-type-animation";

const Profile = () => {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const userName = useSelector((state) => state.auth.username);

  useEffect(() => {
    dispatch(getUsername());
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    push("/login");
  };

  return (
    <Flex alignItems={"center"}>
      <Heading size={"md"} mr={3}>
        Hi,{" "}
        {userName && (
          <TypeAnimation
            sequence={[userName, 2800, ""]}
            speed={25}
            cursor={true}
            style={{ fontSize: "1em" }}
            repeat={Infinity}
          />
        )}
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
