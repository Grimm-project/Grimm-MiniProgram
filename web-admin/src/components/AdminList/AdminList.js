import { List, Skeleton, Modal } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { getAdminList, getAdmin, removeAdmin, switchAdminPanel} from '../../actions';
import { ADMIN_PANEL_TYPE } from "../../constants";
import { connect } from 'react-redux';

import './AdminList.less';
const { confirm } = Modal;

class AdminList extends React.Component {
  componentDidMount(){
    this.props.getAdminList();
  }

  render() {
    return (
            <List
                className="admin-list"
                loading={this.props.loading}
                itemLayout="horizontal"
                dataSource={this.props.admins}
                renderItem={item => (
                <List.Item
                    actions={[<span key="delete"  style={{display: (item.type==="root") ? "none" : "inline-block"}} className="list-item-button" onClick={this.props.onClickRemoveAdmin.bind(this, item)}>删除</span>]}
                    onClick={this.props.onClickAdmin.bind(this, item)}
                >
                    <Skeleton title={false} loading={this.props.loading} active>
                    <List.Item.Meta
                        title={<span className="admin-name">{(item.email_verified === 1?<CheckCircleOutlined style={{color: "#4caf50"}}/>:<ExclamationCircleOutlined  style={{color: "#ff5722"}}/>)}<span className="account-email">{item.email}</span></span>}
                    />
                    </Skeleton>
                </List.Item>
                )}
            />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  admins: state.admin.admins,
  loading: state.ui.loading
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClickAdmin : (adminInfo) => {
    dispatch(switchAdminPanel(ADMIN_PANEL_TYPE.DETAIL));
    dispatch(getAdmin(adminInfo.id));
  },
  onClickRemoveAdmin: (adminInfo)=>{
    confirm({
      title: '确定删除该用户吗?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        dispatch(removeAdmin(adminInfo.id));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  },
  getAdminList : () => {
    dispatch(getAdminList());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminList)