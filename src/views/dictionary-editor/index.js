import React, { memo, useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-dracula';
import welcomeTxt from '../../util/welcome'
import Parser from "../../util/parser";
import present from "./present";
import {Filter} from "../../util/filter";

const LocalStorageKey = 'definitions';

const generateSortedText = text => {
    const t = new Parser().parseText(text)
    return [ present(t), t ]
}

// inits
const initEditorText = localStorage.getItem(LocalStorageKey) || welcomeTxt;
const initData = generateSortedText(initEditorText);

export function DictionaryEditor() {

    // refs
    const refs = { aceEditor: React.createRef() };

    // State Hooks
    const [searchResults, setSearchResults] = useState([]);
    const [editorText, setEditorText] = useState(initData[0]);
    const [treeMap, setTreeMap] = useState(initData[1])

    useEffect(() => {
        const editor = refs.aceEditor.current.editor;
        editor.resize(true);
        editor.commands.addCommand({
            name: "saver",
            exec: function() {
                localStorage.setItem(LocalStorageKey, editorText);
                console.log("saved!")
            },
            bindKey: {mac: "cmd-s", win: "ctrl-s"}
        })
        editor.commands.addCommand({
            name: "sorter",
            exec: function() {
                const currentColumn = editor.getSelectionRange().start.column;
                const currentRow = editor.getSelectionRange().start.row;
                const currentLine = editor.session.getLine(currentRow).capitalize();
                const [sortedText, t] = generateSortedText(editorText);
                let newPos = currentRow
                const results = currentLine && Filter(t.keys(), s => s.startsWith(currentLine))
                if (results.length > 0) {
                    const toFind = t.get(results[0]).toLine()
                    newPos = sortedText.split("\n").indexOf(toFind)
                }
                setEditorText(sortedText)
                setTreeMap(t)
                editor.gotoLine(newPos+1, currentColumn, true);
                console.log("sorted!")
            },
            bindKey: {mac: "cmd-r", win: "ctrl-r"}
        })
    })

    const onSearch = e => {
        const toSearch = e.target.value
        let results = []
        if (toSearch !== "") {
            results = Filter(treeMap.keys(), s => s.startsWith(toSearch.capitalize()))
        }
        setSearchResults(results)

        if (results.length > 0) {
            const editor = refs.aceEditor.current.editor;
            const currentRow = editor.getSelectionRange().start.row;
            const first = results[0]
            const line = treeMap.get(first).toLine()
            const newPos = editorText.split("\n").indexOf(line) || currentRow
            editor.gotoLine(newPos+1, 0, true);
        }
    }

    const showSearchStatus = () => {
        const length = searchResults.length;
        if (length === 0) {
            return ""
        } else if (length === 1) {
            return `Found 1 result. First: ${searchResults[0]}`
        } else {
            return `Found ${length} results. First: ${searchResults[0]}`
        }
    }

    return (
        <div>
            <AceEditor
                editorProps={{ $blockScrolling: true }}
                height="calc(100vh - 30px)"
                mode="yaml"
                name="ace-editor"
                theme="dracula"
                width="100%"
                ref={refs.aceEditor}
                value={editorText}
                onChange={setEditorText}
            />
            <div className="row">
                <div className="col-6">
                    <input type="search"
                           className="col-12 search-box"
                           placeholder="Search"
                           onChange={onSearch}/>
                </div>
                <div className="col-4">{showSearchStatus()}</div>
                <div className="col-2">CMD+S=Save CMD+R=Reload/Sort</div>
            </div>

        </div>
    )
}