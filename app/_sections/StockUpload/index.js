import { postStock } from "@/app/_redux/slices/stockSlice";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const StockUpload = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    let formData = new FormData();
    formData.append("stockFile", data.stockFile[0]);
    dispatch(postStock(formData));
    reset();
  };

  return (
    <Box w={{ base: "100%", md: "50%" }}>
      <Card>
        <CardHeader>
          <Heading size="md">Stock</Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired isInvalid={errors.stockFile}>
              <FormLabel>StockFile</FormLabel>
              <Input
                name="stockFile"
                type="file"
                {...register("stockFile", {
                  required: "Need to upload stock file",
                })}
              />
              <FormErrorMessage>{errors?.stockFile?.message}</FormErrorMessage>
            </FormControl>
            <Box textAlign={"right"} mt={8}>
              <Button type="submit">Upload</Button>
            </Box>
          </form>
        </CardBody>
      </Card>
    </Box>
  );
};

export default StockUpload;
