import React, { useEffect, useState } from "react";
import axios from "../../../services/axios";

// composant pour design
import {
  Card,
  Radio,
  Space,
  Typography,
  Input,
  Form,
  Select,
  Button,
} from "antd";
// import function to get data from database
import { getPointVente, getQuestion } from "../../../services/PointVente";
//CSS Module
import * as classes from "./Evaluation.module.css";

//Components
const { Title, Text } = Typography;
const { Option } = Select;

//View evaluation
const Evaluation = ({ setEvalution, EvaluationData, setEvaluationData }) => {
  //Components state
  const [pointVente, setPointVente] = useState(null);
  const [question, setQuestion] = useState(null);
  const [selectedPointVente, setSelectedPointVente] = useState(null);
  const [form] = Form.useForm();

  //get Point de vente
  useEffect(() => {
    const request = async () => {
      const data = await getPointVente();
      setPointVente(data);
    };
    request();
  }, []);

  // Get list quetion
  useEffect(() => {
    const request = async () => {
      const data = await getQuestion();
      const newData = data.data?.map(
        (item) => (item.reponse = item.reponse.split("#"))
      );
      console.log(data);
      setQuestion(data);
    };
    request();
  }, []);

  //Ajout evaluation
  const onFinish = (values) => {
    setEvaluationData({ ...EvaluationData, evaluation: values });

    const data = JSON.stringify({
      age: values.age,
      sexe: values.sexe,
      region: values.region,
      email: EvaluationData.login,
    });

    //Send data to database
    axios
      .post("client/create_cl.php", data)
      .then(() => {
        for (var question in values) {
          // console.log(`obj.${prop} = ${EvaluationData.evaluation[prop]}`);
          let evaluationItem = {
            id_question: question,
            id_client: EvaluationData.login,
            reponse: values[question],
            id_pt_de_vente: selectedPointVente,
          };
          axios
            .post("evaluation/create_ev.php", evaluationItem)
            .then((res) => console.log(res));
        }
      })
      .finally(() => {
        setEvalution(true);
      });
  };

  return (
    <div className={classes.container}>
      <div className={classes.backdropTop}></div>
      <div className={classes.backdropBottom}></div>

      <Space className={classes.header} draggable>
        <Title level={2} style={{ color: "#bf9a62" }}>
          Évaluation
        </Title>
        <Text type="secondary" className={classes.description}>
          Merci de répondre au questionnaire suivant dans le but d'améliorer nos
          services (c'est un questionnaire anonyme )
        </Text>
      </Space>

      <Form
        form={form}
        name="nest-messages"
        autoComplete="off"
        scrollToFirstError
        onFinish={onFinish}
      >
        <Card
          align="left"
          hoverable
          className={classes.formCard}
          title={
            "Quel point de vente ou espace de gourmandise le plus proche de vous ? *"
          }
        >
          {" "}
          <Form.Item
            name="local"
            rules={[
              {
                required: true,
                message: "Veuiliez Scanner !",
              },
            ]}
          >
            {
              <Select
                placeholder={"Sélectionner"}
                onChange={(e) => setSelectedPointVente(e)}
              >
                {pointVente &&
                  pointVente.body?.map((el) => (
                    <Option key={el.id} value={el.id}>
                      {el.nom}
                    </Option>
                  ))}
              </Select>
            }
          </Form.Item>
        </Card>

        <Card
          align="left"
          hoverable
          className={classes.formCard}
          title="Vous êtes : *"
        >
          <Form.Item
            name="sexe"
            rules={[
              {
                required: true,
                message: "Choisir votre sexe !",
              },
            ]}
          >
            <Radio.Group name="sexe">
              <Radio value="F"> Femme</Radio>
              <br />
              <Radio value="H">Homme </Radio>
            </Radio.Group>
          </Form.Item>
        </Card>

        <Card
          align="left"
          hoverable
          className={classes.formCard}
          title="Votre age est :"
        >
          <Form.Item
            name="age"
            rules={[
              {
                required: true,
                message: "Sélectionner votre age !",
              },
            ]}
          >
            <Radio.Group name="age">
              <Radio value={"-18"}>moins de 18</Radio>
              <br />
              <Radio value={"18-25"}>entre 18 et 25</Radio>
              <br />
              <Radio value={"26-36"}>entre 26 et 36</Radio>
              <br />
              <Radio value={"37-45"}>entre 37 et 45</Radio>
              <br />
              <Radio value={"46+"}>plus de 46</Radio>
              <br />
            </Radio.Group>
          </Form.Item>
        </Card>
        <Card
          align="left"
          hoverable
          className={classes.formCard}
          title="Où habitez-vous ? *"
        >
          <Form.Item
            name="region"
            rules={[
              {
                required: true,
                message: "Sélectionner votre region !",
              },
            ]}
          >
            <Select placeholder={"Sélectionner"} allowClear showSearch>
              <Option value={"Bizerte"}>Bizerte</Option>
              <Option value={"Ariana"}>Ariana</Option>
              <Option value={"Tunis"}>Tunis</Option>
              <Option value={"Ben Arous"}>Ben Arous</Option>
              <Option value={"Nabeul"}>Nabeul</Option>
              <Option value={"Zaghoune"}>Zaghoune</Option>
              <Option value={"Manouba"}>Manouba</Option>
              <Option value={"Sousse"}>Sousse</Option>
              <Option value={"Mounastir"}>Mounastir</Option>
              <Option value={"Jendouba"}>Jendouba</Option>
              <Option value={"Seliana"}>Seliana</Option>
              <Option value={"Beja"}>Beja</Option>
              <Option value={"Le Kef"}>Le Kef</Option>
              <Option value={"Tatouine"}>Tatouine</Option>
              <Option value={"Gbeli"}>Gbeli</Option>
              <Option value={"Kairouane"}>Kairouane</Option>
              <Option value={"Gafsa"}>Gafsa</Option>
              <Option value={"Kasserine"}>Kasserine</Option>
              <Option value={"Tozeur"}>Tozeur</Option>
              <Option value={"Mednine"}>Mednine</Option>
              <Option value={"Sfax"}>Sfax</Option>
              <Option value={"Mahdia"}>Mahdia</Option>
              <Option value={"Sidi Bouzid"}>Sidi Bouzid</Option>
              <Option value={"Gabes"}>Gabes</Option>
            </Select>
          </Form.Item>
        </Card>

        {question &&
          question.data?.map((item, index) => (
            <Card
              key={index}
              align="left"
              hoverable
              className={classes.formCard}
              title={item.label}
            >
              <Form.Item
                name={item.id_question}
                rules={[
                  {
                    required: true,
                    message: "Champ obligatoire !",
                  },
                ]}
              >
                {item.type_reponse === "single" && (
                  <Radio.Group>
                    {item.reponse?.map((rep) => (
                      <>
                        <Radio children={`${rep}`} value={`${rep}`}>
                          {" "}
                          {`${rep}`}
                        </Radio>
                        <br />
                      </>
                    ))}
                  </Radio.Group>
                )}

                {/* {
                  item.type_reponse === "multi" &&
                  <Checkbox.Group options={serveurs} name={"QS" + item.id_question} >

                    {
                      item.reponse?.map(rep => <><Checkbox value={rep}> {rep}</Checkbox><br /></>)
                    }
                  </Checkbox.Group>
                } */}
              </Form.Item>
            </Card>
          ))}
        <Card
          align="left"
          hoverable
          className={classes.formCard}
          title="Qu'est ce que vous proposez pour améliorer notre service ?"
        >
          <Form.Item name="proposition">
            <Input name="proposition" size="large" type="text" />
          </Form.Item>
        </Card>
        <Card hoverable className={classes.formCard} title="">
          Merci pour vos réponses on va prendre en considération vos avis !
        </Card>
        <Button
          htmlType="submit"
          className="button button-primary button-wide-mobile button-sm"
          style={{ width: "100%", borderRadius: "10px" }}
        >
          Envoyer
        </Button>
      </Form>
    </div>
  );
};

export default Evaluation;
