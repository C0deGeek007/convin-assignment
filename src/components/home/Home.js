import React, { useState } from 'react';
import Header from '../header/Header';
import './Home.css'
import { Button, Modal, Form, Input } from 'antd';
import 'antd/dist/antd.css';
import { createCard, getAllBucket, createBucket, addCardInExistingBucket, getEmbededBucketList} from '../../services/card';
import { Select } from 'antd';
import { BucketList } from '../bucketList/BucketList';

export function Home() {

    const { Option } = Select;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState([]);
    const [bucketList, setBucketList]=useState([]);
    const [isDisabled,setDisabled]=useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    //   getAllBucketItems();
    };

    // const getAllBucketItems=()=>{ 
    //     getAllBucket().then((res)=>{
    //        setBucketList([...(res.data)]);
    //     }).catch((err)=>{
    //       console.log(err);
    //     })
    // }
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const onFinish = (values) => {
        if(selectedValue.length!=0) {
            if(selectedValue[0].key>=bucketList.length) {
                //new bucket added
                const bucketInfo={
                    name:selectedValue[0].value,
                }
                createBucket(bucketInfo).then((res) =>{
                    const cardData={
                        ...values,
                        bucketId:res.data.id
                    }
                    console.log("bucket added successfully");
                    console.log(res);
                    embededBucketList();
                    addCardInExistingBucket(cardData)
                }).catch((err)=>{
                    console.log("bucket add err");
                    console.log(err);
                })
            } else {
                //new card added in existing bucket
                const cardData={
                    bucketId:selectedValue[0].key,
                    ...values
                }
                console.log("adding to existing bucket");
                console.log(cardData);
               addCardToBucket(cardData);
            }
        }
      };

      const addCardToBucket=(cardData)=> {
        addCardInExistingBucket(cardData).then((res)=>{
            console.log("card added to existing bucket");
            console.log(res)
            embededBucketList();
        }).catch((err)=>{
            console.log(err);
        })
      }
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
      
      const handleChange = (index) => {
        if(!isNaN(index)) {
            const value=bucketList[index].name
            setSelectedValue([{key:parseInt(index) , value}])
        } else {
            const value=index[0];
            setSelectedValue([{key:bucketList.length, value}]);
        }
        setDisabled(!isDisabled);
      };
      const handleClear=()=>{
        setDisabled(!isDisabled);
        setSelectedValue([]);
      }

      React.useEffect(()=>{
        // getEmbededBucketList().then((res)=>{
        //     // const data=[]
        //     setBucketItems([...(res.data)]);
        // }).catch((err)=>{
        //     console.log(err);
        // })
        embededBucketList();
    },[])

      const embededBucketList=()=> {
        getEmbededBucketList().then((res)=>{
            // const data=[]
            setBucketList([...(res.data)]);
        }).catch((err)=>{
            console.log(err);
        })
    }

    return (
        <div className='home-container'>
           <div className='create-card-container'>
             <Button type="primary" onClick={showModal}>Create Card</Button>
           </div>

           <div>
            <Modal title="Create Card" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form name="basic" labelCol={{span: 8,}} wrapperCol={{span: 16,}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    >

                    <Form.Item label="category" rules={[{required: true,message: 'Please select Card Category!',},]}>
                        <Select disabled={isDisabled} mode="tags"onChange={handleChange} value={selectedValue}>
                            {bucketList.map((item)=>{
                                return <Option key={item.id} value={String(item.id)} >{item.name}</Option>
                            })}
                            {/* <Option key={1} value="1">Jack</Option>
                            <Option key={2} value="2">Lucy</Option> */}
                        </Select>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 8,span: 16,}}>
                        <Button type="primary" onClick={handleClear}>Clear Select</Button>
                    </Form.Item>

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
           </div>
           <div>
            <BucketList bucketList={bucketList} embededBucketList={embededBucketList}></BucketList>
           </div>
        </div>
    );
}

export default Home;