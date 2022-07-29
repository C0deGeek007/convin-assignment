import React, { useState } from 'react';
import { getEmbededBucketList, deleteCard, addToHistory } from '../../services/card';
import { Card } from 'antd';
import './BucketList.css'
import { Button, Modal, Form, Input } from 'antd';
import { CustomModal } from '../customModal/customModal';
import { Edit } from '../edit/Edit';


export function BucketList(props) {

    // const[bucketList,setBucketItems]=useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCardData,setSelectedCardData]=useState({});
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const bucketList=props.bucketList;
    const embededBucketList=props.embededBucketList;

    const showModal = (card) => {
        setSelectedCardData({...card});
        setIsModalVisible(true);
        const playingHistory= {
            cardId:card.id,
            name:card.name,
            link:card.link,
            time:new Date().toLocaleTimeString()
        }
        addToHistory(playingHistory).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
      };

      const handleOk = (id) => {
        setSelectedCardData({});
        setIsModalVisible(false);
      };
    
      const handleCancel = (id) => {
        setSelectedCardData({});
        setIsModalVisible(false);
      };

      const showModalEdit = (card) => {
        setSelectedCardData({...card});
        setIsEditModalVisible(true);
      };

      const handleOkEdit = (id) => {
        setSelectedCardData({});
        setIsEditModalVisible(false);
      };
    
      const handleCancelEdit = (id) => {
        setSelectedCardData({});
        setIsEditModalVisible(false);
      };

    React.useEffect(()=>{
        // getEmbededBucketList().then((res)=>{
        //     // const data=[]
        //     setBucketItems([...(res.data)]);
        // }).catch((err)=>{
        //     console.log(err);
        // })
       // embededBucketList();
    },[])

    // const embededBucketList=()=> {
    //     getEmbededBucketList().then((res)=>{
    //         // const data=[]
    //         setBucketItems([...(res.data)]);
    //     }).catch((err)=>{
    //         console.log(err);
    //     })
    // }

   const deleteCardById=(cardId)=> {
    deleteCard(cardId).then((res)=>{
     embededBucketList()
    }).catch((err)=>{
        console.log(err);
    })
   }

    return (
        <div>
            {
               bucketList.map((bucket)=>{
                   return (<div key={bucket.id} className='bucket-container'>
                    <h3>{bucket.name}</h3>
                    {
                        <div className='cards-container'>
                            {
                                 bucket.cards.map((card)=>{
                                    return  <Card key={card.id} className='card'
                                    title={card.name}
                                    bordered={true}
                                    style={{
                                      width: 200,
                                    }}
                                    
                                  >
                                    <div className='video-link-container'>
                                        <span onClick={()=>showModal(card)}>{card.link}</span>
                                        <Button type="primary" onClick={()=>showModalEdit(card)}>Edit</Button>
                                        <Button type="primary" danger onClick={()=>{deleteCardById(card.id)}}>Delete</Button>
                                    </div>
                                  </Card>
                                })
                            }
                        </div>
                    }
                   </div>
                   )
               })
            }
            <div>
                { isEditModalVisible? <Edit cardData={selectedCardData} isModalVisible={isEditModalVisible} handleOk={handleOkEdit} handleCancel={handleCancelEdit}  embededBucketList={embededBucketList} ></Edit>:''}
            </div>
            <div>
                {isModalVisible?<CustomModal cardData={selectedCardData} isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel}></CustomModal>:''}
            </div>
        </div>
    )
}
