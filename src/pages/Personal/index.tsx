import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { ProForm, ProFormInstance } from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
import { Col, Form, Input, Row, Space, Upload } from 'antd';
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
  wrapperCol: { span: 5 },
};

const PublicPopOver: React.FC = () => {
  const intl = useIntl();
  const [uploadLoading, setLoading] = useState(false);
  const { initialState } = useModel('@@initialState');
  const { user_avatar, email } = initialState?.currentUser || {};
  const formRef = useRef<ProFormInstance>();
  // useEffect(() => {
  //   formRef?.current?.setFieldsValue({
  //     user_avatar,
  //     email,
  //   });
  // }, []);

  const beforeUpload = () => {};
  const handleChange = () => {
    setLoading(true);
  };
  const onFinish = async (values: { email?: string; user_avatar?: string; password?: string }) => {
    console.log(values);
  };

  const uploadButton = (
    <div>
      {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
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
      params={{}}
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
      <Form.Item
        name="user_avatar"
        label={intl.formatMessage({
          id: 'app.settings.basic.avatar',
          defaultMessage: '头像',
        })}
      >
        <Upload
          listType="picture-card"
          showUploadList={false}
          action="/api/v1/upload"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {user_avatar ? (
            <img src={user_avatar} alt="avatar" style={{ width: '100%' }} />
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
        initialValue={email}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({
          id: 'pages.register.password.placeholder',
          defaultMessage: '密码',
        })}
        name="password"
      >
        <Input />
      </Form.Item>
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
