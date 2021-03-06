import React from "react";
//  ANT DESIGN COMPONENTS
import { Card, Col, Row, Statistic } from "antd";

//ICONS
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

const GlobalStatistic = ({ title, description, value, suffix }) => {
  return (
    <div className="site-statistic-demo-card">
      <Card title={title}>
        <Statistic
          title={description}
          value={value}
          precision={0}
          valueStyle={{ color: "#3f8600" }}
          suffix={suffix}
        />
      </Card>
    </div>
  );
};

export default GlobalStatistic;
