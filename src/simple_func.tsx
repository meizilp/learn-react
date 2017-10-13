import React from 'react'
import Tooltip from 'antd/lib/tooltip'
import Button from 'antd/lib/button'
import 'antd/lib/style/index.css'
import 'antd/lib/tooltip/style/index.css'
import 'antd/lib/button/style/index.css'
import 'antd/lib/grid/style/index.css'

import Row from 'antd/lib/Row'
import Col from 'antd/lib/Col'

const Biu = () =>
    (<div>
        <Row type='flex' justify='center'>
            <Col span={3}>
                <Button disabled={true}>default</Button>
            </Col>
            <Col span={3}>
                <Button type='primary' shape='circle'>Primary</Button>
            </Col>
            <Col span={6}>
                <Button type='dashed' icon='question-circle'>Dashed</Button>
            </Col>
            <Col span={7}>
                <Button type='danger' size='large'>Danger</Button>
            </Col>
            <Col span={2}>
                world
            </Col>
        </Row>
    </div>)

export default Biu