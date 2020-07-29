import React from 'react';
import { Row, Col} from 'react-bootstrap';

const Rubrique = (props) => {
    let data = null;
    if (props.map) {
        data = (
            <Row className="LuMovie">
                {
                    props.data.map(data => {
                        return <Col sm={3} key={data.id}><p className={props.css}>{data.name}</p></Col>
                    })
                }
            </Row>
        );
    }
    else
        data = props.data;
    
    return (
        <Row>
            <Col>
                <p className='TitreMovie'>{props.title}</p>
                {data} 
            </Col>
        </Row>
    )
}

export default Rubrique;