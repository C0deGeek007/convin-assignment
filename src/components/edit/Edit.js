import React, { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { getAllBucket, editCard } from '../../services/card';
import { Select } from 'antd';

export function Edit(props) {

    const [bucketList, setBucketList]=useState([]);
    const [selectedCardBucket,setSelectedCardBucket]=useState(null);
    const [dropdownSelectedValue,setDropdownSelectedValue]=useState(null);
    const cardData=props.cardData;
    const isModalVisible=props.isModalVisible;
    const handleOk=props.handleOk;
    const handleCancel=props.handleCancel;
    const  embededBucketList=props.embededBucketList;
    const { Option } = Select;

    const onFinish = (values) => {
       console.log(cardData);
       console.log(values);
       console.log(selectedCardBucket);
       const updatedCardInfo={
        ...cardData,
        "bucketId":parseInt(dropdownSelectedValue),
        name:values.name,
        link:values.link
       }
       console.log("updated card data is");
       console.log(updatedCardInfo);
       editCard(updatedCardInfo,updatedCardInfo.id).then((res)=>{
        console.log("updated card info is")
        console.log(res);
        embededBucketList();
       }).catch((err)=>{
        console.log(err);
       })
    };

    const onFinishFailed = (errorInfo) => {
       console.log('Failed:', errorInfo);
    };

    const handleChange = (value) => {
        setDropdownSelectedValue(value);
        console.log(`selected ${value}`);
      };

    React.useEffect(()=>{
       getAllBucket().then((res)=>{
        const test=res.data.filter((item)=>{
            return item.id===cardData.bucketId;
        })
        setSelectedCardBucket(test[0].name)
        setDropdownSelectedValue(cardData.bucketId);
        console.log("test value is");
        console.log(test[0]);
        
            setBucketList([...(res.data)]);
        
        
       }).catch((err)=>{
        console.log(err);
       })
    },[])

    return (
        <Modal key={cardData.id} title="Create Card" visible={isModalVisible} onOk={()=>handleOk(cardData.id)} onCancel={()=>handleCancel(cardData.id)}>
            <Form name="basic" labelCol={{span: 8,}} wrapperCol={{span: 16,}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                initialValues={{
                    ["name"]:cardData.name,
                    ["link"]:cardData.link,
                }}
                >
                    
                {
                    (selectedCardBucket!==null)? <Form.Item label="category" rules={[{required: true,message: 'Please select Card Category!',},]}>
                    <Select defaultValue={selectedCardBucket} onChange={handleChange}>
                        {bucketList.map((item)=>{
                            return <Option key={item.id} value={String(item.id)} >{item.name}</Option>
                        })}
                    </Select>
                </Form.Item>:''
                }

                <Form.Item label="Card Name" name="name"
                    rules={[{required: true,message: 'Please input your Card Name!',},]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Video Link" name="link"
                    rules={[{required: true,message: 'Please input video Link!',},]}>
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8,span: 16,}}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </Modal>
    )

}