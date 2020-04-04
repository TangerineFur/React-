import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import Menus from '../../router/menu'
import {withRouter} from 'react-router'
const { Sider } = Layout;
const { SubMenu } = Menu;
/* 左侧nav区域 */
class SideMenu extends Component {
    state = {
        collapsed: false,
    }
    render() {
        //刷新后，默认选中当前路由
        // 获取到当前路径
        console.log(this.props)
        let pathname = this.props.location.pathname
        let OpenKeys = ["/"+pathname.split("/")[1]] //默认打开
        let SelectedKeys = [pathname]   //默认选中
        return (
            <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                <div className="logo" />
                <Menu 
                    theme="dark" mode="inline" 
                    defaultSelectedKeys={['1']} 
                    onClick={this.routeSkip}
                    defaultOpenKeys={OpenKeys}  //默认打开
                    defaultSelectedKeys={SelectedKeys}  //默认选中
                >
                    {this.NavItem(Menus)}
                </Menu>
            </Sider>
        )
    }
    // 路由跳转
    routeSkip = (obj) =>{
        // console.log(obj)
        this.props.history.push(obj.key)
    }
    // 路由遍历
    NavItem = (Menus) => {
        // 如果路由中包含children则遍历二级路由否则一级路由
        return Menus.map(item => {
            if (item.children) {
                return (
                    <SubMenu
                        key={item.path}
                        title={
                            <span>
                                <item.icon />
                                <span>{item.title}</span>
                            </span>
                        }
                    >   
                        {/* 递归二级路由 */}
                       {this.NavItem(item.children)}
                    </SubMenu>
                )
            } else {
                return (
                    <Menu.Item key={item.path}>
                        <item.icon />
                        <span>{item.title}</span>
                    </Menu.Item>
                )
            }
        })
    }
}
export default withRouter(SideMenu)
//withRouter -->获取低阶组件封装成高阶组件SideMenu继承withRouter--->DashBoard