import { Col, Row, Typography } from "antd";
import React from "react";
import * as classes from "./UserRole.module.css";

import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const UserRole = () => {
  return (
    <Row className={classes.container} align={"center"}>
      <Col span={20} style={{ height: "200px" }}>
        <Typography.Title level={2}>Bienvenue à Gourmandise </Typography.Title>
        <Typography.Title level={3} type={"secondary"}>
          Continuer comme
        </Typography.Title>
      </Col>
      <Col
        className={classes.card}
        xs={{ span: 20 }}
        md={{ span: 8 }}
        align="center"
      >
        <Link to="/admin">
          <span>Administration</span>
          <ArrowRightOutlined
            style={{ color: "#c6a675", marginLeft: "15px" }}
          />
        </Link>
      </Col>

      <Col
        className={classes.card}
        xs={{ span: 20 }}
        md={{ span: 8 }}
        align="center"
      >
        <Link to="/steps">
          <span>Client</span>
          <ArrowRightOutlined
            style={{ color: "#c6a675", marginLeft: "15px" }}
          />
        </Link>
      </Col>
    </Row>
  );
};

export default UserRole;
