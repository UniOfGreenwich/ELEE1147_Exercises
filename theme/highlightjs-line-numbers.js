(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        const blocks = document.querySelectorAll('pre > code.hljs');

        for (const code of blocks) {
            const pre = code.parentElement;
            let lines = code.textContent.split(/\r\n|\r|\n/);

            // Remove trailing empty line if present
            if (lines.length > 0 && lines[lines.length - 1].trim() === '') {
                lines.pop();
            }

            // Don't apply line numbers if only one non-empty line
            if (lines.length < 2) continue;

            // Create wrapper and number column
            const wrapper = document.createElement('div');
            wrapper.className = 'hljs-ln-container';

            const numbers = document.createElement('div');
            numbers.className = 'hljs-ln-numbers';
            numbers.innerHTML = lines.map((_, i) => `<div>${i + 1}</div>`).join('');

            // Insert wrapper before pre > code
            const parent = pre.parentNode;
            parent.replaceChild(wrapper, pre);
            wrapper.appendChild(numbers);
            wrapper.appendChild(pre);
        }

        const style = document.createElement('style');
        style.innerHTML = `
            .hljs-ln-container {
                display: flex;
                width: 100%;
                align-items: flex-start;
            }

            .hljs-ln-numbers {
                user-select: none;
                text-align: right;
                margin: 0.7em 0 0 0;
                padding-right: 1em;
                color: #999;
                font-family: monospace;
                font-size: 0.9em;
                line-height: 1.6em;
                flex-shrink: 0;
                padding-top: 0.4em;
            }

            .hljs-ln-numbers div {
                height: 1.555em;
            }

            pre {
                margin: 0;
                flex-grow: 1;
                width: 100%;
                overflow-x: auto;
            }

            pre > code.hljs {
                display: block;
                line-height: 1.6em;
                padding: 0.4em 0.5em 0.4em 0.7em; /* match .hljs-ln-numbers vertical offset */
                margin: 0.7em 0.5em 0.4em 0.7em;
                font-family: monospace;
                white-space: pre;
            }
        `;
        document.head.appendChild(style);
    });
})();
