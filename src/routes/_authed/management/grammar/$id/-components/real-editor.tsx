import Quill from "quill";
import { forwardRef, useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";

interface CustomEditorProps {
	value?: string;
	onChange?: (content: string) => void;
	readOnly?: boolean;
	placeholder?: string;
}

const CustomEditor = forwardRef<Quill, CustomEditorProps>(
	(
		{
			value = "",
			onChange,
			readOnly = false,
			placeholder = "Write something...",
		},
		ref,
	) => {
		const editorRef = useRef<HTMLDivElement>(null);
		const quillRef = useRef<Quill | null>(null);
		const [editorId] = useState(
			`quill-editor-${Math.random().toString(36).substring(2, 9)}`,
		);

		useEffect(() => {
			const destroyQuill = () => {
				if (quillRef.current) {
					quillRef.current = null;
				}
				document
					.querySelectorAll(".ql-toolbar")
					.forEach((toolbar) => toolbar.remove());
				if (editorRef.current) {
					editorRef.current.innerHTML = "";
					const editorElement = document.createElement("div");
					editorElement.id = editorId;
					editorRef.current.appendChild(editorElement);
					return editorElement;
				}
				return null;
			};

			const editorElement = destroyQuill();
			if (!editorElement) return;

			const modules = {
				toolbar: [
					[{ header: [1, 2, 3, 4, 5, 6, false] }],
					["bold", "italic", "underline", "strike"],
				],
			};

			const quill = new Quill(editorElement, {
				theme: "snow",
				modules,
				placeholder,
				readOnly,
			});
			quillRef.current = quill;

			quill.on("text-change", () => {
				if (onChange) {
					onChange(quill.root.innerHTML);
				}
			});

			return () => {
				destroyQuill();
			};
		}, [placeholder, readOnly, editorId, onChange]);

		return <div ref={editorRef} className="custom-editor-container"></div>;
	},
);

export default CustomEditor;
