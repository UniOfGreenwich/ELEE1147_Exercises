// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item affix "><a href="Introduction/Introduction.html">Introduction</a></li><li class="chapter-item affix "><li class="part-title">Git</li><li class="chapter-item "><a href="myFirstRepository/myFirstRepository.html"><strong aria-hidden="true">1.</strong> My First Repository</a></li><li class="chapter-item "><a href="BashAliases/BashAliases.html"><strong aria-hidden="true">2.</strong> Bash Aliases</a></li><li class="chapter-item affix "><li class="spacer"></li><li class="chapter-item affix "><li class="part-title">C</li><li class="chapter-item "><a href="Learning_C/Learning_C.html"><strong aria-hidden="true">3.</strong> Learning C</a></li><li class="chapter-item "><a href="HeaderFilesGuardsMacros/HeaderFilesGuardsMacros.html"><strong aria-hidden="true">4.</strong> Header Files, Guards, and Macros</a></li><li class="chapter-item "><a href="BitwiseOperations/BitwiseOperations.html"><strong aria-hidden="true">5.</strong> Bitwise Operations</a></li><li class="chapter-item "><a href="ArithmeticOperations/ArithmeticOperations.html"><strong aria-hidden="true">6.</strong> Arithmetic Operations</a></li><li class="chapter-item "><a href="PointersAndAddressing/PointersAndAddressing.html"><strong aria-hidden="true">7.</strong> Pointers and Addressing</a></li><li class="chapter-item "><a href="UnionsAndStructs/UnionsAndStructs.html"><strong aria-hidden="true">8.</strong> Structs and Unions</a></li><li class="chapter-item "><a href="Streams/Streams.html"><strong aria-hidden="true">9.</strong> Streams</a></li><li class="chapter-item affix "><li class="spacer"></li><li class="chapter-item affix "><li class="part-title">Python</li><li class="chapter-item "><a href="Learning_Python/Learning_Python.html"><strong aria-hidden="true">10.</strong> Learning Python</a></li><li class="chapter-item "><a href="Learning_Python/DataStructures.html"><strong aria-hidden="true">11.</strong> Data Structures</a></li><li class="chapter-item "><a href="Learning_Python/Importing_Modules.html"><strong aria-hidden="true">12.</strong> Importing Modules</a></li><li class="chapter-item "><a href="Learning_Python/OOP.html"><strong aria-hidden="true">13.</strong> Object Orientated Programming</a></li><li class="chapter-item affix "><li class="spacer"></li><li class="chapter-item affix "><li class="part-title">Shell</li><li class="chapter-item "><a href="Learning_Shell/Learning_Shell.html"><strong aria-hidden="true">14.</strong> Introduction to Shell Scripting</a></li><li class="chapter-item "><a href="Learning_Shell/Advanced_Shell.html"><strong aria-hidden="true">15.</strong> Advanced Shell Scripting</a></li><li class="chapter-item "><a href="Learning_Shell/ForkBombs.html"><strong aria-hidden="true">16.</strong> Fork Bomb</a></li><li class="chapter-item affix "><li class="spacer"></li><li class="chapter-item affix "><li class="part-title">Concepts</li><li class="chapter-item "><a href="Compilers/compilers.html"><strong aria-hidden="true">17.</strong> Compilers</a></li><li class="chapter-item "><a href="Documentation/Documentation.html"><strong aria-hidden="true">18.</strong> Documentation</a></li><li class="chapter-item "><a href="Debugging/Debugging.html"><strong aria-hidden="true">19.</strong> Debugging</a></li><li class="chapter-item "><a href="VirtualEnvironments/VirtualEnvironments.html"><strong aria-hidden="true">20.</strong> Virtual Environments</a></li><li class="chapter-item "><a href="Algorithms/Algorithms.html"><strong aria-hidden="true">21.</strong> Algorithms</a></li><li class="chapter-item "><div><strong aria-hidden="true">22.</strong> Recursion</div></li><li class="chapter-item affix "><li class="spacer"></li><li class="chapter-item affix "><li class="part-title">Git Extras</li><li class="chapter-item "><a href="BranchingModel/BranchingModel.html"><strong aria-hidden="true">23.</strong> Branching-Strategy</a></li><li class="chapter-item "><a href="OneFlow/OneFlow.html"><strong aria-hidden="true">24.</strong> Git Oneflow</a></li><li class="chapter-item "><a href="AntiPatterns/AntiPatterns.html"><strong aria-hidden="true">25.</strong> Anti Patterns</a></li><li class="chapter-item "><a href="ContinousDeployment/ContinousDeployment.html"><strong aria-hidden="true">26.</strong> Continous Deployment</a></li><li class="chapter-item "><a href="ReleaseDeployment/ReleaseDeployment.html"><strong aria-hidden="true">27.</strong> Release Deployment</a></li><li class="chapter-item "><a href="Migration/Migration.html"><strong aria-hidden="true">28.</strong> Migration</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
