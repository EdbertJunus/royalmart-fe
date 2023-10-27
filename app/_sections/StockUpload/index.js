import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Input,
} from "@chakra-ui/react";

const StockUpload = () => {
  return (
    <Card mt={10} w={{ base: "100%", md: "50%" }}>
      <CardHeader>
        <Heading size="md">Stock</Heading>
      </CardHeader>
      <CardBody>
        <Input type="file" />
      </CardBody>
      <Button borderTopRadius={0}>Upload</Button>
    </Card>
  );
};

export default StockUpload;
