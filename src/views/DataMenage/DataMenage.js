import React, { useEffect, useState } from "react";
//ANT DESIGN
import { Tabs, Row, Col, List, message } from "antd";
//ICONS
import { AppleOutlined, AndroidOutlined } from "@ant-design/icons";
//CSS MODULE
import * as classes from "./DataMenage.module.css";

//APP COMPONENTS
import UserConfiguartion from "../../components/sections/UserConfiguartion/UserConfiguartion";
import PointVente from "../../components/sections/PointVente/PointVente";
import Questions from "../../components/sections/Questions/Questions";
import axios from "../../services/axios";

const { TabPane } = Tabs;
const DataMenage = () => {
  const [listData, setListData] = useState(null)
  const [users, setUsers] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [ptVente, setPtVente] = useState(null);
  const [selectTab, setSelectTab] = useState(1);

  const getUsersList = async () => {
    try {
      const { data } = await axios.get('/user');
      setUsers(data);
    } catch (error) {
      message.error('users: probléme de connexion !');
    }
  }
  const getQuestionList = async () => {
    try {
      const { data } = await axios.get('/question/read_qts.php');

      let newData = data.data?.map(element => {
        console.log(element)
        element.reponse = element.reponse.split('#')
      });

      setQuestions(data);
    } catch (error) {
      message.error('question: probléme de connexion !');
    }
  }

  const getPtVenteList = async () => {
    try {
      const { data } = await axios.get('/pt_de_vente/read.php');
      setPtVente(data);
    } catch (error) {
      message.error('poit de vente :probléme de connexion !');
    }
  }

  useEffect(() => {
    getUsersList()
    getQuestionList()
    getPtVenteList()
  }, [])

  useEffect(() => {
    console.log(selectTab);
  }, [selectTab])

  return (
    <div className={classes.container}>
      <Row gutter={30} >
        <Col
          xs={{ span: 24 }}
          sm={{ span: 18 }}
          md={{ span: 16 }}

        >
          <div>Gestion des données</div>
          <Tabs defaultActiveKey="1" onChange={(e) => setSelectTab(parseInt(e))} >
            <TabPane
              tab={
                <span>
                  <AppleOutlined />
                  User Configuration
                </span>
              }
              key={1}
              animated
            >
              <UserConfiguartion getUsersList={getUsersList} />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <AndroidOutlined />
                  Point de vente
                </span>
              }
              key={2}
            >
              <PointVente getPtVenteList={getPtVenteList} />
            </TabPane>

            <TabPane
              tab={
                <span>
                  <AndroidOutlined />
                  Question d'evaluation
                </span>
              }
              key={3}
            >
              <Questions getQuestionList={getQuestionList} />
            </TabPane>
          </Tabs>
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 6 }}
          md={{ span: 8 }}
          className={classes.list}
        >
          {
            selectTab === 1 &&
            users &&
            <List
              header={<div>Liste users ({users.itemCount})</div>}
              bordered
              dataSource={users.body}
              renderItem={item =>
                <List.Item key={item.id}>
                  <List.Item.Meta
                    // avatar={<Avatar src={item.picture.large} />}
                    title={<a style={{ color: "#bf9a62" }} >{item.username}</a>}
                    description={"login :" + item.login}
                  />
                  <div>{item.type}</div>
                </List.Item>
              }

            />
          }

          {
            selectTab === 3 &&
            questions &&
            <List
              header={<div>Liste des question ({questions.itemCount})</div>}

              bordered
              dataSource={questions.data}
              renderItem={item =>
                <List.Item key={item.id}>
                  <List.Item.Meta
                    // avatar={<Avatar src={item.picture.large} />}
                    title={<a style={{ color: "#bf9a62" }} >{item.label}</a>}
                    description={
                      <>
                        Reponse:
                        <ul>
                          {item.reponse?.map(rep => <li>{rep}</li>)}
                        </ul>
                      </>
                    }
                  />
                  <div>{item.type}</div>
                </List.Item>}

            />
          }

          {
            selectTab === 2 &&
            ptVente &&
            <List
              header={<div>Lise des pointes de ventes ({ptVente.itemCount})</div>}

              bordered
              dataSource={ptVente.body}
              renderItem={(item, index) =>
                <List.Item key={item.id}>
                  <List.Item.Meta
                    // avatar={<Avatar src={item.picture.large} />}
                    title={<a style={{ color: "#bf9a62" }} >{item.nom} ( {item.nbr_visite} )</a>}
                    description={"Region : " + item.region}
                  />
                  <div>{item.type}</div>
                </List.Item>
              }

            />
          }
        </Col>

      </Row>
    </div>
  );
};
export default DataMenage;
