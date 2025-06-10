import React from 'react';
import ReactQuill from 'react-quill';

interface ReactQuillWrapperProps {
  value: string;
  onChange: (content: string) => void;
  modules: any;
  formats: string[];
  placeholder?: string;
  style?: React.CSSProperties;
  theme?: string;
}

const ReactQuillWrapper = React.forwardRef<ReactQuill, ReactQuillWrapperProps>((props, ref) => {
  return <ReactQuill ref={ref} {...props} />;
});

ReactQuillWrapper.displayName = 'ReactQuillWrapper';

export default ReactQuillWrapper;