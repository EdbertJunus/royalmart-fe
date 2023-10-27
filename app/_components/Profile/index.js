"use client";

import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

const Profile = () => {
  return (
    <Menu>
      <MenuButton as={Avatar} aria-label="profile" size={"md"} />
      <MenuList>
        <MenuItem>logo</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Profile;
