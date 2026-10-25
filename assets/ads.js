/* Centralized Adsterra loader. The four official GET CODE blocks below are unchanged. */
'use strict';
(() => {
  if (window.__backseatAdsterraLoaded) return;
  window.__backseatAdsterraLoaded = true;

  const desktopGetCode = String.raw`<script>
  atOptions = {
    'key' : 'a6e1ba11f7a8dd5dbc47f883f2501ff5',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://bauval.org/22/a6e1ba11f7a8dd5dbc47f883f2501ff5"></script>`;
  const mobileGetCode = String.raw`<script>
  atOptions = {
    'key' : '99943600c04a4d46ee7a5688b14731fe',
    'format' : 'iframe',
    'height' : 50,
    'width' : 320,
    'params' : {}
  };
</script>
<script src="https://bauval.org/22/99943600c04a4d46ee7a5688b14731fe"></script>`;
  const nativeGetCode = String.raw`<script async="async" data-cfasync="false" src="https://bauval.org/21/6c8b74995acbfded7386f1fa703a79d0"></script>
<div id="container-6c8b74995acbfded7386f1fa703a79d0"></div>`;
  const socialBarGetCode = String.raw`<script data-cfasync="false" src="https://bauval.org/14/94f274b97678fe2adf07b731e8e64f4b"></script>`;

  // Only the chosen viewport's original script executes; isolate synchronous
  // document.write used by iframe-style banners in its own same-sized document.
  function loadResponsiveBanner() {
    const host = document.querySelector('[data-adsterra-banner-render]');
    if (!host || host.dataset.adInitialized === '1') return;
    host.dataset.adInitialized = '1';
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const width = isMobile ? 320 : 728;
    const height = isMobile ? 50 : 90;
    const frame = document.createElement('iframe');
    frame.title = 'Advertisement';
    frame.width = String(width);
    frame.height = String(height);
    frame.scrolling = 'no';
    frame.setAttribute('aria-label', 'Advertisement');
    frame.style.width = width + 'px';
    frame.style.height = height + 'px';
    frame.style.border = '0';
    frame.srcdoc = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden}</style></head><body>' + (isMobile ? mobileGetCode : desktopGetCode) + '</body></html>';
    host.appendChild(frame);
  }

  // Make the exact official scripts executable after DOM insertion.
  function appendOfficialMarkup(host, markup) {
    const template = document.createElement('template');
    template.innerHTML = markup;
    for (const element of [...template.content.childNodes]) {
      if (element.nodeType === 1 && element.tagName === 'SCRIPT') {
        const script = document.createElement('script');
        for (const attribute of element.attributes) {
          script.setAttribute(attribute.name, attribute.value);
        }
        host.appendChild(script);
      } else {
        host.appendChild(element.cloneNode(true));
      }
    }
  }

  function loadNativeOnce() {
    const host = document.querySelector('[data-adsterra-native-render]');
    if (!host || host.dataset.adInitialized === '1') return;
    host.dataset.adInitialized = '1';
    appendOfficialMarkup(host, nativeGetCode);
  }

  function loadSocialBarOnce() {
    const src = 'https://bauval.org/14/94f274b97678fe2adf07b731e8e64f4b';
    if (document.querySelector('script[src="' + src + '"]')) return;
    appendOfficialMarkup(document.body, socialBarGetCode);
  }

  try { loadResponsiveBanner(); } catch (error) { console.warn('Banner unavailable', error); }
  try { loadNativeOnce(); } catch (error) { console.warn('Native unavailable', error); }
  try { loadSocialBarOnce(); } catch (error) { console.warn('Social Bar unavailable', error); }
})();
