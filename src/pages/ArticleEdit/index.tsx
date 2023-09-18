import { addArticle, getArticleDetail, updateArticle } from '@/services/ant-design-pro/api';
import { PageContainer } from '@ant-design/pro-components';
import gfm from '@bytemd/plugin-gfm';
import { Editor } from '@bytemd/react';
import { history, useIntl } from '@umijs/max';
import { Input, message, Spin } from 'antd';
import 'bytemd/dist/index.css';
import zh_Hans from 'bytemd/locales/zh_Hans.json';
import { useEffect, useState } from 'react';
import { useParams } from 'umi';

import PublicPopOver from './components/PublicPopOver';
import style from './index.less';

const plugins = [
  gfm(),
  // Add more plugins here
];

const App: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [popoverParams, setPopoverParams] = useState({ article_id: '' });
  const [spinning, setSpinning] = useState(false);
  const params = useParams();

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  // 获取文章详情
  const getArticle = async () => {
    try {
      setSpinning(true);
      const { code, data, message } = await getArticleDetail({ article_id: params.id || '' });
      if (code === 200) {
        setContent(data.content);
        setTitle(data.title);
        setPopoverParams(data);
      } else {
        messageApi.warning(message);
      }
    } finally {
      setSpinning(false);
    }
  };

  // 发布或编辑
  const onPublic = async (params: {
    category: string;
    tag?: number[];
    cover_url?: string;
    sub_title?: string;
    is_recommend: boolean;
  }) => {
    if (!content || !title) {
      messageApi.warning(
        intl.formatMessage({
          id: 'article.writing.public.rule',
          defaultMessage: '标题和内容必须要有!',
        }),
      );
      return;
    }
    try {
      const articleParams = {
        ...params,
        content,
        title,
        category: undefined,
        tag: undefined,
      };
      const res = popoverParams.article_id
        ? await updateArticle({ ...articleParams, article_id: popoverParams.article_id })
        : await addArticle(articleParams);
      if (res.code === 200) {
        messageApi.success(
          intl.formatMessage({
            id: 'article.writing.public.success',
            defaultMessage: '发布成功!',
          }),
        );
        setTimeout(() => {
          history.push('/article');
        }, 500);
      } else {
        messageApi.warning(res.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (params.id !== 'new') getArticle();
  }, []);

  return (
    <PageContainer
      header={{
        title: '文章编辑',
      }}
    >
      {contextHolder}
      <Spin tip="Loading..." spinning={spinning}>
        <div className={style['article-writing-container']}>
          <div className={style.header}>
            <Input
              placeholder={intl.formatMessage({
                id: 'article.writing.placeholder',
                defaultMessage: 'enter title',
              })}
              className={style['title-input']}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <PublicPopOver onPublic={onPublic} popoverParams={popoverParams}></PublicPopOver>
          </div>
          <div className={style.editor}>
            <Editor
              value={content}
              plugins={plugins}
              locale={zh_Hans}
              onChange={(v) => {
                setContent(v);
              }}
            />
          </div>
        </div>
      </Spin>
    </PageContainer>
  );
};

export default App;
