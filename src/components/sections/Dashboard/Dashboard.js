import React, { useState } from "react";
//ANDT DESIGN COMPONENTS
import { Card, Col, Row, Result, Select, DatePicker } from "antd";
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
import PieCharts from "../../charts/PieCharts";

import ReactApexChart from 'react-apexcharts'

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

    series: [],
    options: {
      colors: ['#cdb185'],
      chart: {
        type: 'bar',
        height: 350,
        stacked: false,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          columnWidth: '50%',
        },
      },
      xaxis: {
        categories: [],
      },
      legend: {
        position: 'right',
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
    },


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
      setQuestion(qts);
      setTotalVisite(nbrVisite.length);
    } catch (error) {
      console.error(error);
    }
    try {

      const ptventeData = await axios.get(
        "/statistique?ptVente=" + ptVenteValue + "&question=" + questionValue
      );

      setPt_vente(ptventeData.data.body)
    } catch (error) {
      console.error(error);
    }
  };

  const getDataChart = async () => {
    if (ptVenteValue === null) { setPtVenteValue(undefined) }

    try {

      const data = await axios.get(
        "/statistique?ptVente=" + ptVenteValue + "&question=" + questionValue
      );
      const dataNew = [];
      const labels = [];
      data.data.body.forEach((element) => {
        dataNew.push(element.nbr);
        labels.push(element.label);
      });

      setdataChart({
        ...dataChart,
        series: [{
          name: "Nombre",
          data: dataNew
        }],
        options: {
          ...dataChart.options,
          xaxis: {
            categories: labels
          }
        }
      });
    } catch (error) {
      setdataChart({
        ...dataChart,
        series: [],
        options: {
          ...dataChart.options,
          xaxis: {
            categories: []
          }
        }
      });
    }
  };
  useEffect(() => {
    getStatistiqueParams();
  }, []);
  useEffect(() => {
    getDataChart();
  }, [totalVisite]);

  return (
    <Row gutter={[30, 30]}>
      <Col xs={{ span: 24 }} sm={{ span: 12 }}>
        <GlobalStatistic
          suffix={"Visites"}
          description={"Nbr de visite total"}
          value={totalVisite}
        />
      </Col>

      <Col xs={{ span: 24 }} sm={{ span: 12 }}>
        <GlobalStatistic
          suffix={"Local"}
          description={"Nbr de Gourmandise"}
          value={pt_vente.length}
        />
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
              <Option value={undefined}>Toutes Gourmandises</Option>
              {pt_vente?.map((item, index) => (
                <Option key={index} value={item.label}>{item.label}</Option>
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
            <button
              onClick={() => getDataChart()}
              class="button button-primary button-wide-mobile button-sm"

            >
              Valider
            </button>
          </Col>
        </Card>
      </Col>

      <Col xs={{ span: 24 }} align="center"  >
        <Card title={questionValue ? questionValue : "Nombre de visite "} >
          {
            dataChart.series.length === 0 ?
              <Result
                status="error"
                title="Pas de données"
              //    subTitle=""

              />
              :
              <ReactApexChart options={dataChart.options} series={dataChart.series} type="bar" height={350} />
          }
        </Card>
      </Col>



      <Col
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 12 }}
        lg={{ span: 12 }}
      >
        <Card title="Visite / Point de vente ">
          {question.length > 0 ?
            <PieCharts type="visite" question={question.length} />
            : <Result
              status="error"
              title="Pas de données"
            //    subTitle=""

            />
          }
        </Card>
      </Col>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 12 }}
        lg={{ span: 12 }}
      >
        <Card title="Age des visiteurs">
          <PieCharts type="age" />
        </Card>
      </Col>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 12 }}
        lg={{ span: 12 }}
      >
        <Card title="Region des visiteurs">
          <PieCharts type="region" />
        </Card>
      </Col>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 12 }}
        lg={{ span: 12 }}
      >
        <Card title="Sexe des visiteurs">
          <PieCharts type="sexe" />
        </Card>
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