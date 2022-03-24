import React from "react";
//ANDT DESIGN COMPONENTS
import { Card, Col, Row, List, Select, DatePicker } from "antd";
//APP COMPONENTS
import GlobalStatistic from "../GlobalStatistic/GlobalStatistic";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const data = [
  {
    title: "Gourmandise 1",
  },
  {
    title: "Gourmandise 2",
  },
  {
    title: "Gourmandise 3",
  },
  {
    title: "Gourmandise 4",
  },
];

export const options = {
  indexAxis: "x",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Horizontal Bar Chart",
    },
  },
};

const labels = [
  "Gourmandise 1",
  "Gourmandise 2",
  "Gourmandise 3",
  "Gourmandise 4",
  "Gourmandise 5",
  "Gourmandise 6",
  "Gourmandise 7",
  "Gourmandise 8",
  "Gourmandise 9",
];

export const dataChart = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [25, 50, 10, 100, 150, 23, 85, 69, 70],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const { Option } = Select;
const Dashboard = () => {
  return (
    <Row gutter={[30, 30]}>
      <Col xs={{ span: 24 }}>
        <Card title="Paramétre de statistique">
          <Col xs={{ span: 24 }}>
            <Select allowClear placeholder="Gourmandise ?">
              <Option value="all">Toutes Gourmandises</Option>
            </Select>
            <DatePicker.RangePicker
              placeholder={["Date Début", "Date Fin"]}
              style={{ marginLeft: "20px" }}
            />
          </Col>
          <br></br>
          <Col xs={{ span: 24 }}>
            <Select
              allowClear
              placeholder="Filter par ?"
              style={{ width: "100%" }}
            >
              <Option value=""></Option>
              <Option value=""></Option>
              <Option value=""></Option>
            </Select>
            <br />
            <br />
            <a
              class="button button-primary button-wide-mobile button-sm"
              href="/admin#0"
            >
              Valider
            </a>
          </Col>
        </Card>
      </Col>
      <Col span={18}>
        <div style={{ display: "flex" }}>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <GlobalStatistic description={"Nbr de visite total"} value={54} />
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <GlobalStatistic description={"Nbr de visite total"} value={54} />
          </Col>
        </div>
        <br />
        <Col xs={{ span: 24 }}>
          <Card>
            <Bar options={options} data={dataChart} />
          </Card>
        </Col>
      </Col>
      <Col span={6}>
        <Col xs={{ span: 24 }}>
          <Card title="Top Gourmandise">
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<a style={{ color: "black" }}>{item.title}</a>}
                    description="GOurmandise decription"
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Col>
    </Row>
  );
};
export default Dashboard;
