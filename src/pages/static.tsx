import { GetStaticProps, NextPage } from "next";
import { ReactNode, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";

interface ApiResponse {
  name: string;
  timestamp: Date;
}

export const getStaticProps: GetStaticProps = async () => {
  const staticData = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/hello`).then(res => res.json());

  return {
    props: {
      staticData,
    },
    revalidate:10
  };
};

const Static: NextPage = (props: {
  children?: ReactNode;
  staticData?: ApiResponse;
}) => {
  const [clientSideData, setClientSideData] = useState<ApiResponse>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch("/api/hello").then((res) => res.json());
    setClientSideData(data);
  };

  return (
    <Container tag="main">
      <h1 className="my-5">Como funcionam as renderizações no Next.Js</h1>

      <Row>
        <Col>
          <h3>Gerado estaticamente pelo build </h3>
          <h2>{props.staticData?.timestamp.toString()}</h2>
        </Col>
        <Col>
          <h3>Gerado no cliente: </h3>
          <h2>{clientSideData?.timestamp.toString()}</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default Static;
