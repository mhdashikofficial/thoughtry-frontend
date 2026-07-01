import Script from 'next/script';

export default function SubdomainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      
      {/* PopAds Integration */}
      <Script
        id="popads-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
/*<![CDATA[/* */
(function(){var l=window,h="cd3be9023f89c541613019f615c465a5",y=[["siteId",37+618*830+552+4797493],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],r=["d3d3LmJsb2NrYWRzbm90LmNvbS9qdXNlLm1pbi5jc3M=","ZG5oZmk1bm4yZHQ2Ny5jbG91ZGZyb250Lm5ldC9IWGxPL2lzZXF1ZW5jZS1kaWFncmFtLW1pbi5qcw=="],q=-1,o,x,g=function(){clearTimeout(x);q++;if(r[q]&&!(1808806130000<(new Date).getTime()&&1<q)){o=l.document.createElement("script");o.type="text/javascript";o.async=!0;var w=l.document.getElementsByTagName("script")[0];o.src="https://"+atob(r[q]);o.crossOrigin="anonymous";o.onerror=g;o.onload=function(){clearTimeout(x);l[h.slice(0,16)+h.slice(0,16)]||g()};x=setTimeout(g,5E3);w.parentNode.insertBefore(o,w)}};if(!l[h]){try{Object.freeze(l[h]=y)}catch(e){}g()}})();
/*]]>/* */
          `,
        }}
      />
    </>
  );
}
