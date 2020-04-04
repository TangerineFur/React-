import React, { Component } from 'react'
import { Layout, Dropdown ,Menu,Avatar} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined
} from '@ant-design/icons';
const { Header } = Layout;
/* header区域 */
export default class TopHeader extends Component {
    state = {
        collapsed: false
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        })
    }
    render() {
        const menu = (
            <Menu>
              <Menu.Item>
                <div>管理员</div>
              </Menu.Item>
              <Menu.Item>
                <div onClick={this.exit}>退出</div>
              </Menu.Item>
            </Menu>
            )
        return (
            <Header className="site-layout-background" style={{ padding: 0}}>
                {
                    this.state.collapsed ?
                        <MenuUnfoldOutlined onClick={this.toggle} className="trigger" />
                        :
                        <MenuFoldOutlined onClick={this.toggle} className="trigger" />
                }
                {/* 下拉菜单 */}
                <div style={{float:"right",margin:'0px 16px'}}>
                <Dropdown overlay={menu}>
                    <Avatar size={'large'} icon={<UserOutlined />} />
                </Dropdown>
                </div>
            </Header>
        )
    }
}
