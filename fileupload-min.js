/**
 * File Upload Element
 *
 * @copyright: Copyright (C) 2005-2016  Media A-Team, Inc. - All rights reserved.
 * @license: GNU/GPL http://www.gnu.org/copyleft/gpl.html
*/ define(["jquery","fab/fileelement"],function(t,e){window.FbFileUpload=new Class({Extends:e,options:{folderSelect:!1,ajax_upload:!1},initialize:function(e,i){var a=this;if(this.setPlugin("fileupload"),this.parent(e,i),this.container=t(this.container),this.toppath=this.options.dir,"1"===this.options.folderSelect&&!0===this.options.editable&&this.ajaxFolder(),a.options.ordenacao){var o=Object.values(this.options.files);o&&(o.sort(function(t,e){if(t.params.ordenacao&&e.params.ordenacao)return t.params.ordenacao>e.params.ordenacao||!t.params.ordenacao&&e.params.ordenacao?1:t.params.ordenacao<e.params.ordenacao||t.params.ordenacao&&!e.params.ordenacao?-1:0}),this.options.files=function t(e){for(var i={},a=0;a<e.length;++a)i[a]=e[a];return i}(o),a=this)}this.doBrowseEvent=null,this.watchBrowseButton(),this.options.ajax_upload&&!1!==this.options.editable&&(Fabrik.fireEvent("fabrik.fileupload.plupload.build.start",this),this.watchAjax(),0!==Object.keys(this.options.files).length&&(this.uploader.trigger("FilesAdded",this.options.files),t.each(this.options.files,function(e,i){var o={filepath:i.path,uri:i.url,showWidget:!1},n=t(Fabrik.jLayouts["fabrik-progress-bar-success"])[0],s=t("#"+i.id).find(".bar")[0];a.uploader.trigger("UploadProgress",i),a.uploader.trigger("FileUploaded",i,{response:JSON.stringify(o)}),t(s).replaceWith(n)})),this.redraw()),this.doDeleteEvent=null,this.watchDeleteButton(),this.watchTab()},redraw:function(){var e=t(this.element);if(this.options.ajax_upload){var i=t("#"+e.prop("id")+"_browseButton"),a=t("#"+this.options.element+"_container"),o=i.position().left-a.position().left,n=a.closest(".fabrikElement").find("input[type=file]");if(n.length>0){var s=n.parent();s.css({width:i.width(),height:i.height()}),s.css("top",o)}}},doBrowse:function(e){if(window.File&&window.FileReader&&window.FileList&&window.Blob){var i,a=this,o=e.target.files[0];if(o.type.match("image.*"))(i=new FileReader).onload=(function(e){return function(e){var i=t(a.getContainer()),o=i.find("img");o.attr("src",e.target.result),o.closest(".fabrikHide").removeClass("fabrikHide"),i.find("[data-file]").addClass("fabrikHide")}}).bind(this)(o),i.readAsDataURL(o);else if(o.type.match("video.*")){var n,s=t(this.getContainer()),r=s.find("video");if(r.length>0&&(r=this.makeVideoPreview()).appendTo(s),i=new window.FileReader,(i=window.URL||window.webKitURL)&&i.createObjectURL){n=i.createObjectURL(o),r.attr("src",n);return}if(!window.FileReader){console.log("Sorry, not so much");return}(i=new window.FileReader).onload=function(t){r.attr("src",t.target.result)},i.readAsDataURL(o)}}},watchBrowseButton:function(){var e=t(this.element);this.options.useWIP&&!this.options.ajax_upload&&!1!==this.options.editable&&(e.off("change",this.doBrowseEvent),this.doBrowseEvent=this.doBrowse.bind(this),e.on("change",this.doBrowseEvent))},doDelete:function(e){e.preventDefault();var i=t(this.getContainer()),a=this,o=i.find("[data-file]");if(window.confirm(Joomla.JText._("PLG_ELEMENT_FILEUPLOAD_CONFIRM_SOFT_DELETE"))){var n=o.data("join-pk-val");new t.ajax({url:"",data:{option:"com_fabrik",format:"raw",task:"plugin.pluginAjax",plugin:"fileupload",method:"ajax_clearFileReference",element_id:this.options.id,formid:this.form.id,rowid:this.form.options.rowid,joinPkVal:n}}).done(function(){Fabrik.trigger("fabrik.fileupload.clearfileref.complete",a)}),window.confirm(Joomla.JText._("PLG_ELEMENT_FILEUPLOAD_CONFIRM_HARD_DELETE"))&&(this.makeDeletedImageField(this.groupid,o.data("file")).appendTo(i),Fabrik.fireEvent("fabrik.fileupload.delete.complete",this)),o.remove(),t(this.element).closest(".fabrikElement").find("img").attr("src",""!==this.options.defaultImage?Fabrik.liveSite+this.options.defaultImage:"")}},watchDeleteButton:function(){var e=t(this.getContainer()).find("[data-file]");e.off("click",this.doDeleteEvent),this.doDeleteEvent=this.doDelete.bind(this),e.on("click",this.doDeleteEvent)},getFormElementsKey:function(t){return(this.baseElementId=t,this.options.ajax_upload&&this.options.ajax_max>1)?this.options.listName+"___"+this.options.elementShortName:this.parent(t)},removeCustomEvents:function(){},cloned:function(e){var i=t(this.element);0!==i.closest(".fabrikElement").length&&(i.closest(".fabrikElement").find("img").attr("src",""!==this.options.defaultImage?Fabrik.liveSite+this.options.defaultImage:""),t(this.getContainer()).find("[data-file]").remove(),this.watchBrowseButton(),this.parent(e))},decloned:function(e){t("#form_"+this.form.id).find("input[name=fabrik_deletedimages["+e+"]]").length>0&&this.makeDeletedImageField(e,this.options.value).inject(this.form.form)},decreaseName:function(t){var e=this.getOrigField();return"null"!==typeOf(e)&&(e.name=this._decreaseName(e.name,t),e.id=this._decreaseId(e.id,t)),this.parent(t)},getOrigField:function(){var t=this.element.getParent(".fabrikElement"),e=t.getElement("input[name^="+this.origId+"_orig]");return"null"===typeOf(e)&&(e=t.getElement("input[id^="+this.origId+"_orig]")),e},makeDeletedImageField:function(e,i){return t(document.createElement("input")).attr({type:"hidden",name:"fabrik_fileupload_deletedfile["+e+"][]",value:i})},makeVideoPreview:function(){var e=t(this.element);return t(document.createElement("video")).attr({id:e.prop("id")+"_video_preview",controls:!0})},update:function(e){if(this.element){var i=t(this.element);if(""===e)this.options.ajax_upload?(this.uploader.files=[],i.parent().find("[id$=_dropList] tr").remove()):i.val("");else{var a=i.closest("div.fabrikSubElementContainer").find("img");a&&a.prop("src",e)}}},addDropArea:function(){if(Fabrik.bootstraped){var e,i=this.container.find("tr.plupload_droptext");i.length>0?i.show():(e=t(document.createElementget("tr")).addClass("plupload_droptext").html('<td colspan="4"><i class="icon-move"></i> '+Joomla.JText._("PLG_ELEMENT_FILEUPLOAD_DRAG_FILES_HERE")+" </td>"),this.container.find("tbody").append(e)),this.container.find("thead").hide()}},removeDropArea:function(){this.container.find("tr.plupload_droptext").hide()},watchAjax:function(){if(!1!==this.options.editable){var e=this,a=t(this.element).prop("id"),o=t(this.getElement());if(0!==o.length){var n=o.closest(".fabrikSubElementContainer");this.container=n,!1!==this.options.canvasSupport&&(this.widget=new i(this.options.modalId,{imagedim:{x:200,y:200,w:this.options.winWidth,h:this.options.winHeight},cropdim:{w:this.options.cropwidth,h:this.options.cropheight,x:this.options.winWidth/2,y:this.options.winHeight/2},crop:this.options.crop,modalId:this.options.modalId,quality:this.options.quality})),this.pluploadContainer=n.find(".plupload_container"),this.pluploadFallback=n.find(".plupload_fallback"),this.droplist=n.find(".plupload_filelist");var s="index.php?option=com_fabrik&format=raw&task=plugin.pluginAjax";s+="&plugin=fileupload&"+this.options.ajaxToken+"=1",s+="&method=ajax_upload&element_id="+this.options.elid,this.options.isAdmin&&(s="administrator/"+s);var r={runtimes:this.options.ajax_runtime,browse_button:a+"_browseButton",container:a+"_container",drop_element:a+"_dropList_container",url:s,max_file_size:this.options.max_file_size+"kb",unique_names:!1,flash_swf_url:this.options.ajax_flash_path,silverlight_xap_url:this.options.ajax_silverlight_path,chunk_size:this.options.ajax_chunk_size+"kb",dragdrop:!0,multipart:!0,filters:this.options.filters,page_url:this.options.page_url};this.uploader=new plupload.Uploader(r),this.uploader.bind("Init",function(t,i){e.pluploadFallback.remove(),e.pluploadContainer.removeClass("fabrikHide"),t.features.dragdrop&&t.settings.dragdrop&&e.addDropArea()}),this.uploader.bind("FilesRemoved",function(t,e){}),this.uploader.bind("FilesAdded",function(i,a){e.removeDropArea();var o,n=Fabrik.bootstrapped?"tr":"li";e.lastAddedFiles=a,Fabrik.bootstrapped&&e.container.find("thead").css("display",""),o=e.droplist.find(n).length,t.each(a,function(i,a){if(a.size>1e3*e.options.max_file_size)window.alert(Joomla.JText._("PLG_ELEMENT_FILEUPLOAD_FILE_TOO_LARGE_SHORT"));else if(o>=e.options.ajax_max)window.alert(Joomla.JText._("PLG_ELEMENT_FILEUPLOAD_MAX_UPLOAD_REACHED"));else{if(o++,e.isImage(a)){if(s=e.editImgButton(),e.options.principal&&(r=e.editImgButton()),l=e.editImgButton(),d=e.editImgButton(),e.options.crop?(s.html(e.options.resizeButton),e.options.principal&&r.html(e.options.resizeButton),l.html(e.options.resizeButton),d.html(e.options.resizeButton)):(s.html(e.options.previewButton),e.options.principal&&r.html(e.options.previewButton),l.html(e.options.previewButton),d.html(e.options.previewButton)),h=a.name.indexOf("/")>=0?(h=a.name.split("/"))[h.length-1]:a.name.indexOf("\\")>=0?(h=a.name.split("\\"))[h.length-1]:a.name,e.options.principal){var s,r,l,d,p,h,m,c,u,f=e.options.main_image,g=e.options.elementShortName;r="<input type='radio' name='p_"+g+"' value='"+h+"' class='form-control fabrik-input inputradio'>",f&&f[g]&&f[g].name===h&&(r="<input type='radio' name='p_"+g+"' value='"+h+"' class='form-control fabrik-input inputradio' checked>")}e.options.replace_file_name&&(c=t(document.createElement("img")).attr({name:h,class:e.options.elementShortName+"_thumb"}),l="<input type='text' class='form-control fabrik-input text' style='height: 30px; width: 65%; margin-top: 30px; margin-left: -20px; position: absolute;'>"),e.options.rotate&&(d="<label style='width: 20%; margin-top: 50px; margin-left: 0px; position: relative'>Girar:</label><select class='form-control' style='height: 30px; width: 35%; margin-top: -30px; margin-left: 40px; position: absolute'><option value='default'>Selecione</option><option value='left'>Esquerda</option><option value='right'>Direita</option><option value='inverter'>Inverter</option></select>"),e.options.ordenacao&&(p="<input type='number' class='form-control' style='height: 30px; width: 14%; margin-top: -30px; margin-left: 50%; position: absolute'>"),m=t(document.createElement("span")).text(a.name)}else if(s=t(document.createElement("span")),m=t(document.createElement("a")).attr({href:a.url,target:"_blank"}).text(a.name),e.options.replace_file_name){var v=(h=a.name.indexOf("/")>=0?(h=a.name.split("/"))[h.length-1]:a.name.indexOf("\\")>=0?(h=a.name.split("\\"))[h.length-1]:a.name).split(".");v&&(v=v[v.length-1],h=h.replace(v,"png"),c=t(document.createElement("img")).attr({class:e.options.elementShortName+"_thumb"})),l=t(document.createElement("input")).attr({type:"text",class:"form-control fabrik-input text",style:"height: 30px; width: 55%; margin-top: 35px; margin-left: -10px; position: absolute;"})}u=e.imageCells(a,m,s,r,l,d,p,c),e.droplist.append(t(document.createElement(n)).attr({id:a.id,class:"plupload_delete"}).append(u))}}),setTimeout(function(){i.start()},100)}),this.uploader.bind("UploadProgress",function(e,i){var a=t("#"+i.id);if(a.length>0){if(Fabrik.bootstrapped){var o=a.find(".plupload_file_status .bar");if(o.css("width",i.percent+"%"),100===i.percent){var n=t(Fabrik.jLayouts["fabrik-progress-bar-success"]);o.replaceWith(n)}}else a.find(".plupload_file_status").text(i.percent+"%")}}),this.uploader.bind("Error",function(i,a){e.lastAddedFiles.each(function(i){var o=t("#"+i.id);o.length>0&&(o.remove(),window.alert(a.message)),e.addDropArea()})}),this.uploader.bind("ChunkUploaded",function(t,e,i){"object"==typeof(i=JSON.parse(i.response))&&i.error&&fconsole(i.error.message)}),this.uploader.bind("FileUploaded",function(i,a,o){var n,s,r,l,d,p,h,m,c,u,f,g,v,w,p=t("#"+a.id);if((o=JSON.parse(o.response)).error){window.alert(o.error),p.remove();return}if(0===p.length){fconsole("Filuploaded didnt find: "+a.id);return}(h=p.find(".plupload_resize a")).show(),h.attr({href:o.uri,id:"resizebutton_"+a.id}),h.data("filepath",o.filepath),w=o.uri.indexOf("/")>=0?(w=o.uri.split("/"))[w.length-1]:o.uri.indexOf("\\")>=0?(w=o.uri.split("\\"))[w.length-1]:o.uri,(c=p.find(".plupload_principal input")).show(),c.attr({value:w}),c.data("filepath",o.filepath),(f=p.find(".plupload_thumb img")).show(),f.attr({name:w});var $=w.split(".");if($=$[$.length-1],(u=p.find('.plupload_resize input[type="text"]')).show(),u.attr({name:e.options.fullName+"_caption[]"}),(g=p.find(".plupload_resize select")).show(),g.attr({name:e.options.fullName+"_rotate[]"}),(v=p.find('.plupload_resize input[type="number"]')).show(),v.attr({name:e.options.fullName+"_order[]"}),e.options.files)for(var y=0;e.options.files[y];)(e.options.files[y].name===w||e.options.files[y].name===e.options.original_path_dir+w)&&e.options.files[y].params&&(e.options.files[y].params.caption&&(n=e.options.files[y].params.caption),e.options.files[y].params.ordenacao&&(s=e.options.files[y].params.ordenacao)),y++;if(n)u.attr({value:n});else{var b=a.name;b=(b=b.split("."))[0],u.attr({value:b})}s&&v.attr({value:s}),l=e.options.inRepeatGroup?e.options.elementName.replace(/\[\d*\]/,"["+e.getRepeatNum()+"]"):e.options.elementName,e.widget&&(d=!1!==e.options.show_preview&&!1!==o.showWidget,e.widget.setImage(o.uri,o.filepath,a.params,d)),t(document.createElement("input")).attr({type:"hidden",name:l+"[crop]["+o.filepath+"]",id:"coords_"+a.id,value:JSON.stringify(a.params)}).insertAfter(e.pluploadContainer),t(document.createElement("input")).attr({type:"hidden",name:l+"[cropdata]["+o.filepath+"]",id:"data_"+a.id}).insertAfter(e.pluploadContainer),m=[a.recordid,"0"].pick(),t(document.createElement("input")).attr({type:"hidden",name:l+"[id]["+o.filepath+"]",id:"id_"+a.id,value:m}).insertAfter(e.pluploadContainer);var x=w;if("pdf"===(r=(r=x.split("."))[r.length-1])&&e.options.make_pdf_thumb){var E={option:"com_fabrik",format:"raw",task:"plugin.pluginAjax",plugin:"fileupload",method:"makeThumbnail",element_id:e.options.id,filename:x,original_path_dir:e.options.original_path_dir,path:e.options.path,width_thumb:e.options.width_thumb,height_thumb:e.options.height_thumb};E[e.options.ajaxToken]=1,t.ajax({url:"",data:E,complete(){var i,a,o=document.getElementsByClassName(e.options.elementShortName+"_thumb");t.each(o,(t,o)=>{i=(l=o.getAttribute("name")).replace(".pdf",""),(a=x.replace(".pdf",""))===i&&(o.setAttribute("src",Fabrik.liveSite+e.options.path+"/"+a+".png?"+new Date().getTime()),o.setAttribute("style","width: 150px; height: 80px"))})}}).done(function(t){t=JSON.parse(t),console.log(t)})}if(e.options.replace_file_name){var C=document.getElementsByClassName(e.options.elementShortName+"_thumb");"pdf"!==r&&t.each(C,(t,i)=>{(l=i.getAttribute("name"))===x&&(i.setAttribute("src",Fabrik.liveSite+e.options.path+"/"+l+"?"+new Date().getTime()),i.setAttribute("style","width: 150px; height: 80px"))})}p.removeClass("plupload_file_action").addClass("plupload_done"),e.isSubmitDone()}),this.uploader.init()}}},imageCells:function(e,i,a,o,n,s,r,l){var d,p,h,m,c,u,f=this.deleteImgButton();return Fabrik.bootstrapped?(u=t(document.createElement("td")).addClass(this.options.spanNames[1]+" plupload_resize").append(a),c=Fabrik.jLayouts["fabrik-progress-bar"],p=t(document.createElement("td")).addClass(this.options.spanNames[5]+" plupload_file_status").html(c),this.options.replace_file_name?(d=t(document.createElement("td")).addClass(this.options.spanNames[6]+" plupload_file_name").attr("style","display: none;").append(i),this.options.caption&&n&&u.append(n),this.options.rotate&&s&&u.append(s),this.options.ordenacao&&r&&u.append(r)):d=t(document.createElement("td")).addClass(this.options.spanNames[6]+" plupload_file_name").append(i),o&&(h=t(document.createElement("td")).addClass(this.options.spanNames[1]+" plupload_principal").append(o)),l&&(m=t(document.createElement("td")).addClass(this.options.spanNames[6]+" plupload_thumb").append(l)),[m,d,u,h,p,f]):(d=new Element("div",{class:"plupload_file_name"}).adopt([i,new Element("div",{class:"plupload_resize",style:"display:none"}).adopt(a)]),[d,f,p=new Element("div",{class:"plupload_file_status"}).set("text","0%"),new Element("div",{class:"plupload_file_size"}).set("text",e.size),new Element("div",{class:"plupload_clearer"})])},editImgButton:function(){var e=this;return Fabrik.bootstrapped?t(document.createElement("a")).addClass("editImage").attr({href:"#",alt:Joomla.JText._("PLG_ELEMENT_FILEUPLOAD_RESIZE")}).css({display:"none"}).on("click",function(i){i.preventDefault(),e.pluploadResize(t(this))}):new Element("a",{href:"#",alt:Joomla.JText._("PLG_ELEMENT_FILEUPLOAD_RESIZE"),events:{click:(function(e){e.stop();var i=e.target.getParent();this.pluploadResize(t(i))}).bind(this)}})},deleteImgButton:function(){if(!Fabrik.bootstrapped)return new Element("div",{class:"plupload_file_action"}).adopt(new Element("a",{href:"#",style:"display:block",events:{click:(function(t){this.pluploadRemoveFile(t)}).bind(this)}}));var e=Fabrik.jLayouts["fabrik-icon-delete"],i=this;return t(document.createElement("td")).addClass(this.options.spanNames[1]+" plupload_file_action").append(t(document.createElement("a")).html(e).attr({href:"#"}).on("click",function(t){t.stopPropagation(),i.pluploadRemoveFile(t)}))},isImage:function(t){return void 0!==t.type?"image"===t.type:["jpg","jpeg","png","gif"].contains(t.name.split(".").pop().toLowerCase())},pluploadRemoveFile:function(e){if(e.stopPropagation(),"1"!==this.options.canDelete||window.confirm(Joomla.JText._("PLG_ELEMENT_FILEUPLOAD_CONFIRM_HARD_DELETE"))){var i=t(e.target).closest("tr").prop("id").split("_").pop(),a=t(e.target).closest("tr").find(".plupload_file_name").text(),o=[];this.uploader.files.each(function(t){t.id!==i&&o.push(t)}),this.uploader.files=o;var n=this,s={option:"com_fabrik",format:"raw",task:"plugin.pluginAjax",plugin:"fileupload",method:"ajax_deleteFile",element_id:this.options.id,file:a,recordid:i,repeatCounter:this.options.repeatCounter,canDelete:this.options.canDelete};s[this.options.ajaxToken]=1,t.ajax({url:"",data:s}).done(function(a){""===(a=JSON.parse(a)).error&&(Fabrik.trigger("fabrik.fileupload.delete.complete",n),t(e.target).closest(".plupload_delete").remove(),t("#id_alreadyuploaded_"+n.options.id+"_"+i).remove(),t("#coords_alreadyuploaded_"+n.options.id+"_"+i).remove(),0===t(n.getContainer()).find("table tbody tr.plupload_delete").length&&n.addDropArea())})}},pluploadResize:function(t){this.widget&&this.widget.setImage(t.attr("href"),t.data("filepath"),{},!0)},isSubmitDone:function(){this.allUploaded()&&"function"==typeof this.submitCallBack&&(this.saveWidgetState(),this.submitCallBack(!0),delete this.submitCallBack)},onsubmit:function(t){this.submitCallBack=t,this.allUploaded()?(this.saveWidgetState(),this.parent(t)):this.uploader.start()},saveWidgetState:function(){void 0!==this.widget&&t.each(this.widget.images,function(e,i){var a=t('input[name*="'+(e=e.split("\\").pop())+'"]').filter(function(t,e){return e.name.contains("[crop]")});if((a=a.last()).length>0){var o=i.img;delete i.img,a.val(JSON.stringify(i)),i.img=o}})},allUploaded:function(){var t=!0;return this.uploader&&this.uploader.files.each(function(e){0===e.loaded&&(t=!1)}),t}});var i=new Class({initialize:function(e,i){this.modalId=e,Fabrik.Windows[this.modalId]&&(Fabrik.Windows[this.modalId].options.destroy=!0,Fabrik.Windows[this.modalId].close()),this.imageDefault={rotation:0,scale:100,imagedim:{x:200,y:200,w:400,h:400},cropdim:{x:75,y:25,w:150,h:50}},t.extend(this.imageDefault,i),this.windowopts={id:this.modalId,type:"modal",loadMethod:"html",width:parseInt(this.imageDefault.imagedim.w,10)+40,height:parseInt(this.imageDefault.imagedim.h,10)+170,storeOnClose:!0,createShowOverLay:!1,crop:i.crop,destroy:!1,modalId:i.modalId,quality:i.quality,onClose:(function(){this.storeActiveImageData()}).bind(this),onContentLoaded:function(){this.center()},onOpen:function(){this.center()}},this.windowopts.title=i.crop?Joomla.JText._("PLG_ELEMENT_FILEUPLOAD_CROP_AND_SCALE"):Joomla.JText._("PLG_ELEMENT_FILEUPLOAD_PREVIEW"),this.showWin(),this.canvas=t(this.window).find("canvas")[0],this.images={},this.CANVAS=new FbCanvas({canvasElement:this.canvas,enableMouse:!0,cacheCtxPos:!1}),this.CANVAS.layers.add(new Layer({id:"bg-layer"})),this.CANVAS.layers.add(new Layer({id:"image-layer"})),i.crop&&(this.CANVAS.layers.add(new Layer({id:"overlay-layer"})),this.CANVAS.layers.add(new Layer({id:"crop-layer"})));var a=new CanvasItem({id:"bg",scale:1,events:{onDraw:(function(t){void 0===t&&(t=this.CANVAS.ctx),t.fillStyle="#DFDFDF",t.fillRect(0,0,this.imageDefault.imagedim.w/this.scale,this.imageDefault.imagedim.h/this.scale)}).bind(this)}});this.CANVAS.layers.get("bg-layer").add(a),i.crop&&(this.overlay=new CanvasItem({id:"overlay",events:{onDraw:(function(t){if(void 0===t&&(t=this.CANVAS.ctx),this.withinCrop=!0,this.withinCrop){var e={x:0,y:0},i={x:this.imageDefault.imagedim.w,y:this.imageDefault.imagedim.h};t.fillStyle="rgba(0, 0, 0, 0.3)";var a=this.cropperCanvas;t.fillRect(e.x,e.y,i.x,a.y-a.h/2),t.fillRect(e.x-a.w/2,e.y+a.y-a.h/2,e.x+a.x,a.h),t.fillRect(e.x+a.x+a.w-a.w/2,e.y+a.y-a.h/2,i.x,a.h),t.fillRect(e.x,e.y+(a.y+a.h)-a.h/2,i.x,i.y)}}).bind(this)}}),this.CANVAS.layers.get("overlay-layer").add(this.overlay)),this.imgCanvas=this.makeImgCanvas(),this.CANVAS.layers.get("image-layer").add(this.imgCanvas),this.cropperCanvas=this.makeCropperCanvas(),i.crop&&this.CANVAS.layers.get("crop-layer").add(this.cropperCanvas),this.makeThread(),this.watchZoom(),this.watchRotate(),this.watchClose(),this.win.close()},setImage:function(e,i,a,o){if(o=!!o&&o,this.activeFilePath=i,this.images.hasOwnProperty(i))a=this.images[i],this.img=a.img,this.setInterfaceDimensions(a),o&&this.showWin();else var n=a,s=Asset.image(e,{crossOrigin:"anonymous",onLoad:(function(){var e=this.storeImageDimensions(i,t(s),n);this.img=e.img,this.setInterfaceDimensions(e),this.showWin(),this.storeActiveImageData(i),o||this.win.close()}).bind(this)})},setInterfaceDimensions:function(t){this.scaleSlide&&this.scaleSlide.set(t.scale),this.rotateSlide&&this.rotateSlide.set(t.rotation),this.cropperCanvas&&t.cropdim&&(this.cropperCanvas.x=t.cropdim.x,this.cropperCanvas.y=t.cropdim.y,this.cropperCanvas.w=t.cropdim.w,this.cropperCanvas.h=t.cropdim.h),this.imgCanvas.w=t.mainimagedim.w,this.imgCanvas.h=t.mainimagedim.h,this.imgCanvas.x=void 0!==t.imagedim?t.imagedim.x:0,this.imgCanvas.y=void 0!==t.imagedim?t.imagedim.y:0},storeImageDimensions:function(t,e,i){e.appendTo(document.body).css({display:"none"}),i=i||new CloneObject(this.imageDefault,!0,[]);var a=e[0].getDimensions(!0);return i.imagedim?i.mainimagedim=i.imagedim:i.mainimagedim={},i.mainimagedim.w=a.width,i.mainimagedim.h=a.height,i.img=e[0],this.images[t]=i,i},makeImgCanvas:function(){var t=this;return new CanvasItem({id:"imgtocrop",w:this.imageDefault.imagedim.w,h:this.imageDefault.imagedim.h,x:200,y:200,interactive:!0,rotation:0,scale:1,offset:[0,0],events:{onMousemove:function(t,e){if(this.dragging){var i=this.w*this.scale,a=this.h*this.scale;this.x=t-this.offset[0]+.5*i,this.y=e-this.offset[1]+.5*a}},onDraw:function(e){if(e=t.CANVAS.ctx,void 0!==t.img){widthWindow=t.imageDefault.imagedim.w,scale=(heightWindow=t.imageDefault.imagedim.h)/this.h,widthWindow>heightWindow?scale=widthWindow/this.w:widthWindow==heightWindow&&this.w>this.h&&(scale=widthWindow/this.w);var i=this.w*scale,a=this.h*scale,o=this.x-.5*i,n=this.y-.5*a,s=widthWindow/2-i/2,r=heightWindow/2-a/2;if(e.save(),e.rotate(this.rotation*Math.PI/180),this.hover?e.strokeStyle="#f00":e.strokeStyle="#000",e.strokeRect(s,r,i,a),void 0!==t.img)try{e.drawImage(t.img,s,r,i,a)}catch(l){}e.restore(),void 0!==t.img&&t.images.hasOwnProperty(t.activeFilePath)&&(t.images[t.activeFilePath].imagedim={x:this.x,y:this.y,w:i,h:a}),this.setDims(o,n,i,a)}},onMousedown:function(e,i){t.CANVAS.setDrag(this),this.offset=[e-this.dims[0],i-this.dims[1]],this.dragging=!0},onMouseup:function(){t.CANVAS.clearDrag(),this.dragging=!1},onMouseover:function(){t.overImg=!0,document.body.style.cursor="move"},onMouseout:function(){t.overImg=!1,t.overCrop||(document.body.style.cursor="default")}}})},makeCropperCanvas:function(){var t=this;return new CanvasItem({id:"item",x:175,y:175,w:150,h:50,interactive:!0,offset:[0,0],events:{onDraw:function(e){if(void 0!==(e=t.CANVAS.ctx)){var i=this.w,a=this.h,o=this.x-.5*i,n=this.y-.5*a;e.save(),e.translate(this.x,this.y),this.hover?e.strokeStyle="#f00":e.strokeStyle="#000",e.strokeRect(-.5*i,-.5*a,i,a),e.restore(),void 0!==t.img&&t.images.hasOwnProperty(t.activeFilePath)&&(t.images[t.activeFilePath].cropdim={x:this.x,y:this.y,w:i,h:a}),this.setDims(o,n,i,a)}},onMousedown:function(e,i){t.CANVAS.setDrag(this),this.offset=[e-this.dims[0],i-this.dims[1]],this.dragging=!0,t.overlay.withinCrop=!0},onMousemove:function(t,e){if(document.body.style.cursor="move",this.dragging){var i=this.w,a=this.h;this.x=t-this.offset[0]+.5*i,this.y=e-this.offset[1]+.5*a}},onMouseup:function(){t.CANVAS.clearDrag(),this.dragging=!1,t.overlay.withinCrop=!1},onMouseover:function(){this.hover=!0,t.overCrop=!0},onMouseout:function(){t.overImg||(document.body.style.cursor="default"),t.overCrop=!1,this.hover=!1}}})},makeThread:function(){var t=this;this.CANVAS.addThread(new Thread({id:"myThread",onExec:function(){void 0!==t.CANVAS&&void 0!==t.CANVAS.ctxEl&&t.CANVAS.clear().draw()}}))},watchClose:function(){var t=this;this.window.find("input[name=close-crop]").on("click",function(e){t.storeActiveImageData(),t.win.close()})},storeActiveImageData:function(e){if(void 0!==(e=e||this.activeFilePath)){var i=this.cropperCanvas.x,a=this.cropperCanvas.y,o=this.cropperCanvas.w-2,n=this.cropperCanvas.h-2;i-=o/2,a-=n/2;var s=t("#"+this.windowopts.id);if(0===s.length){fconsole("storeActiveImageData no window found for "+this.windowopts.id);return}var r=s.find("canvas"),l=t(document.createElement("canvas")).attr({width:o+"px",height:n+"px"}).appendTo(document.body),d=l[0].getContext("2d"),p=t('input[name*="'+e.split("\\").pop()+'"]').filter(function(t,e){return e.name.contains("cropdata")});d.drawImage(r[0],i,a,o,n,0,0,o,n),p.val(l[0].toDataURL({quality:this.windowopts.quality})),l.remove()}},watchZoom:function(){var e=this;if(this.windowopts.crop){var i=this.window.find("input[name=zoom-val]");this.scaleSlide=new Slider(this.window.find(".fabrikslider-line")[0],this.window.find(".knob")[0],{range:[20,300],onChange:function(t){if(e.imgCanvas.scale=t/100,void 0!==e.img)try{e.images[e.activeFilePath].scale=t}catch(a){fconsole("didnt get active file path:"+e.activeFilePath)}i.val(t)}}).set(100),i.on("change",function(i){e.scaleSlide.set(t(this).val())})}},watchRotate:function(){if(this.windowopts.crop){var e=this,i=this.window.find(".rotate"),a=this.window.find("input[name=rotate-val]");this.rotateSlide=new Slider(i.find(".fabrikslider-line")[0],i.find(".knob")[0],{onChange:function(t){if(e.imgCanvas.rotation=t,void 0!==e.img)try{e.images[e.activeFilePath].rotation=t}catch(i){fconsole("rorate err"+e.activeFilePath)}a.val(t)},steps:360}).set(0),a.on("change",function(){e.rotateSlide.set(t(this).val())})}},showWin:function(){this.win=Fabrik.getWindow(this.windowopts),this.window=t("#"+this.modalId),void 0!==this.CANVAS&&(void 0!==this.CANVAS.ctxEl&&(this.CANVAS.ctxPos=document.id(this.CANVAS.ctxEl).getPosition()),void 0!==this.CANVAS.threads&&void 0!==this.CANVAS.threads.get("myThread")&&this.CANVAS.threads.get("myThread").start(),this.win.drawWindow(),this.win.center())}});return window.FbFileUpload});