import React from 'react'
//ANT DESIGN 
import { Tabs, Row, Col } from 'antd';
//ICONS 
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
//CSS MODULE 
import * as classes from './DataMenage.module.css'

//APP COMPONENTS 
import UserConfiguartion from '../../components/sections/UserConfiguartion/UserConfiguartion';
import PointVente from '../../components/sections/PointVente/PointVente';
import Questions from '../../components/sections/Questions/Questions';

const { TabPane } = Tabs;
const DataMenage = () => {
    return (
        <div className={classes.container}>
            <Row >
                <Col xs={{ span: 24 }} sm={{ span: 20, offset: 1 }} md={{ span: 16, offset: 4 }} lg={{ span: 12, offset: 6 }} >
                    <div>Gestion des données</div>
                    <Tabs defaultActiveKey="2">
                        <TabPane
                            tab={
                                <span>
                                    <AppleOutlined />
                                    User Configuration
                                </span>
                            }
                            key="1"
                        >
                            <UserConfiguartion />
                        </TabPane>
                        <TabPane
                            tab={
                                <span>
                                    <AndroidOutlined />
                                    Point de vente
                                </span>
                            }
                            key="2"
                        >
                            <PointVente />
                        </TabPane>

                        <TabPane
                            tab={
                                <span>
                                    <AndroidOutlined />
                                    Question d'evaluation
                                </span>
                            }
                            key="3"
                        >
                            <Questions />
                        </TabPane>

                    </Tabs>
                </Col>
            </Row>
        </div>
    )
}
export default DataMenage