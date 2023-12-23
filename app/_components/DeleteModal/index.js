import { deleteSales } from "@/app/_redux/slices/salesSlice";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const DeleteModal = ({ isOpen, onClose, salesList }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();
  const dispatch = useDispatch();

  const onDeleteSubmit = (data) => {
    dispatch(deleteSales(data.periode));
    cancelDelete();
  };

  const cancelDelete = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Sales Data</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onDeleteSubmit)}>
            <FormControl isInvalid={errors.periode}>
              <FormLabel>Periode</FormLabel>
              <Controller
                name="periode"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <CheckboxGroup {...rest}>
                    <Stack direction={"column"}>
                      {salesList.data &&
                        salesList.data.map((item, idx) => {
                          return (
                            <Checkbox value={item} key={idx}>
                              {item}
                            </Checkbox>
                          );
                        })}
                    </Stack>
                  </CheckboxGroup>
                )}
                rules={{
                  required: { value: true, message: "Pilih minimal satu" },
                }}
              />
              <FormErrorMessage>{errors.periode?.message}</FormErrorMessage>
            </FormControl>
            <Flex my={8} justify={"flex-end"}>
              <Popover>
                <PopoverTrigger>
                  <Button colorScheme="red">Delete</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Confirmation!</PopoverHeader>
                  <PopoverBody>
                    Yakin mau dihapus data diatas ?
                    <Flex>
                      <Button colorScheme="green" type="submit" mr={2}>
                        Yes
                      </Button>
                      <Button colorScheme="red" onClick={cancelDelete}>
                        No
                      </Button>
                    </Flex>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
