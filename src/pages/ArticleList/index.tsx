import { getArticleList } from '@/services/ant-design-pro/api';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { FormattedMessage } from '@umijs/max';
import { Button } from 'antd';
import React, { useRef } from 'react';
import { Link } from 'umi';
/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
// const handleRemove = async (selectedRows: API.RuleListItem[]) => {
//   const hide = message.loading('正在删除');
//   if (!selectedRows) return true;
//   try {
//     await removeRule({
//       key: selectedRows.map((row) => row.key),
//     });
//     hide();
//     message.success('Deleted successfully and will refresh soon');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('Delete failed, please try again');
//     return false;
//   }
// };

const TableList: React.FC = () => {
  // 分类选项
  const categoryOption: string[] = [
    '前端',
    '后端',
    'Android',
    'IOS',
    '人工智能',
    '开发工具',
    '代码人生',
    '阅读',
  ];
  // tag选项暂时写死
  const tagOption: { label: string; value: number }[] = [
    { label: '算法', value: 1 },
    { label: '性能优化', value: 2 },
    { label: '架构', value: 3 },
  ];
  const isTopOption: { label: string; value: number }[] = [
    { label: '是', value: 1 },
    { label: '否', value: 0 },
  ];

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.ArticleListItem>[] = [
    {
      title: <FormattedMessage id="article.table.title" defaultMessage="title" />,
      dataIndex: 'title',
      fieldProps: {
        options: isTopOption,
        dataindex: 'searchValue',
      },
      render: (dom) => {
        return <a>{dom}</a>;
      },
    },
    {
      title: (
        <FormattedMessage id="article.table.createTime" defaultMessage="article create time" />
      ),
      dataIndex: 'gmt_create',
      valueType: 'dateRange',
      sorter: true,
    },
    {
      title: (
        <FormattedMessage id="article.table.updateTime" defaultMessage="article update time" />
      ),
      dataIndex: 'gmt_modified',
      valueType: 'dateRange',
      sorter: true,
      hideInForm: true,
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
      render: () => [
        <Link key="config" to="/article/edit/222" target="_blank">
          <FormattedMessage id="article.table.edit" defaultMessage="Configuration" />
        </Link>,
        <a key="subscribeAlert" href="https://procomponents.ant.design/">
          <FormattedMessage id="article.table.delete" defaultMessage="Subscribe to alerts" />
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.ArticleListItem, API.PageParams>
        actionRef={actionRef}
        rowKey="key"
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
