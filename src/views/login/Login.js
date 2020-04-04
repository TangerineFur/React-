import React, { Component } from 'react'
import Particles from 'react-particles-js'
import axios from 'axios'
import './Login.css'
import { Form, Input, Button,message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
export default class Login extends Component {
	render() {
		// 登录校验
		const onFinish = values => {
			// console.log('Received values of form: ', values);
			axios.get(`http://localhost:4000/users?username=${values.username}&password=${values.password}`).then(res=>{
				// console.log(res.data)
				if(res.data.length>0){
					// localStorage.setItem("isLogin",true)
					this.props.history.push('/')
				}else{
					//失败弹出
					// console.log("用户名密码不匹配")
					message.error('用户名密码不匹配');
				}
			})
		}
		return (
			<div className="logins">
				{/* 表单校验 */}
				<Form
					name="normal_login"
					className="login-form"
					// initialValues={{ remember: true }}
					onFinish={onFinish}
				>
					<Form.Item
						name="username"
						rules={[{ required: true, message: '请输入用户名' }]}
					>
						<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
					</Form.Item>
					<Form.Item
						name="password"
						rules={[{ required: true, message: '请输入密码' }]}
					>
						<Input
							prefix={<LockOutlined className="site-form-item-icon" />}
							type="password"
							placeholder="Password"
						/>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" className="login-form-button">
							登录
        				</Button>
					</Form.Item>
				</Form>
				{/* 粒子效果插件 */}
				<Particles
					height={window.innerHeight - 5 + "px"}
					params={{
						"interactivity": {
							"detect_on": "canvas",
							"events": {
								"onhover": {
									"enable": false,
									"mode": "repulse"
								},
								"onclick": {
									"enable": true,
									"mode": "push"
								},
								"resize": true
							},
							"modes": {
								"grab": {
									"distance": 800,
									"line_linked": {
										"opacity": 1
									}
								},
								"bubble": {
									"distance": 800,
									"size": 80,
									"duration": 2,
									"opacity": 0.8,
									"speed": 3
								},
								"repulse": {
									"distance": 400,
									"duration": 0.4
								},
								"push": {
									"particles_nb": 4
								},
								"remove": {
									"particles_nb": 2
								}
							}
						}
					}}
				></Particles>
			</div>
		)
	}
}
