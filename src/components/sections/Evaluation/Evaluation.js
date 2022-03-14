import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../services/axios";

import {
  Card,
  Checkbox,
  Radio,
  Space,
  Typography,
  Rate,
  Input,
  Form,
  Select,
  Button,
} from "antd";


import { getPointVente } from "../../../services/PointVente";

import * as classes from "./Evaluation.module.css";

const { Title, Text } = Typography;
const { Option } = Select;

const serveurs = [
  {
    label: "Souriants",
    value: "Souriants",
  },
  {
    label: "Attentif",
    value: "Attentif",
  },
  {
    label: "Sympathiques",
    value: "Sympathiques",
  },
  {
    label: "Pas souriants",
    value: "Pas_souriants",
  },
  {
    label: "Nerveux",
    value: "Nerveux",
  },
];

const commandes_type = [
  {
    label: "Mariages et fêtes",
    value: "mariages_fetes",
  },
  {
    label: "Aid",
    value: "aid",
  },
  {
    label: "Consommation personnelle",
    value: "consomommation_personnel",
  },
];

const commandes_cause = [
  {
    label: "Le goût",
    value: "gout",
  },
  {
    label: "Le prix",
    value: "prix",
  },
  {
    label: "Consommation personnelle",
    value: "consomommation_personnel",
  },
];

