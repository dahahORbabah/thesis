import React from 'react';
import { observer, inject } from 'mobx-react';
import { Layout } from 'antd';
import styles from './UserPage.module.less';
import { Header } from '../../../uui/Header/Header';
import { CustomSider } from '../../../uui/Sider/Sider';
import { Breadcrumb } from '../../../uui/Breadcrumb/Breadcrumb';
import { StudentMainPage } from '../../StudentPages/MainPage/MainPage';
import { TeacherMainPage } from '../../TeacherPages/MainPage/MainPage';
import { AdminMainPage } from '../../AdminPages/MainPage';

const { Content } = Layout;

@inject('userStore')
@observer
export class UserPage extends React.Component<any> {
    componentDidMount = (): void => {

        if (localStorage.length) {
            const userId = localStorage.getItem('userId');
            console.log(userId);
            this.props.userStore.getUserById(userId);
        } 
           
        // temporary mock

        this.props.userStore.findUser('admin', '321'); //admin
        // this.props.userStore.findUser('Plyusha_Plyushechkina', '123'); //student
        // this.props.userStore.findUser('Pusyash_Pushistyj', '321'); //teacher

    };

    private renderHeader = (): React.ReactNode => {               
        return (
            <Header
                user={this.props.userStore.user} 
            />
        );
    };

    private renderSider = (): React.ReactNode => {
        return (
            <CustomSider {...this.props} />
        );
    };

    // private renderBreadcrumb = (): React.ReactNode => {
    //     return (
    //         <Breadcrumb />
    //     );
    // };

    private renderUserContent = (): React.ReactNode => {
        if (this.props.userStore.user) {
            if (this.props.userStore.user.role === 'teacher') {
                return <TeacherMainPage user={this.props.userStore.user} />;
            } else if (this.props.userStore.user.role === 'student') {
                return <StudentMainPage user={this.props.userStore.user} />;
            } else return <AdminMainPage user={this.props.userStore.user} />;
        } else return null;
    };

    private renderContent = (): React.ReactNode => {
        return (
            <Content>
                <article className={styles.temp}>
                    {this.renderUserContent()}
                </article>
            </Content>
        );
    };
        
    render(): React.ReactChild {        
        return (
            <>
                <Layout>
                    {this.renderSider()}
                    <Layout>
                        {this.renderHeader()}
                        {/* {this.renderBreadcrumb()} */}
                        {this.renderContent()}
                    </Layout>
                </Layout>
            </>
        );
    }
}