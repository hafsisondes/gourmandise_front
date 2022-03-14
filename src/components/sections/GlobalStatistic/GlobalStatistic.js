import React from 'react'
//  ANT DESIGN COMPONENTS
import { Card, Col, Row, Statistic } from "antd";

//ICONS 
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';


const GlobalStatistic = ({ title, description, value }) => {
    return (
        <div className="site-statistic-demo-card">
            <Card title={title} >
                <Statistic
                    title={description}
                    value={value}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                />
            </Card>
        </div>
    )
}

export default GlobalStatistic