const Evaluation = ({ setEvalution, EvaluationData, setEvaluationData }) => {
  const [pointVente, setPointVente] = useState(null);
  const [selectedPointVente, setSelectedPointVente] = useState(null);
  const { ptVenteID } = useParams();
  const [form] = Form.useForm();
  useEffect(() => {
    const request = async () => {
      const data = await getPointVente();
      setPointVente(data);
    };
    request();
  }, []);

  useEffect(() => {
    const getptVt = async () => {
      try {
        const { data } = await axios.get(
          "pt_de_vente/getByID.php?id=" +
          ptVenteID
        );
        setSelectedPointVente(data);
      } catch (error) {
        console.log(error);
      }
    };
    getptVt();
  }, [ptVenteID]);

  useEffect(() => {
    console.log(selectedPointVente);
  }, [selectedPointVente]);

  useEffect(() => {
    console.log(EvaluationData);
  }, [EvaluationData]);

  const onFinish = (values) => {
    setEvaluationData({ ...EvaluationData, evaluation: values });
    console.log(values);

    const data = JSON.stringify({
      age: values.age,
      sexe: values.sexe,
      region: values.region,
      email: EvaluationData.login,
    });

    axios
      .post("client/create_cl.php", data)
      .then((res) => console.log(res))
      .then(() => {
        for (var prop in values) {
          // console.log(`obj.${prop} = ${EvaluationData.evaluation[prop]}`);
          let evaluationItem = {
            id_question: prop,
            id_client: EvaluationData.login,
            reponse: values[prop],
            id_pt_de_vente: selectedPointVente.id
          }


          axios.post('evaluation/create_ev.php', evaluationItem)
            .then((res => console.log(res)))
        }
      })
      .finally(() => {
        setEvalution(true);
      })

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
            selectedPointVente
              ? selectedPointVente.nom
              : "Quel point de vente ou espace de gourmandise le plus proche de vous ? *"
          }
        >
          {!selectedPointVente ? (
            <Form.Item
              name="local"
              rules={[
                {
                  required: true,
                  message: "Veuiliez Scanner !",
                },
              ]}
            >
              <Select placeholder={"Sélectionner"} onChange={(e) => setSelectedPointVente(e)} >
                {pointVente &&
                  pointVente.body?.map((el) => (
                    <Option key={el.id} value={el.nom}>
                      {el.nom}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          ) : (
            <>
              <Text strong> {selectedPointVente.region}</Text>
              <Text strong> {selectedPointVente.type}</Text>
            </>
          )}
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
              <Radio value={"12-25"}>entre 12 et 25</Radio>
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
            <Select name="region" placeholder={"Sélectionner"}>
              <Option value={"Tunis"}>Tunis</Option>
              <Option value={"Ariana"}>Ariana</Option>
              <Option value={"Ben Arous"}>Ben Arous</Option>
              <Option value={"Bizerte"}>Bizerte</Option>
              <Option value={"Manouba"}>Manouba</Option>
              <Option value={"Jendouba"}>Jendouba</Option>
              <Option value={"Le_Kef"}>Le Kef</Option>
              <Option value={""}>Manouba</Option>
            </Select>
          </Form.Item>
        </Card>
        <Card
          align="left"
          hoverable
          className={classes.formCard}
          title="Combien de fois vous visitez cet point de vente par mois ? "
        >
          <Form.Item
            name="nbr_visite"
            rules={[
              {
                required: true,
                message: "Sélectionner le nombre de visite !",
              },
            ]}
          >
            <Radio.Group name="nbr_visite">
              <Radio value="-5"> moins de 5</Radio>
              <br />
              <Radio value="5-10">entre 5 et 10 fois </Radio>
              <br />
              <Radio value="10+">plus de 10 </Radio>
            </Radio.Group>
          </Form.Item>
        </Card>
        <Card
          align="left"
          hoverable
          className={classes.formCard}
          title="Comment trouvez vous le service de cet point de vente ? *"
        >
          <Form.Item name="service">
            <Radio.Group name="service">
              <Radio value="Excellent"> Excellent</Radio>
              <br />
              <Radio value="Bon">Bon</Radio>
              <br />
              <Radio value="Mauvais">Mauvais </Radio>
            </Radio.Group>
          </Form.Item>
        </Card>
        <Card
          align="left"
          hoverable
          className={classes.formCard}
          title="Comment trouvez vous cet espace de vente ? *"
        >
          <Form.Item name="avis_espace">
            <Radio.Group name="avis_espace">
              <Radio value="Spacieux"> Spacieux</Radio>
              <br />
              <Radio value="Moyen">Moyen</Radio>
              <br />
              <Radio value="Non-spacieux">Non spacieux </Radio>
            </Radio.Group>
          </Form.Item>
        </Card>
        <Card
          align="left"
          hoverable
          className={classes.formCard}
          title="Comment trouvez vous la propreté de cet espace de vente ?"
        >
          <Form.Item name="proprete_espace">
            <Radio.Group name="proprete_espace">
              <Radio value="Tres_propre">Très propre</Radio>
              <br />
              <Radio value="Propre">Propre</Radio>
              <br />
              <Radio value="Non_propre">Non propre </Radio>
            </Radio.Group>
          </Form.Item>
        </Card>

        <Card
          className={classes.formCard}
          align="left"
          hoverable
          title="La modernité de cet espace de vente est : *"
        >
          <Form.Item name="modernite">
            <Radio.Group name="modernite">
              <Radio value="Tres_moderne">Très moderne</Radio>
              <br />
              <Radio value="Normal">Normal</Radio>
              <br />
              <Radio value="Non_moderne">Non moderne</Radio>
            </Radio.Group>
          </Form.Item>
        </Card>

        <Card
          className={classes.formCard}
          align="left"
          hoverable
          title="Comment trouvez vous les prix : *"
        >
          <Form.Item name="prix">
            <Radio.Group name="prix">
              <Radio value="Raisonnable">Raisonnable</Radio>
              <br />

              <Radio value="Excessivement_cher">Excessivement cher</Radio>
              <br />
              <Radio value="Cher">Cher</Radio>
            </Radio.Group>

          </Form.Item>
        </Card>
        <Card
          className={classes.formCard}
          align="left"
          hoverable
          title="Les serveurs de cet point de vente sont ? *"
          style={{ display: "table-caption" }}

        >
          <Form.Item name="serveurs">
            <Checkbox.Group options={serveurs} name="serveurs" />
          </Form.Item>
        </Card>
        <Card
          className={classes.formCard}
          align="left"
          hoverable
          title="Vos commandes sont généralement pour : *"
          style={{ display: "table-caption" }}

        >
          <Form.Item name="commandes_type">

            <Checkbox.Group
              options={commandes_type}
              name="commandes_type"
            ></Checkbox.Group>

          </Form.Item>
        </Card>

        <Card
          align="left"
          hoverable
          className={classes.formCard}
          title="Vous passez votre commande de produits selon : *"
          style={{ display: "table-caption" }}
        >
          <Form.Item name="commandes_cause">
            <Checkbox.Group options={commandes_cause} name="commandes_cause" />
          </Form.Item>
        </Card>
        <Card
          align="left"
          hoverable
          className={classes.formCard}
          title="Vous êtes satisfaits des produits commandés : *"
        >
          <Form.Item name="satisfaction_client">
            <Radio.Group name="satisfaction_client">
              <Radio value="trés Satisfait">Très satisfaits</Radio>
              <br />
              <Radio value="Satisfait">Satisfait</Radio>
              <br />
              <Radio value="non Satisfait">Non satisfaits</Radio>
            </Radio.Group>
          </Form.Item>
        </Card>
        <Card
          align="left"
          hoverable
          className={classes.formCard}
          title="Donnez une note de votre satisfaction pour cet point de vente : *"
        >
          <Form.Item name="satisfaction_vente">
            <Rate name="satisfaction_vente" allowHalf defaultValue={'0'} />
          </Form.Item>
        </Card>
        <Card
          align="left"
          hoverable
          className={classes.formCard}
          title="Savez vous que gourmandise a un site de commande en ligne : *"
        >
          <Form.Item name="commandes_ligne">
            <Radio.Group name="commandes_ligne">
              <Radio value={"Oui"}>Oui</Radio>
              <br />
              <Radio value={"Non"}>Non</Radio>
            </Radio.Group>
          </Form.Item>
        </Card>
        <Card
          align="left"
          hoverable
          className={classes.formCard}
          title="Si oui, et vous avez déjà commander en ligne, donnez votre dégréé de satisfaction pour le service de livraison"
        >
          <Form.Item name="satisfaction_livraison">
            <Rate name="satisfaction_livraison" allowHalf defaultValue={'0'} />
          </Form.Item>
        </Card>
        <Card
          align="left"
          hoverable
          className={classes.formCard}
          title="Est ce que vous aimez : *"
        >
          <Form.Item name="type_commande">
            <Radio.Group name="type_commande">
              <Radio value={"ligne"}>passer des commandes en ligne</Radio>
              <br />
              <Radio value={"visite"}>visiter l'espace directement</Radio>
            </Radio.Group>
          </Form.Item>
        </Card>
        <Card
          align="left"
          hoverable
          className={classes.formCard}
          title="Est ce que la commande est : *"
        >
          <Form.Item name="commandes_avis">
            <Radio.Group name="commandes_avis">
              <Radio value={"Délicieuse"}>Délicieuse</Radio>
              <br />
              <Radio value={"Moyenne"}>Moyenne</Radio>
              <br />
              <Radio value={"Mauvaise"}>Mauvaise</Radio>
            </Radio.Group>
          </Form.Item>
        </Card>
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
