'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Upload, FileText, Image as ImageIcon, Bold, Italic, List, ListOrdered, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import styles from "./richTextEditor.module.css";
import 'react-quill/dist/quill.snow.css';

import ReactQuillWrapper from '../ReactQuilWrapper';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const quillRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const [isProcessingPdf, setIsProcessingPdf] = useState(false);
  const [pdfError, setPdfError] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Set up PDF.js worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  }, []);

  // Quill modules configuration
  const modules = useMemo(() => ({
    toolbar: {
      container: '#toolbar',
    },
    clipboard: {
      matchVisual: false,
    },
  }), []);

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'align', 'color', 'background'
  ];

  // Handle image upload from device
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        if (quillRef.current) {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection(true);
          const index = range ? range.index : quill.getLength();
          quill.insertEmbed(index, 'image', imageUrl);
          quill.setSelection(index + 1);
        }
      };
      reader.readAsDataURL(file);
    }
    event.target.value = '';
  };

  // Handle PDF upload and text extraction
  const handlePdfUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setIsProcessingPdf(true);
      setPdfError('');
      
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
        let extractedText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items
            .map((item: any) => item.str)
            .join(' ');
          extractedText += pageText + '\n\n';
        }

        // Clean up the extracted text
        const cleanedText = extractedText
          .replace(/\s+/g, ' ')
          .replace(/\n\s*\n/g, '\n\n')
          .trim();

        if (cleanedText) {
          onChange(cleanedText);
        } else {
          setPdfError('No text could be extracted from this PDF');
        }
      } catch (error) {
        console.error('Error processing PDF:', error);
        setPdfError('Error processing PDF file. Please try again.');
      } finally {
        setIsProcessingPdf(false);
      }
    }
    event.target.value = '';
  };

  // Custom toolbar handlers
  const insertImage = () => {
    fileInputRef.current?.click();
  };

  const insertPdf = () => {
    pdfInputRef.current?.click();
  };

  // Don't render until client-side
  if (!isClient) {
    return (
      <div style={{ height: '400px', border: '2px solid #e5e7eb', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading editor...
      </div>
    );
  }

   return (
    <div className={styles.richEditorContainer}>
      {/* Custom Toolbar */}
      <div id="toolbar" className={styles.qlToolbarCustom}>
        <div className={styles.toolbarGroup}>
          <button className="ql-bold" title="Bold" type="button">
            <Bold size={16} />
          </button>
          <button className="ql-italic" title="Italic" type="button">
            <Italic size={16} />
          </button>
        </div>

        <div className={styles.toolbarGroup}>
          <button className="ql-list" value="ordered" title="Numbered List" type="button">
            <ListOrdered size={16} />
          </button>
          <button className="ql-list" value="bullet" title="Bullet List" type="button">
            <List size={16} />
          </button>
        </div>

        <div className={styles.toolbarGroup}>
          <button className="ql-align" value="" title="Align Left" type="button">
            <AlignLeft size={16} />
          </button>
          <button className="ql-align" value="center" title="Align Center" type="button">
            <AlignCenter size={16} />
          </button>
          <button className="ql-align" value="right" title="Align Right" type="button">
            <AlignRight size={16} />
          </button>
        </div>

        <div className={styles.toolbarGroup}>
          <button onClick={insertImage} type="button" title="Upload Image">
            <ImageIcon size={16} />
          </button>
          <button 
            onClick={insertPdf} 
            type="button" 
            title="Upload PDF and Extract Text"
            disabled={isProcessingPdf}
          >
            <FileText size={16} />
            {isProcessingPdf && <span className={styles.processingIndicator}>...</span>}
          </button>
        </div>
      </div>

      {/* Error message for PDF processing */}
      {pdfError && (
        <div className={styles.pdfError}>
          {pdfError}
        </div>
      )}

      {/* Processing indicator */}
      {isProcessingPdf && (
        <div className={styles.pdfProcessing}>
          Processing PDF... Please wait.
        </div>
      )}

      {/* Rich Text Editor */}
      <ReactQuillWrapper
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="Write your blog content here..."
        style={{ height: '400px' }}
      />

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
      <input
        ref={pdfInputRef}
        type="file"
        accept=".pdf"
        onChange={handlePdfUpload}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default RichTextEditor;