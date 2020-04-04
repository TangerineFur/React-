import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Home from '../home/Home'
import User from '../user/User'
import Role from '../jurisdiction/Role'
import Jurisdiction from '../jurisdiction/Jurisdiction'
import ArticleList from '../article/ArticleList'
import Classify from '../article/Classify'
import Error from '../error/Error'
import './DashBoard.css'
import SideMenu from './SideMenu'
import TopHeader from './TopHeader'
import { Layout} from 'antd';
const {Content } = Layout;

export default class DashBoard extends Component {
    render() {
        return (
                <Layout style={{height:'100%',width:'100%'}}>
                    <SideMenu></SideMenu>
                    <Layout className="site-layout">
                       <TopHeader></TopHeader>
                        {/* 主体内容区域 */}
                        <Content
                            className="site-layout-background"
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                minHeight: 280,
                            }}
                        >
                            <Switch>
                                {/* 首页 */}
                                <Route path="/home" component={Home}></Route>
                                {/* 用户列表 */}
                                <Route path="/user-manage/user" component={User}></Route>
                                {/* 角色列表 */}
                                <Route path="/right-manage/role" component={Role}></Route>
                                {/* 权限列表 */}
                                <Route path="/right-manage/jurisdiction" component={Jurisdiction}></Route>
                                {/* 文章列表 */}
                                <Route path="/article-manage/ArticleList" component={ArticleList}></Route>
                                {/* 文章分类 */}
                                <Route path="/article-manages/classify" component={Classify}></Route>
                                {/* 重定向 */}
                                <Redirect from="/" to="/home" exact></Redirect>
                                {/* 404 */}
                                <Route path="*" component={Error}></Route>
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
        )
    }
}
