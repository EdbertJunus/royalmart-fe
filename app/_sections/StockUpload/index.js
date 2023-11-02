import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Input,
} from "@chakra-ui/react";

const StockUpload = () => {
  return (
    <Box w={{ base: "100%", md: "50%" }}>
      <Card>
        <CardHeader>
          <Heading size="md">Stock</Heading>
        </CardHeader>
        <CardBody>
          <Input type="file" />
          <Box textAlign={"right"} mt={8}>
            <Button>Upload</Button>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
};

export default StockUpload;
