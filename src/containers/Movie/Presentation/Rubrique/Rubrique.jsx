import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Img from '../../../../assets/acteurs.png';

const Rubrique = (props) => {
    let data = null;

    if (props.data.length === 0)
        data = <p style={{fontStyle:'italic'}}>indisponible</p>
    else if (props.map) {       
        data = (
            <Row className="LuMovie">
                {
                    props.data.map(data => (
                        <Col sm={3} key={data.id} style={{display:'flex', flexDirection:'column',}}>
                            { data.profile_path ?  <img style={{borderRadius:'50%', margin:'auto', marginTop: 0}} src={`https://image.tmdb.org/t/p/w100_and_h100_face/${data.profile_path}`} alt='lol'/> : null }
                            { !data.profile_path && data.img ? <img alt= "" src={Img} style={{borderRadius:'50%', margin:'auto', width:'100px', height:'100px'}}/> : null}
                            <p className={props.css} style={{textAlign:'center'}}>{data.name}</p>
                        </Col>
                        )
                    )
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