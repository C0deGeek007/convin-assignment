import React, { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';

export function CustomModal(props) {

    const cardData=props.cardData;
    const isModalVisible=props.isModalVisible;
    const handleOk=props.handleOk;
    const handleCancel=props.handleCancel;
    const editedRoute=(link="")=> {
        if(link.includes("watch")) {
            return link.replace("watch","embed");
        } else {
            return link
        }
        
    }

    React.useEffect(()=>{
        console.log("custom modal");
    },[])
    return (
        <Modal key={cardData.id} title="Create Card" visible={isModalVisible} onOk={()=>handleOk(cardData.id)} onCancel={()=>handleCancel(cardData.id)}>
        {/* <iframe src={editedRoute(card.link)}></iframe> */}
        {/* {editedRoute(card.link)} */}
        <iframe src={editedRoute(cardData.link)}></iframe>
    </Modal>
    )

}