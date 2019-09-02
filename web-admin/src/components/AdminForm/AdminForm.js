
import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { loginAccount, publishAdmin } from '../../actions';
import { connect } from 'react-redux';
import "./AdminForm.css";

class AdminForm extends React.Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
            if(this.props.type === "create"){
                this.props.publishAdmin(values);
                return;
            }
            this.props.loginAccount(values);
        }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
        <Form onSubmit={this.handleSubmit} className="admin-form">
            <Form.Item>
            {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入您的用户名!' }],
            })(
                <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入您的用户名"
                />,
            )}
            </Form.Item>
            <Form.Item>
            {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入您的密码!' }],
            })(
                <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="请输入您的密码"
                />,
            )}
            </Form.Item>
            <Button type="primary" loading={this.props.loading} htmlType="submit" className="admin-form-button">{this.props.type === "create"?"注册":"登录"}
            </Button>
        </Form>
        );
    }
}

const WrappedNormalAdminForm = Form.create({ 
    mapPropsToFields(props) {
        return {};
    },
    })(AdminForm);



const mapStateToProps = (state, ownProps) => ({
    loading: state.ui.loading,
    type: state.ui.adminFormType
  });
  
const mapDispatchToProps = (dispatch, ownProps) => ({
    loginAccount: (user) => {
        dispatch(loginAccount(user));
    },
    publishAdmin: (user) => {
        dispatch(publishAdmin(user));
    }
  })
  
export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalAdminForm)
          