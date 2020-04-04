import React, { Component } from 'react'
import axios from 'axios'
import { Table,Tag} from 'antd';
export default class Role extends Component {
    state = {
        columns: [
            { title: '角色名称', dataIndex: 'roleName', key: 'roleName' },
            {
                title: '操作',
                dataIndex: 'id',
                key: 'x',
                render: () => <a>Delete</a>
            }
        ],
        dataList:[]
    }
    componentDidMount() {
        axios.get("http://localhost:4000/roles").then(res=>{
            // console.log(res.data)
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
                    rowKey= {item=>{
                        // console.log(item)
                        return item.id
                    }} //设置key值
                expandable={{   //展开
                    expandedRowRender: record =>{
                        // console.log(record.roleRight)
                        return  <div style={{ margin: 0 }}>
                                    {
                                         record.roleRight.map(item=>
                                            <div key={item.category}>
                                                {
                                                    item.list.map(data=>
                                                     <Tag color={"green"} key={data}>{data}</Tag>
                                                     )
                                                }
                                            </div> 
                                         )
                                    }
                                </div>
                    }
                }}
                />,
            </div>
        )
    }
}
