// ------------------------------
// Type Definitions
// ------------------------------
type PageInfo = { id?: string };
type SiteTag = {
  name: string;
  content: string;
  pages?: string[];
  position?: 'head' | 'body_start' | 'body_end';
  loadOnce?: boolean;
};
type SiteEmbededTag = { tag: SiteTag; embeddedNodes: Node[] };

// ------------------------------
// Event System
// ------------------------------
const isIE = !!document.documentMode;

const eventNames = {
  TAG_MANAGER_LOADED: 'TagManagerLoaded',
  TAGS_LOADING: 'TagsLoading',
  TAG_LOADED: 'TagLoaded',
  TAG_LOAD_ERROR: 'TagLoadError',
};

function publishEvent(eventName: string, target: Node, detail: any) {
  let customEvent: any;
  if (isIE) {
    customEvent = document.createEvent('CustomEvent');
    customEvent.initCustomEvent(eventName, true, true, detail);
  } else {
    customEvent = new CustomEvent(eventName, { detail });
  }
  if (target && target.dispatchEvent) {
    setTimeout(() => target.dispatchEvent(customEvent), 0);
  }
}

// ------------------------------
// Node Parsing & Rendering
// ------------------------------
function parseEmbedData(content: string): Node[] {
  const container = document.createElement('div');
  container.innerHTML = content;
  return Array.from(container.childNodes);
}

function renderNode(node: Node, callbacks: { onload?: Function; onerror?: Function }): Node {
  if (node.nodeName === 'SCRIPT') {
    const script = document.createElement('script');
    const src = (node as HTMLScriptElement).src;
    if (src) script.src = src;
    else script.textContent = node.textContent;
    script.onload = () => callbacks.onload?.();
    script.onerror = () => callbacks.onerror?.();
    return script;
  } else if (node.nodeName === 'STYLE') {
    const style = document.createElement('style');
    style.textContent = node.textContent;
    return style;
  } else {
    const clone = node.cloneNode(true);
    return clone;
  }
}

// ------------------------------
// Tag Management
// ------------------------------
const embedTags: SiteEmbededTag[] = [];
const loadingTags: SiteTag[] = [];
const loadedTags: SiteTag[] = [];
const errorTags: SiteTag[] = [];

function addTagEmbeds(tags: SiteTag[]) {
  tags.forEach(tag => embedTags.push({ tag, embeddedNodes: [] }));
}

function getSiteEmbedTags(): SiteEmbededTag[] {
  return embedTags;
}

// ------------------------------
// Page Filtering
// ------------------------------
function isTagValidForPage(tag: SiteEmbededTag, page: PageInfo): boolean {
  return !page.id || !tag.tag.pages?.length || tag.tag.pages.includes(page.id);
}

function filterTagsByPageID(tags: SiteEmbededTag[], page: PageInfo): SiteEmbededTag[] {
  return tags.filter(tag => isTagValidForPage(tag, page));
}

// ------------------------------
// Apply Embeds
// ------------------------------
function applySiteEmbeds(tags: SiteEmbededTag[], page: PageInfo) {
  const tagsToEmbed = filterTagsByPageID(tags, page);

  tagsToEmbed.forEach(siteTag => {
    const nodes = parseEmbedData(siteTag.tag.content);
    const parentNode = siteTag.tag.position === 'head' ? document.head : document.body;

    const embeddedNodes: Node[] = [];
    nodes.forEach(node => {
      const rendered = renderNode(node, {
        onload: () => {
          loadedTags.push(siteTag.tag);
          publishEvent(eventNames.TAG_LOADED, window, siteTag.tag);
        },
        onerror: () => {
          errorTags.push(siteTag.tag);
          publishEvent(eventNames.TAG_LOAD_ERROR, window, siteTag.tag);
        }
      });
      embeddedNodes.push(rendered);
      parentNode.appendChild(rendered);
    });

    siteTag.embeddedNodes = embeddedNodes;
    loadingTags.push(siteTag.tag);
  });

  publishEvent(eventNames.TAGS_LOADING, window, tagsToEmbed.map(t => t.tag));
}

// ------------------------------
// Demo Usage
// ------------------------------
const demoTags: SiteTag[] = [
  { name: 'demo-script', content: 'console.log("Script loaded dynamically")', position: 'body_end' },
  { name: 'demo-style', content: '<style>body{background:#e0f7fa;}</style>', position: 'head' },
];

addTagEmbeds(demoTags);
applySiteEmbeds(getSiteEmbedTags(), { id: '' });
