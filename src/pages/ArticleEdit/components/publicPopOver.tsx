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
  tags: string;
  tagRule: string;
  cover: string;
  coverUploadText: string;
  coverRule: string;
  abstract: string;
  abstractRule: string;
  public: string;
  cancel: string;
  recommend: string;
};

type tags = {
  value: number;
  name: string;
};

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 19 },
};

const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.file?.response?.data;
};

const PublicPopOver: React.FC<{
  onPublic: (param: {
    category_id: string;
    tag?: number[];
    cover_url?: string;
    sub_title?: string;
    is_recommend: boolean;
  }) => void;
  popoverParams: API.getArticleResultData;
  category: API.CategoryListItem[];
  tag: API.TagListItem[];
}> = (props) => {
  const intl = useIntl();
  const [open, setOpen] = useState<boolean>(false);
  const [locals] = useState<locals>({
    title: intl.formatMessage({
      id: 'article.writing.popover.title',
      defaultMessage: 'public article',
    }),
    category: intl.formatMessage({
      id: 'article.writing.popover.category',
      defaultMessage: '分类',
    }),
    categoryRule: intl.formatMessage({
      id: 'article.writing.popover.categoryRule',
      defaultMessage: '请选择分类',
    }),
    tags: intl.formatMessage({
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
    coverRule: intl.formatMessage({
      id: 'article.writing.popover.cover.rule',
      defaultMessage: '请上传封面!',
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
    recommend: intl.formatMessage({
      id: 'article.writing.popover.recommend',
      defaultMessage: '是否置顶',
    }),
  });

  const onFinish = async (values: {
    category_id: string;
    tags?: string[];
    cover_url?: string;
    sub_title?: string;
    is_recommend: boolean;
  }) => {
    console.log('Received values of form: ', values);
    // const res = await addArticle(values)
    props?.onPublic(values);
  };

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
            category_id: '',
            tag: [],
            sub_title: props?.popoverParams?.sub_title,
            is_recommend: props?.popoverParams?.is_recommend || false,
            cover_url: props?.popoverParams?.cover_url,
          }}
          style={{ maxWidth: 500 }}
        >
          <Form.Item
            name="category_id"
            label={locals.category}
            rules={[{ required: true, message: locals.categoryRule }]}
          >
            <Radio.Group rootClassName={style['public-form-radio']}>
              {props?.category.map(({ category_id, title }) => (
                <Radio.Button value={category_id} key={category_id}>
                  {title}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Form.Item>

          <Form.Item name="tags" label={locals.tags}>
            <Select mode="multiple" placeholder={locals.tagRule} allowClear>
              {props?.tag.map((item) => (
                <Option value={item.tag_id} key={item.tag_id}>
                  {item.tag_name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={locals.cover}
            name="cover_url"
            valuePropName="data"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: locals.coverRule,
                type: 'url',
              },
            ]}
          >
            <Upload
              name="file"
              action="/api/v1/upload"
              listType="picture-card"
              maxCount={1}
              defaultFileList={
                props?.popoverParams?.cover_url
                  ? [
                      {
                        uid: '-1',
                        name: 'image.png',
                        status: 'done',
                        url: props?.popoverParams?.cover_url,
                      },
                    ]
                  : []
              }
            >
              <p className="ant-upload-drag-icon">
                <PlusOutlined />
              </p>
              <p className="ant-upload-text">{locals.coverUploadText}</p>
            </Upload>
          </Form.Item>

          <Form.Item
            label={locals.abstract}
            name="sub_title"
            rules={[
              {
                required: true,
                message: locals.abstractRule,
              },
            ]}
          >
            <TextArea placeholder={locals.abstractRule} showCount maxLength={100} />
          </Form.Item>

          <Form.Item label={locals.recommend} name="is_recommend">
            <Radio.Group
              options={[
                { label: '是', value: true },
                { label: '否', value: false },
              ]}
            ></Radio.Group>
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
