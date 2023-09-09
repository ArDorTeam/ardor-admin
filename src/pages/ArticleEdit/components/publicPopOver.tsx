import { PlusOutlined } from '@ant-design/icons';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Form, Input, Popover, Radio, Select, Space, Upload } from 'antd';
import React, { useState } from 'react';

import style from '../index.less';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
};

const { TextArea } = Input;
const { Option } = Select;

type locals = {
  title: string;
  category: string;
  categoryRule: string;
  tag: string;
  tagRule: string;
  cover: string;
  coverUploadText: string;
  abstract: string;
  abstractRule: string;
  public: string;
  cancel: string;
};

type tags = {
  value: number;
  name: string;
};

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 15 },
};

const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const onFinish = (values: any) => {
  console.log('Received values of form: ', values);
};

const PublicPopOver: React.FC = () => {
  const intl = useIntl();
  const [open, setOpen] = useState<boolean>(false);
  const [tagArr] = useState<tags[]>([
    { name: '算法', value: 1 },
    { name: '性能优化', value: 2 },
    { name: '架构', value: 3 },
  ]);
  const [categoryArr] = useState<string[]>([
    '前端',
    '后端',
    'Android',
    'IOS',
    '人工智能',
    '开发工具',
    '代码人生',
    '阅读',
  ]);
  const [locals] = useState<locals>({
    title: intl.formatMessage({
      id: 'article.writing.popover.title',
      defaultMessage: 'public article',
    }),
    category: intl.formatMessage({
      id: 'article.writing.popover.class',
      defaultMessage: '分类',
    }),
    categoryRule: intl.formatMessage({
      id: 'article.writing.popover.classRule',
      defaultMessage: '请选择分类',
    }),
    tag: intl.formatMessage({
      id: 'article.writing.popover.tag',
      defaultMessage: '添加标签',
    }),
    tagRule: intl.formatMessage({
      id: 'article.writing.popover.tagRule',
      defaultMessage: '请选择标签',
    }),
    cover: intl.formatMessage({
      id: 'article.writing.popover.cover',
      defaultMessage: '封面',
    }),
    coverUploadText: intl.formatMessage({
      id: 'article.writing.popover.coverUploadText',
      defaultMessage: '上传封面',
    }),
    abstract: intl.formatMessage({
      id: 'article.writing.popover.abstract',
      defaultMessage: '编辑摘要',
    }),
    abstractRule: intl.formatMessage({
      id: 'article.writing.popover.abstractRule',
      defaultMessage: '请填写编辑摘要',
    }),
    public: intl.formatMessage({
      id: 'article.writing.popover.public',
      defaultMessage: '确定并发布',
    }),
    cancel: intl.formatMessage({
      id: 'global.cancel',
      defaultMessage: '取消',
    }),
  });

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <Popover
      title={locals.title}
      overlayClassName={style['article-public-form']}
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
      placement="bottomLeft"
      content={
        <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          initialValues={{
            category: '前端',
            tag: [],
            abstract: '',
          }}
          style={{ maxWidth: 500 }}
        >
          <Form.Item
            name="category"
            label={locals.category}
            rules={[{ required: true, message: locals.categoryRule }]}
          >
            <Radio.Group>
              {categoryArr.map((item) => (
                <Radio.Button value={item} key={item}>
                  {item}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="tag"
            label={locals.tag}
            rules={[
              {
                required: true,
                message: locals.tagRule,
                type: 'array',
              },
            ]}
          >
            <Select mode="multiple" placeholder={locals.tagRule} allowClear>
              {tagArr.map((item) => (
                <Option value={item.value} key={item.value}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label={locals.cover}>
            <Form.Item name="cover" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
              <Upload.Dragger name="file" action="/api/v1/upload">
                <p className="ant-upload-drag-icon">
                  <PlusOutlined />
                </p>
                <p className="ant-upload-text">{locals.coverUploadText}</p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>

          <Form.Item
            label={locals.abstract}
            name="abstract"
            rules={[
              {
                required: true,
                message: locals.abstractRule,
                type: 'array',
              },
            ]}
          >
            <TextArea placeholder={locals.abstractRule} showCount maxLength={100} />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 11 }}>
            <Space>
              <Button onClick={hide}>{locals.cancel}</Button>
              <Button type="primary" htmlType="submit">
                {locals.public}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      }
    >
      <Button type="primary">
        <FormattedMessage id="article.writing.public" defaultMessage="public" />
      </Button>
    </Popover>
  );
};

export default PublicPopOver;
