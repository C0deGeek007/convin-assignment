import React, { useState } from 'react';
import Header from '../header/Header';
import './History.css'
import { Table } from 'antd';
import { getAllHistory } from '../../services/card';


export function History() {

    const [data,setTableData]=useState([]);

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
        },
        {
          title: 'Link',
          dataIndex: 'link',
        },
        {
          title: 'Time',
          dataIndex: 'time',
        },
      ];

      React.useEffect(()=>{
       getTableInfo();
    },[])

    const getTableInfo=()=>{
        getAllHistory().then((res)=>{
           let playedHistory= res.data.filter((item)=>{
                item.key=item.id;
                console.log(item);
                return item;
            })
            console.log(playedHistory);
            setTableData(playedHistory);
        }).catch((err)=>{
            console.log(err);
        })
    }

    return (
        <div className='history-container'>
            <Table columns={columns} dataSource={data} size="middle" />
            {/* <h4>Small size table</h4> */}
            {/* <Table columns={columns} dataSource={data} size="small" /> */}
        </div>
        
    );
}

export default History;