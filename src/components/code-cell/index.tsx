import React, { useState, useEffect } from 'react';
import CodeEditor from '../code-editor';
import Resizable from '../resizable';
import Preview from '../preview';
import bundle from '../../bundler';

function CodeCell() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      setCode(await (await bundle(input)).code);
      setError(await (await bundle(input)).error);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue='// Hello World
          '
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} error={error} />
      </div>
    </Resizable>
  );
}

export default CodeCell;