import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Input,
} from "@chakra-ui/react";

const SalesUpload = () => {
  return (
    <Card mt={10} w={{ base: "100%", md: "50%" }}>
      <CardHeader>
        <Heading size="md">Sales</Heading>
        <Flex flexWrap={"wrap"} mt={4} gap={3}>
          <Badge>December 22</Badge>
          <Badge>December 22</Badge>
          <Badge>December 22</Badge>
          <Badge>December 22</Badge>
          <Badge>December 22</Badge>
          <Badge>December 22</Badge>
        </Flex>
      </CardHeader>
      <CardBody>
        <Input type="file" />
      </CardBody>
      <Button borderTopRadius={0}>Upload</Button>
    </Card>
  );
};

export default SalesUpload;
