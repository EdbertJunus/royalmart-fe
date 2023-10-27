"use client";
import { AttachmentIcon } from "@chakra-ui/icons";
import {
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  Code,
  Icon,
  IconButton,
} from "@chakra-ui/react";
// import { FiFile } from "react-icons/fi";
// import { useController } from "react-hook-form";
import { useRef } from "react";

const FileUpload = ({
  name,
  placeholder,
  acceptedFileTypes,
  control,
  children,
  isRequired = false,
}) => {
  const inputRef = useRef();

  return (
    <FormControl isRequired w={"50%"}>
      <FormLabel htmlFor="writeUpFile">{children}</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <AttachmentIcon />
        </InputLeftElement>
        {/* <input
          type="file"
          accept={acceptedFileTypes}
          name={name}
          ref={inputRef}
          inputRef={ref}
          style={{ display: "none" }}
        ></input> */}
        <Input
          placeholder={placeholder || "Your file ..."}
          onClick={() => inputRef.current.click()}
        />
      </InputGroup>
      {/* <FormErrorMessage>{invalid}</FormErrorMessage> */}
    </FormControl>
  );
};

export default FileUpload;
