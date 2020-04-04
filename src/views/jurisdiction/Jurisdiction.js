import React, { Component } from 'react'
import axios from 'axios'
import { Table, Divider, Tag } from 'antd';
export default class Jurisdiction extends Component {
    state={
        columns:[
            {
                title: '序号',
                dataIndex: 'id',
                key: 'id',
              },
              {
                title: '权限名称',
                dataIndex: 'title',
                key: 'title',
              },
              {
                title: '权限等级',
                dataIndex: 'grade',
                key: 'grade',
                render:item=>{
                    let arr =["green","orange","red"]
                    return <Tag color={arr[item-1]}>{item}</Tag>
                  }
              },
        ],
        dataList:[
            
        ]
    }
    componentDidMount(){
        axios.get("http://localhost:4000/rights").then(res=>{
            console.log(res)
            this.setState({
                dataList:res.data
            })
        })
    }
    render() {
        return (
            <div>
                <Table 
                columns={this.state.columns} 
                dataSource={this.state.dataList} 
                pagination={{pageSize:7}} //分页控制
                >
                </Table>
            </div>
        )
    }
}
