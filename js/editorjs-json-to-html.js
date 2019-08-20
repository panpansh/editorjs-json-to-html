function f_editorjs_convert_json_to_html(json) {
    var output_HTML = '';
    output_HTML += '<div class="codex-editor">\n';
    output_HTML += '<div class="codex-editor__redactor">\n';
    json.blocks.map( function(obj) {
        switch (obj.type) {
            case 'delimiter':
                output_HTML += '<div class="ce-block"><div class="ce-block__content"><div class="ce-delimiter cdx-block"></div></div></div>\n';
                break;

            case 'checklist':
                var checklist = '';
                obj.data.items.map( function (item) {
                    var checked_ext = '';
                    if ( item.checked ) {
                        checked_ext = '--checked'
                    }
                    checklist += '<div class="cdx-checklist__item cdx-checklist__item'
                    + checked_ext + '"><span class="cdx-checklist__item-checkbox"></span><div class="cdx-checklist__item-text">'
                    + item.text + '</div></div>';
                });
                output_HTML += '<div class="ce-block"><div class="ce-block__content"><div class="cdx-block cdx-checklist">'
                + checklist + '</div></div></div>\n';
                break;

            case 'header':
                output_HTML += '<div class="ce-block"><div class="ce-block__content"><h'
                + obj.data.level + ' class="ce-header">'
                + obj.data.text + '</h'
                + obj.data.level + '></div></div>\n';
                break;

            case 'paragraph':
                output_HTML += '<div class="ce-block"><div class="ce-block__content"><div class="ce-paragraph cdx-block">'
                + obj.data.text + '</div></div></div>\n';
                break;

            case 'table':
                var rows = '';
                obj.data.content.map( function(row) {
                    cells = '';
                    row.map( function (cell) {
                        cells += '<td class="tc-table__cell"><div class="tc-table__area">'
                        + cell + '</div></td>\n';
                    });
                    rows += '<tr>' + cells + '</tr>\n';
                });
                output_HTML += '<div class="ce-block"><div class="ce-block__content"><div class="tc-editor cdx-block">'
                + '<div class="tc-table__wrap"><table class="tc-table"><tbody>'
                + rows + '</tbody></table></div></div></div></div>\n';
                break;
          
            default:
                return '';
        }
    });
    output_HTML += '</div>\n</div>\n';
    return output_HTML;
}
