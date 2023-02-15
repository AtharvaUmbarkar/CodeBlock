import { editor as MonacoEditor } from "monaco-editor";

export interface ThemesInterface {
  [key: string]: {
    data: MonacoEditor.IStandaloneThemeData;
    name: string;
  };
}

export interface CodeDetailsInterface {
  title: string;
  description: string;
  source: string;
  language: string;
  theme: string;
  themeLabel: string;
  code: string;
  editorOptions: MonacoEditor.IEditorOptions;
  dateCreated: number;
  dateModified: number;
}
