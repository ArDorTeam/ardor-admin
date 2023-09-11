import { addArticle } from '@/services/ant-design-pro/api';
import { PageContainer } from '@ant-design/pro-components';
import gfm from '@bytemd/plugin-gfm';
import { Editor } from '@bytemd/react';
import { useIntl } from '@umijs/max';
import { Input, message } from 'antd';
import 'bytemd/dist/index.css';
import zh_Hans from 'bytemd/locales/zh_Hans.json';
import { useState } from 'react';
import { useParams } from 'umi';

import PublicPopOver from './components/PublicPopOver';
import style from './index.less';

const plugins = [
  gfm(),
  // Add more plugins here
];

const App: React.FC = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const params = useParams();
  console.log('onCancel', params.id);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  // 发布
  const onPublic = async (params: {
    category: string;
    tag?: number[];
    cover_url?: string;
    sub_title?: string;
  }) => {
    if (!content || !title) {
      message.warning(
        intl.formatMessage({
          id: 'article.writing.public.rule',
          defaultMessage: '标题和内容必须要有!',
        }),
      );
      return;
    }
    const res = await addArticle({ ...params, content, title });
    console.log('res', res);
  };

  return (
    <PageContainer
      header={{
        title: '文章编辑',
      }}
    >
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
          <PublicPopOver onPublic={onPublic}></PublicPopOver>
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
    </PageContainer>
  );
};

export default App;
