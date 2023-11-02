"use client";

import { useState } from "react";

const {
  InputGroup,
  Input,
  InputRightElement,
  Button,
} = require("@chakra-ui/react");

const PasswordInput = ({ register, error, isReadOnly }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        isRequired
        isInvalid={error}
        isReadOnly={isReadOnly}
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder="Enter password"
        name="password"
        {...register("password", { required: "Password needs to be filled" })}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
export default PasswordInput;
