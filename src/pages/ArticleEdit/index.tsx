import { PageContainer } from '@ant-design/pro-components';
import gfm from '@bytemd/plugin-gfm';
import { Editor } from '@bytemd/react';
import { useIntl } from '@umijs/max';
import { Input } from 'antd';
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
  const [value, setValue] = useState('');
  const params = useParams();
  console.log('onCancel', params.id);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

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
          />
          <PublicPopOver></PublicPopOver>
        </div>
        <div className={style.editor}>
          <Editor
            value={value}
            plugins={plugins}
            locale={zh_Hans}
            onChange={(v) => {
              setValue(v);
            }}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default App;
