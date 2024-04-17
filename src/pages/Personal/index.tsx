import { updateUser } from '@/services/ant-design-pro/api';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { ProForm, ProFormInstance } from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
import { Col, Form, Input, message, Row, Space, Upload } from 'antd';
import React, { useRef, useState } from 'react';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
};

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};

const PublicPopOver: React.FC = () => {
  const intl = useIntl();
  const [uploadLoading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { initialState } = useModel('@@initialState');
  const { user_avatar, email, user_name, user_id, mobile } = initialState?.currentUser || {};
  const [userAvatar, setUserAvatar] = useState(user_avatar);
  const formRef = useRef<ProFormInstance>();

  /**
   * @description 上传文件改变时的回调，上传每个阶段都会触发该事件
   * @param e
   */
  const handleChange = (e: any) => {
    const response = e?.file?.response;
    if (response) {
      if (response.data) setUserAvatar(response.data);
      setLoading(false);
    } else setLoading(true);
  };

  const onFinish = async (values: { email?: string; user_avatar?: string; user_name?: string }) => {
    try {
      const { code, message } = await updateUser({
        user_id,
        mobile,
        email: values.email || undefined,
        user_avatar: values.user_avatar || undefined,
        user_name: values.user_name || undefined,
      });
      if (code === 200) {
        messageApi.success(message);
      } else {
        messageApi.warning(message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onReset = (e: any) => {
    setUserAvatar(e?.user_avatar);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.file?.response?.data;
  };

  const uploadButton = (
    <div>
      {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>
        {intl.formatMessage({
          id: 'app.settings.basic.upload.avatar',
          defaultMessage: '上传头像',
        })}
      </div>
    </div>
  );

  return (
    <ProForm<{
      name: string;
      user_avatar?: string;
      company?: string;
      useMode?: string;
    }>
      formRef={formRef}
      layout="horizontal"
      {...formItemLayout}
      onFinish={onFinish}
      onReset={onReset}
      params={{}}
      initialValues={{
        email,
        user_name,
        user_avatar,
      }}
      submitter={{
        render: (props, doms) => {
          return (
            <Row>
              <Col span={14} offset={4}>
                <Space>{doms}</Space>
              </Col>
            </Row>
          );
        },
      }}
    >
      {contextHolder}
      <Form.Item
        name="user_avatar"
        label={intl.formatMessage({
          id: 'app.settings.basic.avatar',
          defaultMessage: '头像',
        })}
        valuePropName="data"
        getValueFromEvent={normFile}
      >
        <Upload
          listType="picture-card"
          showUploadList={false}
          action="/api/v1/upload"
          onChange={handleChange}
          maxCount={1}
          defaultFileList={
            user_avatar
              ? [
                  {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: user_avatar,
                  },
                ]
              : []
          }
        >
          {userAvatar ? (
            <img src={userAvatar} alt="avatar" style={{ width: '100%' }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </Form.Item>
      <Form.Item
        name="email"
        label={intl.formatMessage({
          id: 'app.settings.basic.email',
          defaultMessage: '邮箱',
        })}
        rules={[{ type: 'email' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="user_name"
        label={intl.formatMessage({
          id: 'app.settings.basic.nickname',
          defaultMessage: '昵称',
        })}
      >
        <Input />
      </Form.Item>
      {/* <Form.Item
        label={intl.formatMessage({
          id: 'pages.register.password.placeholder',
          defaultMessage: '密码',
        })}
        name="password"
      >
        <Input />
      </Form.Item> */}
      {/* <Form.Item
        label="Confirm Password"
        name="password2"
        dependencies={['password']}
        rules={[
          {
            required: true,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input />
      </Form.Item> */}
      {/* <ProFormCaptcha
        label={intl.formatMessage({
          id: 'pages.login.phoneLogin.getVerificationCode',
          defaultMessage: '获取验证码',
        })}
        placeholder={intl.formatMessage({
          id: 'pages.login.captcha.placeholder',
          defaultMessage: '请输入验证码',
        })}
        captchaTextRender={(timing, count) => {
          if (timing) {
            return `${count} ${intl.formatMessage({
              id: 'pages.getCaptchaSecondText',
              defaultMessage: '获取验证码',
            })}`;
          }
          return intl.formatMessage({
            id: 'pages.login.phoneLogin.getVerificationCode',
            defaultMessage: '获取验证码',
          });
        }}
        name="captcha"
        onGetCaptcha={async (phone) => {
          const result = await getFakeCaptcha({
            phone,
          });
          if (!result) {
            return;
          }
          message.success('获取验证码成功！验证码为：1234');
        }}
      /> */}
    </ProForm>
  );
};

export default PublicPopOver;
