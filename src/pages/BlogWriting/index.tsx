import gfm from '@bytemd/plugin-gfm';
import { Editor } from '@bytemd/react';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Input } from 'antd';
import 'bytemd/dist/index.css';
import zh_Hans from 'bytemd/locales/zh_Hans.json';
import { useState } from 'react';
import { useParams } from 'umi';
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
    <div className={style['blog-writing-container']}>
      <div className={style.header}>
        <Input
          placeholder={intl.formatMessage({
            id: 'blog.writing.placeholder',
            defaultMessage: 'enter title',
          })}
          className={style['title-input']}
        />
        <Button type="primary">
          <FormattedMessage id="blog.writing.public" defaultMessage="public" />
        </Button>
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
  );
};

export default App;
