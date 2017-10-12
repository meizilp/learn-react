import React from 'react'
import Tooltip from 'antd/lib/tooltip'
import Button from 'antd/lib/button'
import 'antd/lib/style/index.css'
import 'antd/lib/tooltip/style/index.css'
import 'antd/lib/button/style/index.css'

import { Row, Col } from 'antd'

const Biu = () =>
    (
            <Row>
                <Col span={12}> c12 c12 </Col>
                <Col span={12}> c12-2 c12-2 </Col>
            </Row>
    )
/*(<div>
    <Row>
        <Col span={6}>
            <Button disabled={true}>default</Button>
        </Col>
        <Col span={3}>
        <Button type='primary' shape='circle'>Primary</Button>
        </Col>
        <Col span={6}>
        <Button type='dashed' icon='question-circle'>Dashed</Button>
        </Col>
        <Col span={9}>
        <Button type='danger' size='large'>Danger</Button>
        </Col>
    </Row>
</div>)*/

export default Biu