import gfm from '@bytemd/plugin-gfm';
import { Editor } from '@bytemd/react';
import 'bytemd/dist/index.css';
import zh_Hans from 'bytemd/locales/zh_Hans.json';
import { useState } from 'react';

const plugins = [
  gfm(),
  // Add more plugins here
];

const App = () => {
  const [value, setValue] = useState('');

  return (
    <Editor
      value={value}
      plugins={plugins}
      locale={zh_Hans}
      onChange={(v) => {
        setValue(v);
      }}
    />
  );
};

export default App;
