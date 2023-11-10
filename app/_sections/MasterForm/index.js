import {
  getMaster,
  setData,
  setMasterStatus,
} from "@/app/_redux/slices/masterSlice";
import { outputExcel } from "@/app/_utils";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const MasterForm = ({ salesList }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm();

  const dispatch = useDispatch();

  const master = useSelector((state) => state.master);
  const stockData = useSelector((state) => state.stock.data);

  useEffect(() => {
    if (master.status == 200) {
      // const jsonData = JSON.parse(master.data.replace(/\bNaN\b/g, "null"));
      const jsonData = JSON.parse(master.data);
      const columns = Object.keys(jsonData[0]);
      outputExcel(jsonData, columns, "master.xlsx");

      dispatch(setData({}));
      dispatch(setMasterStatus(400));
    }
  }, [master]);

  const onSubmit = (data) => {
    if (data.monthSales == false) {
      setError("monthSales", {
        type: "required",
        message: "Minimum choose one month",
      });
    } else {
      const periode = data.monthSales.join(",");
      let formData = new FormData();
      formData.append("periode", periode);

      dispatch(getMaster(formData));

      reset();
    }
  };

  return (
    <Box w={"100%"}>
      <Card>
        <CardHeader pb={0}>
          <Heading size="md">Master Form</Heading>
        </CardHeader>
        <CardBody>
          {salesList?.data?.length > 0 && stockData === "exist" ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.monthSales}>
                <FormLabel mb={2}>Choose Sales : </FormLabel>

                <Flex flexWrap={"wrap"} gap={3}>
                  {salesList.data &&
                    salesList?.data.map((item, idx) => {
                      return (
                        <Checkbox
                          key={idx}
                          {...register("monthSales")}
                          value={item}
                        >
                          {item}
                        </Checkbox>
                      );
                    })}
                </Flex>
                <FormErrorMessage>
                  {errors.monthSales?.message}
                </FormErrorMessage>
              </FormControl>
              <Box mt={4} textAlign={"right"}>
                <Button type="submit">Create Master</Button>
              </Box>
            </form>
          ) : (
            <Text>Please Fill the stock and sales Data</Text>
          )}
        </CardBody>
      </Card>
    </Box>
  );
};

export default MasterForm;
