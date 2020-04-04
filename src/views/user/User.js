import React, { Component } from 'react'
import axios from 'axios'
import { Table, Switch, Button, Modal, Form, Input, Select } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { Option } = Select
export default class User extends Component {
    state = {
        columns: [
            { title: '角色名称', dataIndex: 'roleName', key: 'roleName' },
            { title: '用户名', dataIndex: 'username', key: 'username' },
            /*
              状态控制
              defaultChecked选中状态
             render中(data)获取到就是roleState值
             数据中有default则禁用
            */
            {
                title: '用户状态',
                dataIndex: 'roleState',
                key: 'roleState',
                render: (data, item) => {
                    // console.log(item)
                    return <Switch defaultChecked={data} disabled={item.default} />
                }
            },
            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                render: (item) => <div>
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<EditOutlined />}
                        disabled={item.default}
                    />
                                    &nbsp;
                                <Button
                        type="danger"
                        shape="circle"
                        icon={<DeleteOutlined />}
                        disabled={item.default}
                    />
                </div>
            },
        ],
        dataList: [],
        visible: false,
        // roType记录选中的权限等级
        roType:1

    }
    componentDidMount() {
        axios.get("http://localhost:4000/users").then(res => {
            // console.log(res.data)
            this.setState({
                dataList: res.data
            })
        })
    }
    // 新增用户对话框
    addUser = () => {
        this.setState({
            visible: true
        })
    }
    //新增用户
    addOk = () => {
       console.log(this.refs.addform)
        this.refs.addform.validateFields()
        .then(values =>{
            this.refs.addform.resetFields(); //重置
            // console.log({...values,roType:this.state.roType,roleState:false})
            axios.post("http://localhost:4000/users",{...values,roType:this.state.roType,roleState:false}).then(res=>{
                // console.log(res)
                // 局部帅新重新渲染并隐藏对话框
                this.setState({
                    //先把旧数据展开，再把新数据插入
                    dataList:[...this.state.dataList,res.data],
                    visible:false
                })
            })
        })

    }
    // 选择框Select获取到选中的值
    onChange =(data) =>{
        // 根据不同的名字设置不同的权限等级
        this.setState({
            roType:["小编","管理员","超级管理员"].indexOf(data)+1
        })
    }
    render() {
        return (
            <div>
                <Button type="primary" onClick={this.addUser}>新增用户</Button>
                <Table
                    columns={this.state.columns}
                    dataSource={this.state.dataList}
                    rowKey={item => {
                        return item.id
                    }} //设置key值    
                >
                </Table>

                {/* 添加用户对话框 */}
                <Modal
                    title="添加用户"
                    visible={this.state.visible}
                    onOk={this.addOk}
                    onCancel={() => {
                        this.setState({
                            visible: false
                        })
                    }}
                >   
                {/* 表单输入 */}
                    <Form
                        ref="addform"
                        layout="vertical"
                        name="form_in_modal"
                    >
                        <Form.Item
                            name="username"
                            label="用户名"
                            rules={[{ required: true, message: '请输入用户名' }]}
                        >
                            <Input type="text" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="密码"
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input type="password" />
                        </Form.Item>
                        <Form.Item
                            name="roleName"
                            label="角色"
                            rules={[{ required: true, message: '请选择角色' }]}
                        >   
                        {/* 下拉选择框 */}
                            <Select
                                showSearch
                                placeholder="请选择一个角色"
                                optionFilterProp="children"
                                onChange={this.onChange}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="超级管理员">超级管理员</Option>
                                <Option value="管理员">管理员</Option>
                                <Option value="小编">小编</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
