/*
 *  /MathJax/extensions/MathEvents.js
 *  
 *  Copyright (c) 2009-2013 The MathJax Consortium
 *
 *  Part of the MathJax library.
 *  See http://www.mathjax.org for details.
 * 
 *  Licensed under the Apache License, Version 2.0;
 *  you may not use this file except in compliance with the License.
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 */

(function(d,h,l,g,m,b,j){var q="2.2";var i=MathJax.Extension;var c=i.MathEvents={version:q};var k=d.config.menuSettings;var p={hover:500,frame:{x:3.5,y:5,bwidth:1,bcolor:"#A6D",hwidth:"15px",hcolor:"#83A"},button:{x:-4,y:-3,wx:-2,src:l.fileURL(b.imageDir+"/MenuArrow-15.png")},fadeinInc:0.2,fadeoutInc:0.05,fadeDelay:50,fadeoutStart:400,fadeoutDelay:15*1000,styles:{".MathJax_Hover_Frame":{"border-radius":".25em","-webkit-border-radius":".25em","-moz-border-radius":".25em","-khtml-border-radius":".25em","box-shadow":"0px 0px 15px #83A","-webkit-box-shadow":"0px 0px 15px #83A","-moz-box-shadow":"0px 0px 15px #83A","-khtml-box-shadow":"0px 0px 15px #83A",border:"1px solid #A6D ! important",display:"inline-block",position:"absolute"},".MathJax_Hover_Arrow":{position:"absolute",width:"15px",height:"11px",cursor:"pointer"}}};var n=c.Event={LEFTBUTTON:0,RIGHTBUTTON:2,MENUKEY:"altKey",Mousedown:function(r){return n.Handler(r,"Mousedown",this)},Mouseup:function(r){return n.Handler(r,"Mouseup",this)},Mousemove:function(r){return n.Handler(r,"Mousemove",this)},Mouseover:function(r){return n.Handler(r,"Mouseover",this)},Mouseout:function(r){return n.Handler(r,"Mouseout",this)},Click:function(r){return n.Handler(r,"Click",this)},DblClick:function(r){return n.Handler(r,"DblClick",this)},Menu:function(r){return n.Handler(r,"ContextMenu",this)},Handler:function(u,s,t){if(l.loadingMathMenu){return n.False(u)}var r=b[t.jaxID];if(!u){u=window.event}u.isContextMenu=(s==="ContextMenu");if(r[s]){return r[s](u,t)}if(i.MathZoom){return i.MathZoom.HandleEvent(u,s,t)}},False:function(r){if(!r){r=window.event}if(r){if(r.preventDefault){r.preventDefault()}if(r.stopPropagation){r.stopPropagation()}r.cancelBubble=true;r.returnValue=false}return false},ContextMenu:function(s,A,v){var x=b[A.jaxID],u=x.getJaxFromMath(A);var B=(x.config.showMathMenu!=null?x:d).config.showMathMenu;if(!B||(k.context!=="MathJax"&&!v)){return}if(c.msieEventBug){s=window.event||s}n.ClearSelection();f.ClearHoverTimer();if(u.hover){if(u.hover.remove){clearTimeout(u.hover.remove);delete u.hover.remove}u.hover.nofade=true}var t=MathJax.Menu;var C,z;if(t){if(t.loadingDomain){return n.False(s)}C=m.loadDomain("MathMenu");if(!C){t.jax=u;var r=t.menu.Find("Show Math As").menu;r.items[0].name=u.sourceMenuTitle;r.items[0].format=(u.sourceMenuFormat||"MathML");r.items[1].name=j[u.inputJax].sourceMenuTitle;var w=t.menu.Find("Math Settings","MathPlayer");w.hidden=!(u.outputJax==="NativeMML"&&d.Browser.hasMathPlayer);return t.menu.Post(s)}t.loadingDomain=true;z=function(){delete t.loadingDomain}}else{if(l.loadingMathMenu){return n.False(s)}l.loadingMathMenu=true;C=l.Require("[MathJax]/extensions/MathMenu.js");z=function(){delete l.loadingMathMenu;if(!MathJax.Menu){MathJax.Menu={}}}}var y={pageX:s.pageX,pageY:s.pageY,clientX:s.clientX,clientY:s.clientY};g.Queue(C,z,["ContextMenu",n,y,A,v]);return n.False(s)},AltContextMenu:function(t,s){var u=b[s.jaxID];var r=(u.config.showMathMenu!=null?u:d).config.showMathMenu;if(r){r=(u.config.showMathMenuMSIE!=null?u:d).config.showMathMenuMSIE;if(k.context==="MathJax"&&!k.mpContext&&r){if(!c.noContextMenuBug||t.button!==n.RIGHTBUTTON){return}}else{if(!t[n.MENUKEY]||t.button!==n.LEFTBUTTON){return}}return u.ContextMenu(t,s,true)}},ClearSelection:function(){if(c.safariContextMenuBug){setTimeout("window.getSelection().empty()",0)}if(document.selection){setTimeout("document.selection.empty()",0)}},getBBox:function(t){t.appendChild(c.topImg);var s=c.topImg.offsetTop,u=t.offsetHeight-s,r=t.offsetWidth;t.removeChild(c.topImg);return{w:r,h:s,d:u}}};var f=c.Hover={Mouseover:function(t,s){if(k.discoverable||k.zoom==="Hover"){var v=t.fromElement||t.relatedTarget,u=t.toElement||t.target;if(v&&u&&(v.isMathJax!=u.isMathJax||d.getJaxFor(v)!==d.getJaxFor(u))){var r=this.getJaxFromMath(s);if(r.hover){f.ReHover(r)}else{f.HoverTimer(r,s)}return n.False(t)}}},Mouseout:function(t,s){if(k.discoverable||k.zoom==="Hover"){var v=t.fromElement||t.relatedTarget,u=t.toElement||t.target;if(v&&u&&(v.isMathJax!=u.isMathJax||d.getJaxFor(v)!==d.getJaxFor(u))){var r=this.getJaxFromMath(s);if(r.hover){f.UnHover(r)}else{f.ClearHoverTimer()}return n.False(t)}}},Mousemove:function(t,s){if(k.discoverable||k.zoom==="Hover"){var r=this.getJaxFromMath(s);if(r.hover){return}if(f.lastX==t.clientX&&f.lastY==t.clientY){return}f.lastX=t.clientX;f.lastY=t.clientY;f.HoverTimer(r,s);return n.False(t)}},HoverTimer:function(r,s){this.ClearHoverTimer();this.hoverTimer=setTimeout(g(["Hover",this,r,s]),p.hover)},ClearHoverTimer:function(){if(this.hoverTimer){clearTimeout(this.hoverTimer);delete this.hoverTimer}},Hover:function(r,v){if(i.MathZoom&&i.MathZoom.Hover({},v)){return}var u=b[r.outputJax],w=u.getHoverSpan(r,v),z=u.getHoverBBox(r,w,v),x=(u.config.showMathMenu!=null?u:d).config.showMathMenu;var B=p.frame.x,A=p.frame.y,y=p.frame.bwidth;if(c.msieBorderWidthBug){y=0}r.hover={opacity:0,id:r.inputID+"-Hover"};var s=h.Element("span",{id:r.hover.id,isMathJax:true,style:{display:"inline-block",width:0,height:0,position:"relative"}},[["span",{className:"MathJax_Hover_Frame",isMathJax:true,style:{display:"inline-block",position:"absolute",top:this.Px(-z.h-A-y-(z.y||0)),left:this.Px(-B-y+(z.x||0)),width:this.Px(z.w+2*B),height:this.Px(z.h+z.d+2*A),opacity:0,filter:"alpha(opacity=0)"}}]]);var t=h.Element("span",{isMathJax:true,id:r.hover.id+"Menu",style:{display:"inline-block","z-index":1,width:0,height:0,position:"relative"}},[["img",{className:"MathJax_Hover_Arrow",isMathJax:true,math:v,src:p.button.src,onclick:this.HoverMenu,jax:u.id,style:{left:this.Px(z.w+B+y+(z.x||0)+p.button.x),top:this.Px(-z.h-A-y-(z.y||0)-p.button.y),opacity:0,filter:"alpha(opacity=0)"}}]]);if(z.width){s.style.width=t.style.width=z.width;s.style.marginRight=t.style.marginRight="-"+z.width;s.firstChild.style.width=z.width;t.firstChild.style.left="";t.firstChild.style.right=this.Px(p.button.wx)}w.parentNode.insertBefore(s,w);if(x){w.parentNode.insertBefore(t,w)}if(w.style){w.style.position="relative"}this.ReHover(r)},ReHover:function(r){if(r.hover.remove){clearTimeout(r.hover.remove)}r.hover.remove=setTimeout(g(["UnHover",this,r]),p.fadeoutDelay);this.HoverFadeTimer(r,p.fadeinInc)},UnHover:function(r){if(!r.hover.nofade){this.HoverFadeTimer(r,-p.fadeoutInc,p.fadeoutStart)}},HoverFade:function(r){delete r.hover.timer;r.hover.opacity=Math.max(0,Math.min(1,r.hover.opacity+r.hover.inc));r.hover.opacity=Math.floor(1000*r.hover.opacity)/1000;var t=document.getElementById(r.hover.id),s=document.getElementById(r.hover.id+"Menu");t.firstChild.style.opacity=r.hover.opacity;t.firstChild.style.filter="alpha(opacity="+Math.floor(100*r.hover.opacity)+")";if(s){s.firstChild.style.opacity=r.hover.opacity;s.firstChild.style.filter=t.style.filter}if(r.hover.opacity===1){return}if(r.hover.opacity>0){this.HoverFadeTimer(r,r.hover.inc);return}t.parentNode.removeChild(t);if(s){s.parentNode.removeChild(s)}if(r.hover.remove){clearTimeout(r.hover.remove)}delete r.hover},HoverFadeTimer:function(r,t,s){r.hover.inc=t;if(!r.hover.timer){r.hover.timer=setTimeout(g(["HoverFade",this,r]),(s||p.fadeDelay))}},HoverMenu:function(r){if(!r){r=window.event}return b[this.jax].ContextMenu(r,this.math,true)},ClearHover:function(r){if(r.hover.remove){clearTimeout(r.hover.remove)}if(r.hover.timer){clearTimeout(r.hover.timer)}f.ClearHoverTimer();delete r.hover},Px:function(r){if(Math.abs(r)<0.006){return"0px"}return r.toFixed(2).replace(/\.?0+$/,"")+"px"},getImages:function(){var r=new Image();r.src=p.button.src}};var a=c.Touch={last:0,delay:500,start:function(s){var r=new Date().getTime();var t=(r-a.last<a.delay&&a.up);a.last=r;a.up=false;if(t){a.timeout=setTimeout(a.menu,a.delay,s,this);s.preventDefault()}},end:function(s){var r=new Date().getTime();a.up=(r-a.last<a.delay);if(a.timeout){clearTimeout(a.timeout);delete a.timeout;a.last=0;a.up=false;s.preventDefault();return n.Handler((s.touches[0]||s.touch),"DblClick",this)}},menu:function(s,r){delete a.timeout;a.last=0;a.up=false;return n.Handler((s.touches[0]||s.touch),"ContextMenu",r)}};if(d.Browser.isMobile){var o=p.styles[".MathJax_Hover_Arrow"];o.width="25px";o.height="18px";p.button.x=-6}d.Browser.Select({MSIE:function(r){var t=(document.documentMode||0);var s=r.versionAtLeast("8.0");c.msieBorderWidthBug=(document.compatMode==="BackCompat");c.msieEventBug=r.isIE9;c.msieAlignBug=(!s||t<8);if(t<9){n.LEFTBUTTON=1}},Safari:function(r){c.safariContextMenuBug=true},Opera:function(r){c.operaPositionBug=true},Konqueror:function(r){c.noContextMenuBug=true}});c.topImg=(c.msieAlignBug?h.Element("img",{style:{width:0,height:0,position:"relative"},src:"about:blank"}):h.Element("span",{style:{width:0,height:0,display:"inline-block"}}));if(c.operaPositionBug){c.topImg.style.border="1px solid"}c.config=p=d.CombineConfig("MathEvents",p);var e=function(){var r=p.styles[".MathJax_Hover_Frame"];r.border=p.frame.bwidth+"px solid "+p.frame.bcolor+" ! important";r["box-shadow"]=r["-webkit-box-shadow"]=r["-moz-box-shadow"]=r["-khtml-box-shadow"]="0px 0px "+p.frame.hwidth+" "+p.frame.hcolor};g.Queue(d.Register.StartupHook("End Config",{}),[e],["getImages",f],["Styles",l,p.styles],["Post",d.Startup.signal,"MathEvents Ready"],["loadComplete",l,"[MathJax]/extensions/MathEvents.js"])})(MathJax.Hub,MathJax.HTML,MathJax.Ajax,MathJax.Callback,MathJax.Localization,MathJax.OutputJax,MathJax.InputJax);
