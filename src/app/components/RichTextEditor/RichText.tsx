import React, { useState, useEffect, useRef } from 'react';
import { 
  Editor, 
  EditorState, 
  RichUtils, 
  ContentState, 
  convertToRaw, 
  convertFromHTML,
  Modifier,
  ContentBlock,
  DefaultDraftBlockRenderMap
} from 'draft-js';
import Immutable from 'immutable';
import 'draft-js/dist/Draft.css';
import styles from './rich.module.css';
import { stateToHTML } from 'draft-js-export-html';
import { 
  FaBold, 
  FaItalic, 
  FaUnderline, 
  FaCode, 
  FaListUl, 
  FaListOl, 
  FaExpandAlt, 
  FaCompressAlt,
  FaUndo,
  FaRedo
} from 'react-icons/fa';
import { 
  MdTitle, 
  MdFormatSize,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatAlignJustify
} from 'react-icons/md';

interface RichTextEditorProps {
  initialContent: string;
  onSave: (content: string, title?: string) => void;
  onCancel: () => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialContent,
  onSave,
  onCancel,
  placeholder = 'Start writing...'
}) => {
  // Custom block renderer map for text alignment
  const blockRenderMap = Immutable.Map({
    'align-left': {
      element: 'div',
      wrapper: <div className={styles.alignLeft} />
    },
    'align-center': {
      element: 'div',
      wrapper: <div className={styles.alignCenter} />
    },
    'align-right': {
      element: 'div',
      wrapper: <div className={styles.alignRight} />
    },
    'align-justify': {
      element: 'div',
      wrapper: <div className={styles.alignJustify} />
    }
  });

  const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

  // Convert HTML to ContentState for Draft.js
  const getInitialState = () => {
    if (!initialContent) return EditorState.createEmpty();
    
    const blocksFromHTML = convertFromHTML(initialContent);
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    return EditorState.createWithContent(contentState);
  };

  const [editorState, setEditorState] = useState(getInitialState);
  const [expanded, setExpanded] = useState(false);
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [titleFormatting, setTitleFormatting] = useState({
    bold: false,
    italic: false,
    underline: false
  });
  const [fontSize, setFontSize] = useState('14px');
  const [editorHistory, setEditorHistory] = useState<EditorState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const editorRef = useRef<Editor>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Focus the editor when it mounts
    setTimeout(() => {
      editorRef.current?.focus();
    }, 100);
  }, []);

  // Track editor state changes for undo/redo
  useEffect(() => {
    if (editorState) {
      // Only add to history if content has changed
      if (editorHistory.length === 0 || 
          editorState.getCurrentContent() !== editorHistory[historyIndex]?.getCurrentContent()) {
        
        // Remove any future states if we're not at the end of history
        const newHistory = editorHistory.slice(0, historyIndex + 1);
        
        // Add current state to history
        newHistory.push(editorState);
        
        // Keep history size manageable
        if (newHistory.length > 50) {
          newHistory.shift();
        }
        
        setEditorHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
      }
    }
  }, [editorState]);

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const exportOptions = {
    inlineStyles: {
      // Add these custom inline styles
      BOLD: { element: 'strong' },
      ITALIC: { element: 'em' },
      UNDERLINE: { element: 'u' },
      CODE: { element: 'code' },
      FONTSIZE_8px: { style: { fontSize: '8px' } },
      FONTSIZE_10px: { style: { fontSize: '10px' } },
      FONTSIZE_12px: { style: { fontSize: '12px' } },
      FONTSIZE_14px: { style: { fontSize: '14px' } },
      FONTSIZE_16px: { style: { fontSize: '16px' } },
      FONTSIZE_18px: { style: { fontSize: '18px' } },
      FONTSIZE_20px: { style: { fontSize: '20px' } },
      FONTSIZE_24px: { style: { fontSize: '24px' } },
      FONTSIZE_30px: { style: { fontSize: '30px' } },
      FONTSIZE_36px: { style: { fontSize: '36px' } },
      FONTSIZE_48px: { style: { fontSize: '48px' } },
      FONTSIZE_60px: { style: { fontSize: '60px' } },
      FONTSIZE_72px: { style: { fontSize: '72px' } },
    },
    blockStyleFn: (block: ContentBlock) => {
      const blockType = block.getType();
      
      if (blockType === 'align-left') {
        return { style: { textAlign: 'left' } };
      }
      if (blockType === 'align-center') {
        return { style: { textAlign: 'center' } };
      }
      if (blockType === 'align-right') {
        return { style: { textAlign: 'right' } };
      }
      if (blockType === 'align-justify') {
        return { style: { textAlign: 'justify' } };
      }
      
      return {};
    },
  };
  
  // Custom styling for the editor
  const styleMap = {
    'FONTSIZE_8px': { fontSize: '8px' },
    'FONTSIZE_10px': { fontSize: '10px' },
    'FONTSIZE_12px': { fontSize: '12px' },
    'FONTSIZE_14px': { fontSize: '14px' },
    'FONTSIZE_16px': { fontSize: '16px' },
    'FONTSIZE_18px': { fontSize: '18px' },
    'FONTSIZE_20px': { fontSize: '20px' },
    'FONTSIZE_24px': { fontSize: '24px' },
    'FONTSIZE_30px': { fontSize: '30px' },
    'FONTSIZE_36px': { fontSize: '36px' },
    'FONTSIZE_48px': { fontSize: '48px' },
    'FONTSIZE_60px': { fontSize: '60px' },
    'FONTSIZE_72px': { fontSize: '72px' },
  };

  // Custom block styling for the editor
  const getBlockStyle = (block: ContentBlock) => {
    const type = block.getType();
    switch (type) {
      case 'align-left':
        return styles.alignLeft;
      case 'align-center':
        return styles.alignCenter;
      case 'align-right':
        return styles.alignRight;
      case 'align-justify':
        return styles.alignJustify;
      default:
        return '';
    }
  };

  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const html = stateToHTML(contentState, exportOptions);
  
    
    onSave(html);
  };

  const toggleBlockType = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle: string) => {
    if (isTitleFocused) {
      // Apply formatting to title
      switch(inlineStyle) {
        case 'BOLD':
          setTitleFormatting(prev => ({ ...prev, bold: !prev.bold }));
          break;
        case 'ITALIC':
          setTitleFormatting(prev => ({ ...prev, italic: !prev.italic }));
          break;
        case 'UNDERLINE':
          setTitleFormatting(prev => ({ ...prev, underline: !prev.underline }));
          break;
      }
    } else {
      // Apply formatting to content
      setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    }
  };

  const setTextAlignment = (alignment: string) => {
    if (isTitleFocused) return; // Text alignment doesn't apply to title input
    
    const newEditorState = RichUtils.toggleBlockType(
      editorState,
      alignment
    );
    setEditorState(newEditorState);
  };

  const handleFontSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = event.target.value;
    setFontSize(newSize);
    
    // Apply font size to selected text
    if (!isTitleFocused) {
      const selection = editorState.getSelection();
      
      // Remove existing font size styles first
      const contentState = editorState.getCurrentContent();
      const currentStyles = editorState.getCurrentInlineStyle();
      
      // Find and remove any existing font size styles
      let nextContentState = contentState;
      Object.keys(styleMap).forEach(fontSizeStyle => {
        if (currentStyles.has(fontSizeStyle)) {
          nextContentState = Modifier.removeInlineStyle(
            nextContentState,
            selection,
            fontSizeStyle
          );
        }
      });
      
      // Apply the new font size
      const contentWithFontSize = Modifier.applyInlineStyle(
        nextContentState,
        selection,
        `FONTSIZE_${newSize}`
      );
      
      const newEditorState = EditorState.push(
        editorState,
        contentWithFontSize,
        'change-inline-style'
      );
      
      setEditorState(newEditorState);
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setEditorState(editorHistory[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < editorHistory.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setEditorState(editorHistory[historyIndex + 1]);
    }
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Check if the current selection has the specified style
  const hasInlineStyle = (style: string) => {
    if (isTitleFocused) {
      switch(style) {
        case 'BOLD': return titleFormatting.bold;
        case 'ITALIC': return titleFormatting.italic;
        case 'UNDERLINE': return titleFormatting.underline;
        default: return false;
      }
    }
    const currentStyle = editorState.getCurrentInlineStyle();
    return currentStyle.has(style);
  };

  // Check if the current block has the specified type
  const hasBlockStyle = (blockType: string) => {
    if (isTitleFocused) return false; // Block styles don't apply to title
    
    const selection = editorState.getSelection();
    const blockKey = selection.getStartKey();
    const block = editorState.getCurrentContent().getBlockForKey(blockKey);
    return block.getType() === blockType;
  };
  
  // Font size options
  const fontSizes = ['8px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '30px', '36px', '48px', '60px', '72px'];
  
  return (
    <div className={`${styles.richTextEditor} ${expanded ? styles.expanded : ''}`}>
      <div className={styles.toolbar}>
        <div className={styles.inlineStyleControls}>
          <button 
            className={`${styles.styleButton} ${hasInlineStyle('BOLD') ? styles.active : ''}`}
            onClick={(e) => {
              e.preventDefault();
              toggleInlineStyle('BOLD');
            }}
            title="Bold"
          >
            <FaBold />
          </button>
          <button 
            className={`${styles.styleButton} ${hasInlineStyle('ITALIC') ? styles.active : ''}`}
            onClick={(e) => {
              e.preventDefault();
              toggleInlineStyle('ITALIC');
            }}
            title="Italic"
          >
            <FaItalic />
          </button>
          <button 
            className={`${styles.styleButton} ${hasInlineStyle('UNDERLINE') ? styles.active : ''}`}
            onClick={(e) => {
              e.preventDefault();
              toggleInlineStyle('UNDERLINE');
            }}
            title="Underline"
          >
            <FaUnderline />
          </button>
          <button 
            className={`${styles.styleButton} ${hasInlineStyle('CODE') ? styles.active : ''}`}
            onClick={(e) => {
              e.preventDefault();
              if (!isTitleFocused) toggleInlineStyle('CODE');
            }}
            title="Code"
            disabled={isTitleFocused}
          >
            <FaCode />
          </button>
        </div>

        <div className={styles.fontSizeControl}>
          <select 
            value={fontSize}
            onChange={handleFontSizeChange}
            className={styles.fontSizeSelector}
          >
            {fontSizes.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.blockStyleControls}>
          <button 
            className={`${styles.styleButton} ${hasBlockStyle('unordered-list-item') ? styles.active : ''}`}
            onClick={(e) => {
              e.preventDefault();
              if (!isTitleFocused) toggleBlockType('unordered-list-item');
            }}
            title="Unordered List"
            disabled={isTitleFocused}
          >
            <FaListUl />
          </button>
          <button 
            className={`${styles.styleButton} ${hasBlockStyle('ordered-list-item') ? styles.active : ''}`}
            onClick={(e) => {
              e.preventDefault();
              if (!isTitleFocused) toggleBlockType('ordered-list-item');
            }}
            title="Ordered List"
            disabled={isTitleFocused}
          >
            <FaListOl />
          </button>
          <button 
            className={`${styles.styleButton} ${hasBlockStyle('header-one') ? styles.active : ''}`}
            onClick={(e) => {
              e.preventDefault();
              if (!isTitleFocused) toggleBlockType('header-one');
            }}
            title="Heading 1"
            disabled={isTitleFocused}
          >
            <MdTitle size={18} />
          </button>
          <button 
            className={`${styles.styleButton} ${hasBlockStyle('header-two') ? styles.active : ''}`}
            onClick={(e) => {
              e.preventDefault();
              if (!isTitleFocused) toggleBlockType('header-two');
            }}
            title="Heading 2"
            disabled={isTitleFocused}
          >
            <MdFormatSize />
          </button>
        </div>
        
        <div className={styles.alignmentControls}>
          <button 
            className={`${styles.styleButton} ${hasBlockStyle('align-left') ? styles.active : ''}`}
            onClick={(e) => {
              e.preventDefault();
              if (!isTitleFocused) setTextAlignment('align-left');
            }}
            title="Align Left"
            disabled={isTitleFocused}
          >
            <MdFormatAlignLeft />
          </button>
          <button 
            className={`${styles.styleButton} ${hasBlockStyle('align-center') ? styles.active : ''}`}
            onClick={(e) => {
              e.preventDefault();
              if (!isTitleFocused) setTextAlignment('align-center');
            }}
            title="Align Center"
            disabled={isTitleFocused}
          >
            <MdFormatAlignCenter />
          </button>
          <button 
            className={`${styles.styleButton} ${hasBlockStyle('align-right') ? styles.active : ''}`}
            onClick={(e) => {
              e.preventDefault();
              if (!isTitleFocused) setTextAlignment('align-right');
            }}
            title="Align Right"
            disabled={isTitleFocused}
          >
            <MdFormatAlignRight />
          </button>
          <button 
            className={`${styles.styleButton} ${hasBlockStyle('align-justify') ? styles.active : ''}`}
            onClick={(e) => {
              e.preventDefault();
              if (!isTitleFocused) setTextAlignment('align-justify');
            }}
            title="Justify"
            disabled={isTitleFocused}
          >
            <MdFormatAlignJustify />
          </button>
        </div>

        <div className={styles.historyControls}>
          <button 
            className={styles.styleButton}
            onClick={(e) => {
              e.preventDefault();
              handleUndo();
            }}
            title="Undo"
            disabled={historyIndex <= 0}
          >
            <FaUndo />
          </button>
          <button 
            className={styles.styleButton}
            onClick={(e) => {
              e.preventDefault();
              handleRedo();
            }}
            title="Redo"
            disabled={historyIndex >= editorHistory.length - 1}
          >
            <FaRedo />
          </button>
        </div>
      </div>
    
      
      <div 
        className={styles.editorContainer} 
        onClick={() => {
          setIsTitleFocused(false);
          editorRef.current?.focus();
        }}
        ref={containerRef}
      >
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          placeholder={placeholder}
          spellCheck={true}
          onFocus={() => setIsTitleFocused(false)}
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          blockRenderMap={extendedBlockRenderMap}
        />
      </div>
      <div className={styles.actions}>
        <button className={styles.saveButton} onClick={handleSave}>
          Save
        </button>
        <button className={styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RichTextEditor;