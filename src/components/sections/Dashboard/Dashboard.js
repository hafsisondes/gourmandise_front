import React, { useState } from "react";
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
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import axios from "../../../services/axios";
import { useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
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

const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132)",
        "rgba(54, 162, 235)",
        "rgba(255, 206, 86)",
        "rgba(75, 192, 192)",
        "rgba(153, 102, 255)",
        "rgba(255, 159, 64)",
      ],
      borderColor: ["#fff"],
      borderWidth: 1,
    },
  ],
};

const { Option } = Select;
const Dashboard = () => {
  const [pt_vente, setPt_vente] = useState([]);
  const [question, setQuestion] = useState([]);
  const [totalVisite, setTotalVisite] = useState(0);

  const [questionValue, setQuestionValue] = useState(undefined);
  const [ptVenteValue, setPtVenteValue] = useState(undefined);

  const [dataChart, setdataChart] = useState({
    datasets: [
      {
        label: "data",
        data: [],
        borderColor: "#fff",
        backgroundColor: "#bf9a62bf",
      },
    ],
  });

  const getStatistiqueParams = async () => {
    try {
      const data = await axios.get("/statistique/getData.php");
      console.log(data);
      let ptVt = [...new Set(data.data.body?.map((item) => item.nom))];
      let qts = [...new Set(data.data.body?.map((item) => item.labelQues))];
      let nbrVisite = [
        ...new Set(data.data.body?.map((item) => item.id_client)),
      ];
      setPt_vente(ptVt);
      setQuestion(qts);
      setTotalVisite(nbrVisite.length);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataChart = async () => {
    try {
      const data = await axios.get(
        "/statistique?ptVente=" + ptVenteValue + "&question=" + questionValue
      );
      const dataNew = [];
      const labels = [];
      data.data.body.forEach((element) => {
        dataNew.push(element.nbr);
        labels.push(element.reponse);
      });
      setdataChart({
        labels,
        datasets: [
          {
            ...dataChart.datasets[0],
            data: dataNew,
          },
        ],
      });
    } catch (error) {}
  };
  useEffect(() => {
    getStatistiqueParams();
  }, []);
  useEffect(() => {
    getDataChart();
  }, [totalVisite]);

  return (
    <Row gutter={[30, 30]}>
      <Col xs={{ span: 24 }} sm={{ span: 8 }}>
        <GlobalStatistic
          suffix={"Visites"}
          description={"Nbr de visite total"}
          value={totalVisite}
        />
      </Col>

      <Col xs={{ span: 24 }} sm={{ span: 8 }}>
        <GlobalStatistic
          suffix={"Local"}
          description={"Nbr de Gourmandise"}
          value={totalVisite}
        />
      </Col>

      <Col xs={{ span: 24 }} sm={{ span: 8 }}>
        <GlobalStatistic
          description={"Nbr de Gourmandise"}
          value={totalVisite}
        />
      </Col>

      <Col
        xs={{ span: 24 }}
        sm={{ span: 12 }}
        md={{ span: 6 }}
        lg={{ span: 6 }}
      >
        <Card title="Visite / Point de vente ">
          <Pie data={data} />
        </Card>
      </Col>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 12 }}
        md={{ span: 6 }}
        lg={{ span: 6 }}
      >
        <Card title="Age des visiteurs">
          <Pie data={data} />
        </Card>
      </Col>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 12 }}
        md={{ span: 6 }}
        lg={{ span: 6 }}
      >
        <Card title="Region des visiteurs">
          <Pie data={data} />
        </Card>
      </Col>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 12 }}
        md={{ span: 6 }}
        lg={{ span: 6 }}
      >
        <Card title="Sexe des visiteurs">
          <Pie data={data} />
        </Card>
      </Col>

      <Col xs={{ span: 24 }}>
        <Card title="Paramétre de statistique">
          <Col xs={{ span: 24 }}>
            <Select
              onChange={(e) => setPtVenteValue(e)}
              style={{ width: "100%" }}
              allowClear
              placeholder="Gourmandise ?"
            >
              <Option value="all">Toutes Gourmandises</Option>
              {pt_vente?.map((item) => (
                <Option value={item}>{item}</Option>
              ))}
            </Select>
          </Col>
          <br />
          <Col xs={{ span: 24 }}>
            <Select
              onChange={(e) => setQuestionValue(e)}
              allowClear
              placeholder="Filter par ?"
              style={{ width: "100%" }}
            >
              {question?.map((item) => (
                <Option value={item}>{item}</Option>
              ))}
            </Select>
            <br />
            <br />
            <DatePicker.RangePicker placeholder={["Date Début", "Date Fin"]} />
            <br />
            <br />
            <a
              onClick={() => getDataChart()}
              class="button button-primary button-wide-mobile button-sm"
              href="#"
            >
              Valider
            </a>
          </Col>
        </Card>
      </Col>
      <Col span={18}>
        <Col xs={{ span: 24 }}>
          <Card>
            <Bar options={options} data={dataChart} />
          </Card>
        </Col>
      </Col>
      {/* <Col span={6}>
        <Col xs={{ span: 24 }}>
          <Card title="Top Gourmandise">
            <List
              itemLayout="horizontal"
              dataSource={dataPt}
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
      </Col> */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Row>
  );
};
export default Dashboard;
