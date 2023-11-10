import { checkStock, postStock } from "@/app/_redux/slices/stockSlice";
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
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const StockUpload = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const stockData = useSelector((state) => state.stock.data);

  const onSubmit = (data) => {
    if (data.stockFile[0].type != "application/vnd.ms-excel") {
      setError("stockFile", {
        type: "filetype",
        message: "File needs to be excel (.xls)",
      });
    } else {
      let formData = new FormData();
      formData.append("stockFile", data.stockFile[0]);
      dispatch(postStock(formData));
      reset();
    }
  };

  useEffect(() => {
    dispatch(checkStock());
  }, []);

  return (
    <Box w={{ base: "100%", md: "50%" }}>
      <Card>
        <CardHeader pb={0}>
          <Heading size="md">Stock</Heading>

          <Text mt={1} color={stockData === "exist" ? "orange" : "red"}>
            {stockData === "exist" ? "Stock Uploaded" : "Stock Empty"}
          </Text>
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
