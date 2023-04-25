import { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CustomQuill(props) {
    const quillRef = useRef(null);

    useEffect(() => {
        return () => {
            if (quillRef.current) {
                quillRef.current = null;
            }
        };
    }, []);

    const destroyEditor = () => {
        if (!quillRef.current) {
            return;
        }
        quillRef.current.getEditor().off('text-change');
        quillRef.current = null;
    };

    return (
        <ReactQuill
            {...props}
            ref={quillRef}
            modules={{
                toolbar: [
                    [{ header: '1' }, { header: '2' }, { font: [] }],
                    [{ size: [] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                    ['link', 'image', 'video'],
                    ['clean'],
                ],
                clipboard: {
                    matchVisual: false,
                },
            }}
        />
    );
}

export default CustomQuill;
