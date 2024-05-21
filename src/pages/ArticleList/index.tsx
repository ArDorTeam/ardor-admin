import {
  deleteArticle,
  getArticleList,
  getCategoryList,
  getTagList,
} from '@/services/ant-design-pro/api';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, DatePicker, message, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'umi';

const { RangePicker } = DatePicker;
// 分类选项
// const categoryOption: string[] = [
//   '前端',
//   '后端',
//   'Android',
//   'IOS',
//   '人工智能',
//   '开发工具',
//   '代码人生',
//   '阅读',
// ];
// tag选项暂时写死
const tagOption: { label: string; value: number }[] = [
  { label: '算法', value: 1 },
  { label: '性能优化', value: 2 },
  { label: '架构', value: 3 },
];
const isTopOption: { label: string; value: boolean }[] = [
  { label: '是', value: true },
  { label: '否', value: false },
];

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const intl = useIntl();
  const [messageApi] = message.useMessage();
  // const [modal, contextHolder] = Modal.useModal();
  const [categoryOption, setCategoryOption] = useState<string[]>([]);
  const [tagOption, setTagOption] = useState<string[]>([]);
  const getCategory = async () => {
    setCategoryOption([]);
    const { data } = await getCategoryList();
    setCategoryOption(data.map((item: API.CategoryListItem) => item.title));
  };

  const getTag = async () => {
    setTagOption([]);
    const { data } = await getTagList();
    setTagOption(data.map((item: API.TagListItem) => item.tag_name));
  };
  useEffect(() => {
    getCategory();
    getTag();
  }, []);

  const handleDeleteArticle = async ({
    article_id,
    title,
  }: {
    article_id: string;
    title: string;
  }) => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      title: intl.formatMessage({
        id: 'article.table.delete',
        defaultMessage: '删除',
      }),
      content:
        intl.formatMessage({
          id: 'article.table.delete.tips',
          defaultMessage: '确定删除文章：',
        }) +
        title +
        '?',
      async onOk() {
        try {
          const { code, message } = await deleteArticle({ article_id });
          if (code === 200) {
            messageApi.open({
              type: 'success',
              content: message,
            });
            actionRef?.current?.reload();
          }
          return true;
        } catch (e) {
          return true;
        }
      },
    });
  };

  const columns: ProColumns<API.ArticleListItem>[] = [
    {
      title: <FormattedMessage id="article.table.title" defaultMessage="title" />,
      dataIndex: 'title',
      fieldProps: {
        options: isTopOption,
        dataindex: 'searchValue',
      },
      // render: (dom) => {
      //   return <a>{dom}</a>;
      // },
    },
    {
      title: (
        <FormattedMessage id="article.table.createTime" defaultMessage="article create time" />
      ),
      dataIndex: 'gmt_create',
      valueType: 'date',
      sorter: true,
      renderFormItem: () => <RangePicker />,
    },
    {
      title: (
        <FormattedMessage id="article.table.updateTime" defaultMessage="article update time" />
      ),
      dataIndex: 'gmt_modified',
      valueType: 'date',
      sorter: true,
      hideInForm: true,
      renderFormItem: () => <RangePicker />,
    },
    {
      title: <FormattedMessage id="article.table.pageView" defaultMessage="Status" />,
      dataIndex: 'visits',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: <FormattedMessage id="article.table.category" defaultMessage="article category" />,
      dataIndex: 'article_type',
      valueType: 'select',
      fieldProps: {
        options: categoryOption,
      },
    },
    {
      title: <FormattedMessage id="article.table.tags" defaultMessage="article tags" />,
      dataIndex: 'tags',
      valueType: 'select',
      fieldProps: {
        options: tagOption,
        mode: 'multiple',
      },
    },
    {
      title: <FormattedMessage id="article.table.top" defaultMessage="article is top" />,
      dataIndex: 'is_recommend',
      valueType: 'select',
      fieldProps: {
        options: isTopOption,
      },
    },
    {
      title: <FormattedMessage id="article.table.option" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (text, record) => [
        <Link key="config" to={`/article/edit/${record.article_id}`} target="_blank">
          <FormattedMessage id="article.table.edit" defaultMessage="Configuration" />
        </Link>,
        <a key="delete" onClick={() => handleDeleteArticle(record)}>
          <FormattedMessage id="article.table.delete" defaultMessage="Subscribe to alerts" />
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.ArticleListItem, API.PageParams>
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
          defaultCollapsed: false,
        }}
        toolBarRender={() => [
          <Button type="primary" key="primary">
            <Link key="config" to="/article/edit/new" target="_blank">
              <FormattedMessage id="article.table.writing" defaultMessage="writing" />
            </Link>
          </Button>,
        ]}
        request={getArticleList}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
