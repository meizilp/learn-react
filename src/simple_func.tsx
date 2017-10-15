import React from 'react'
import Tooltip from 'antd/lib/tooltip'
import Button from 'antd/lib/button'
import 'antd/lib/style/index.css'
import 'antd/lib/tooltip/style/index.css'
import 'antd/lib/button/style/index.css'
import 'antd/lib/grid/style/index.css'

import Row from 'antd/lib/Row'
import Col from 'antd/lib/Col'

const div_style = {
    'background-color': '#0f0',
    'display': 'flex',
    'height': '100px',
    'justify-content':'center',
    'align-items': 'center',
}

const button_style = {
    'width' : '50%',
    'height': '80%'
}

const Biu = () =>
    (<div>
        <Row type='flex' justify='center' align='bottom'>
            <Col span={3}>
                <Button disabled={true} >default</Button>
            </Col>
            <Col span={3}>
                <Button type='primary'>Primary</Button>
            </Col>
            <Col span={6} style={div_style}>
                <Button type='dashed' icon='question-circle' style={button_style}>Dashed</Button>
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