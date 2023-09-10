import Footer from '@/components/Footer';
import { register } from '@/services/ant-design-pro/api';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { ProForm, ProFormCaptcha, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { FormattedMessage, Helmet, history, SelectLang, useIntl } from '@umijs/max';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';
import { Link } from 'umi';
import Settings from '../../../../config/defaultSettings';

const Lang = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  return (
    <div className={langClassName} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};

const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });
  const formWrapperClassName = useEmotionCss(() => {
    return {
      flex: '1',
      padding: '32px 0',
      maxWidth: '75vw',
      minWidth: 280,
      margin: '0 auto',
    };
  });

  const intl = useIntl();

  const handleSubmit = async (values: API.RegisterParams) => {
    try {
      console.log(';values', values);
      // 登录
      const res = await register({ ...values });
      if (res.code === 200) {
        const defaultRegisterSuccessMessage = intl.formatMessage({
          id: 'pages.register.success',
          defaultMessage: '注册成功！',
        });
        message.success(defaultRegisterSuccessMessage);
        setTimeout(() => {
          history.push('/user/login');
        }, 500);
        return;
      } else {
        message.warning(res.msg);
      }
    } catch (error) {
      const defaultRegisterFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '注册失败，请重试！',
      });
      console.log(error);
      message.error(defaultRegisterFailureMessage + error);
    }
  };

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.login',
            defaultMessage: '登录页',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <Lang />
      <div className={formWrapperClassName}>
        <div className="ant-pro-form-login-top" style={{ paddingTop: '24px' }}>
          <div className="ant-pro-form-login-header">
            <span className="ant-pro-form-login-logo">
              <img alt="logo" src="/logo.svg" />
            </span>
            <span className="ant-pro-form-login-title">Ardor</span>
          </div>
          <div className="ant-pro-form-login-desc">
            {intl.formatMessage({
              id: 'pages.layouts.userLayout.title',
              defaultMessage: 'ardor牛逼',
            })}
          </div>
        </div>
        <ProForm
          onFinish={handleSubmit}
          submitter={{
            submitButtonProps: {
              size: 'large',
              block: true,
            },
            resetButtonProps: {
              style: {
                display: 'none',
              },
            },
            searchConfig: {
              submitText: '提交',
            },
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: intl.formatMessage({
                  id: 'pages.login.registerAccount',
                  defaultMessage: '注册账户',
                }),
              },
              // {
              //   key: 'register',
              //   label: intl.formatMessage({
              //     id: 'pages.login.registerAccount',
              //     defaultMessage: '注册账户',
              //   }),
              // },
            ]}
          />

          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MailOutlined />,
              }}
              name="email"
              placeholder={intl.formatMessage({
                id: 'pages.register.placeholder',
                defaultMessage: '邮箱',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.register.required"
                      defaultMessage="邮箱是必填项！"
                    />
                  ),
                },
                {
                  pattern: /[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/,
                  message: (
                    <FormattedMessage id="pages.register.invalid" defaultMessage="邮箱格式错误！" />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.register.password.placeholder',
                defaultMessage: '密码',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="密码是必填项！"
                    />
                  ),
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
              }}
              captchaProps={{
                size: 'large',
              }}
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
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.captcha.required"
                      defaultMessage="请输入验证码！"
                    />
                  ),
                },
              ]}
              onGetCaptcha={async (phone) => {
                const result = await getFakeCaptcha({
                  phone,
                });
                if (!result) {
                  return;
                }
                message.success('获取验证码成功！验证码为：1234');
              }}
            />
          </>
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Link key="config" to="/user/login">
              <FormattedMessage id="pages.register.login" defaultMessage="账号登录" />
            </Link>
          </div>
        </ProForm>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
