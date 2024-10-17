/**
 * File Upload Element
 *
 * @copyright: Copyright (C) 2005-2016  Media A-Team, Inc. - All rights reserved.
 * @license: GNU/GPL http://www.gnu.org/copyleft/gpl.html
 */
define(["jquery","fab/fileelement"],(function(e,t){window.FbFileUpload=new Class({Extends:t,options:{folderSelect:!1,ajax_upload:!1,ajax_show_widget:!0,isCarousel:!1},initialize:function(t,i){var a=this;this.setPlugin("fileupload"),this.parent(t,i),this.container=e(this.container),this.toppath=this.options.dir,"1"===this.options.folderSelect&&!0===this.options.editable&&this.ajaxFolder(),this.doBrowseEvent=null,this.watchBrowseButton(),this.options.ajax_upload&&!1!==this.options.editable&&(Fabrik.fireEvent("fabrik.fileupload.plupload.build.start",this),this.watchAjax(),0!==Object.keys(this.options.files).length&&(this.uploader.trigger("FilesAdded",this.options.files),e.each(this.options.files,(function(t,i){var o={filepath:i.path,uri:i.url,showWidget:!1},s=e(Fabrik.jLayouts["fabrik-progress-bar-success"])[0],n=e("#"+i.id).find(".bar")[0];a.uploader.trigger("UploadProgress",i),a.uploader.trigger("FileUploaded",i,{response:JSON.stringify(o)}),e(n).replaceWith(s)}))),this.redraw()),this.doDeleteEvent=null,this.watchDeleteButton(),this.watchTab(),this.options.isCarousel&&(e(".slickCarousel").slick(),e(".slickCarouselImage").css("opacity","1")),this.options.isZoom&&(e(".slick-active").find("img").ezPlus({zoomType:"lens",lensShape:"round",lensSize:200}),e(".slickCarousel").on("beforeChange",(function(t,i,a,o){e(".zoomWindowContainer,.zoomContainer").remove()})),e(".slickCarousel").on("afterChange",(function(t,i,a){e(".slick-active").find("img").ezPlus({zoomType:"lens",lensShape:"round",lensSize:200})})))},redraw:function(){var t=e(this.element);if(this.options.editable&&this.options.ajax_upload){var i=e("#"+t.prop("id")+"_browseButton"),a=e("#"+this.options.element+"_container"),o=i.position().left-a.position().left,s=a.closest(".fabrikElement").find("input[type=file]");if(s.length>0){var n=s.parent();n.css({width:i.width(),height:i.height()}),n.css("top",o)}}this.options.isCarousel&&e(".slickCarousel").slick("resize")},doBrowse:function(t){if(window.File&&window.FileReader&&window.FileList&&window.Blob){var i,a=this,o=t.target.files[0];if(o.type.match("image.*"))(i=new FileReader).onload=function(t){return function(t){var i=e(a.getContainer()),o=i.find("img");o.attr("src",t.target.result),o.closest(".fabrikHide").removeClass("fabrikHide"),i.find("[data-file]").addClass("fabrikHide")}}.bind(this)(o),i.readAsDataURL(o);else if(o.type.match("video.*")){var s,n=e(this.getContainer()),r=n.find("video");if(r.length>0&&(r=this.makeVideoPreview()).appendTo(n),i=new window.FileReader,(i=window.URL||window.webKitURL)&&i.createObjectURL)return s=i.createObjectURL(o),void r.attr("src",s);if(!window.FileReader)return void console.log("Sorry, not so much");(i=new window.FileReader).onload=function(e){r.attr("src",e.target.result)},i.readAsDataURL(o)}}},watchBrowseButton:function(){var t=e(this.element);this.options.useWIP&&!this.options.ajax_upload&&!1!==this.options.editable&&(t.off("change",this.doBrowseEvent),this.doBrowseEvent=this.doBrowse.bind(this),t.on("change",this.doBrowseEvent))},doDelete:function(t){t.preventDefault();var i=e(this.getContainer()),a=this,o=i.find("[data-file]");if(window.confirm(Joomla.JText._("PLG_ELEMENT_FILEUPLOAD_CONFIRM_SOFT_DELETE"))){var s=o.data("join-pk-val");new e.ajax({url:"",data:{option:"com_fabrik",format:"raw",task:"plugin.pluginAjax",plugin:"fileupload",method:"ajax_clearFileReference",element_id:this.options.id,formid:this.form.id,rowid:this.form.options.rowid,joinPkVal:s}}).done((function(){Fabrik.trigger("fabrik.fileupload.clearfileref.complete",a)})),window.confirm(Joomla.JText._("PLG_ELEMENT_FILEUPLOAD_CONFIRM_HARD_DELETE"))&&(this.makeDeletedImageField(this.groupid,o.data("file")).appendTo(i),Fabrik.fireEvent("fabrik.fileupload.delete.complete",this)),o.remove(),e(this.element).closest(".fabrikElement").find("img").attr("src",""!==this.options.defaultImage?Fabrik.liveSite+this.options.defaultImage:"")}},watchDeleteButton:function(){var t=e(this.getContainer()).find("[data-file]");t.off("click",this.doDeleteEvent),this.doDeleteEvent=this.doDelete.bind(this),t.on("click",this.doDeleteEvent)},getFormElementsKey:function(e){return this.baseElementId=e,!this.options.inRepeatGroup&&this.options.ajax_upload&&this.options.ajax_max>1?this.options.listName+"___"+this.options.elementShortName:this.parent(e)},removeCustomEvents:function(){},cloned:function(t){if(this.options.ajax_upload)e(this.getContainer()).find(".plupload_container").prop("id",this.element.id+"_container"),e(this.getContainer()).find(".plupload").prop("id",this.element.id+"_dropList_container"),e(this.getContainer()).find(".plupload_filelist").prop("id",this.element.id+"_dropList"),e(this.getContainer()).find(".plupload_browsebutton").prop("id",this.element.id+"_browseButton"),e(this.getContainer()).find("input").remove(),this.watchAjax();else{var i=e(this.element);if(0===i.closest(".fabrikElement").length)return;i.closest(".fabrikElement").find("img").attr("src",""!==this.options.defaultImage?Fabrik.liveSite+this.options.defaultImage:""),e(this.getContainer()).find("[data-file]").remove(),this.watchBrowseButton()}this.parent(t)},decloned:function(t){e("#form_"+this.form.id).find('input[name="fabrik_deletedimages['+t+']"]').length>0&&this.makeDeletedImageField(t,this.options.value).inject(this.form.form),this.parent(t)},decreaseName:function(e){var t=this.getOrigField();return"null"!==typeOf(t)&&(t.name=this._decreaseName(t.name,e),t.id=this._decreaseId(t.id,e)),this.parent(e)},getOrigField:function(){var e=this.element.getParent(".fabrikElement"),t=e.getElement("input[name^="+this.origId+"_orig]");return"null"===typeOf(t)&&(t=e.getElement("input[id^="+this.origId+"_orig]")),t},makeDeletedImageField:function(t,i){return e(document.createElement("input")).attr({type:"hidden",name:"fabrik_fileupload_deletedfile["+t+"][]",value:i})},makeVideoPreview:function(){var t=e(this.element);return e(document.createElement("video")).attr({id:t.prop("id")+"_video_preview",controls:!0})},update:function(t){if(this.element){var i=e(this.element);if(""===t)this.options.ajax_upload?(this.uploader.files=[],i.parent().find("[id$=_dropList] tr").remove()):i.val("");else{var a=i.closest("div.fabrikSubElementContainer").find("img");a&&a.prop("src",t)}}},addDropArea:function(){if(Fabrik.bootstraped){var t,i=this.container.find("tr.plupload_droptext");i.length>0?i.show():(t=e(document.createElementget("tr")).addClass("plupload_droptext").html('<td colspan="4"><i class="icon-move"></i> '+Joomla.JText._("PLG_ELEMENT_FILEUPLOAD_DRAG_FILES_HERE")+" </td>"),this.container.find("tbody").append(t)),this.container.find("thead").hide()}},removeDropArea:function(){this.container.find("tr.plupload_droptext").hide()},watchAjax:function(){if(!1!==this.options.editable){var t=this,a=e(this.element).prop("id"),o=e(this.getElement());if(0!==o.length){var s=o.closest(".fabrikSubElementContainer");this.container=s,this.options.ajax_show_widget&&!1!==this.options.canvasSupport&&(this.widget=new i(this.options.modalId,{imagedim:{x:200,y:200,w:this.options.winWidth,h:this.options.winHeight},cropdim:{w:this.options.cropwidth,h:this.options.cropheight,x:this.options.winWidth/2,y:this.options.winHeight/2},crop:this.options.crop,modalId:this.options.modalId,quality:this.options.quality})),this.pluploadContainer=s.find(".plupload_container"),this.pluploadFallback=s.find(".plupload_fallback"),this.droplist=s.find(".plupload_filelist");var n="index.php?option=com_fabrik&format=raw&task=plugin.pluginAjax";n+="&plugin=fileupload&"+this.options.ajaxToken+"=1",n+="&method=ajax_upload&element_id="+this.options.elid,this.options.isAdmin&&(n="administrator/"+n);var r={runtimes:this.options.ajax_runtime,browse_button:a+"_browseButton",container:a+"_container",drop_element:a+"_dropList_container",url:n,max_file_size:this.options.max_file_size+"kb",unique_names:!1,flash_swf_url:this.options.ajax_flash_path,silverlight_xap_url:this.options.ajax_silverlight_path,chunk_size:this.options.ajax_chunk_size+"kb",dragdrop:!0,multipart:!0,filters:this.options.filters,page_url:this.options.page_url};this.uploader=new plupload.Uploader(r),this.uploader.bind("Init",(function(e,i){t.pluploadFallback.remove(),t.pluploadContainer.removeClass("fabrikHide"),e.features.dragdrop&&e.settings.dragdrop&&t.addDropArea()})),this.uploader.bind("FilesRemoved",(function(e,t){})),this.uploader.bind("FilesAdded",(function(i,a){t.removeDropArea();var o,s=Fabrik.bootstrapped?"tr":"li";t.lastAddedFiles=a,Fabrik.bootstrapped&&t.container.find("thead").css("display",""),o=t.droplist.find(s).length,e.each(a,(function(i,a){var n,r,d;a.size>1e3*t.options.max_file_size?window.alert(Joomla.JText._("PLG_ELEMENT_FILEUPLOAD_FILE_TOO_LARGE_SHORT")):o>=t.options.ajax_max?window.alert(Joomla.JText._("PLG_ELEMENT_FILEUPLOAD_MAX_UPLOAD_REACHED")):(o++,t.isImage(a)?(n=t.editImgButton(),t.options.crop?n.html(t.options.resizeButton):n.html(t.options.previewButton),r=e(document.createElement("span")).text(a.name)):(n=e(document.createElement("span")),r=e(document.createElement("a")).attr({href:a.url,target:"_blank"}).text(a.name)),d=t.imageCells(a,r,n),t.droplist.append(e(document.createElement(s)).attr({id:a.id,class:"plupload_delete"}).append(d)))})),setTimeout((function(){i.start()}),100)})),this.uploader.bind("UploadProgress",(function(t,i){var a=e("#"+i.id);if(a.length>0)if(Fabrik.bootstrapped){var o=a.find(".plupload_file_status .bar");if(o.css("width",i.percent+"%"),100===i.percent){var s=e(Fabrik.jLayouts["fabrik-progress-bar-success"]);o.replaceWith(s)}}else a.find(".plupload_file_status").text(i.percent+"%")})),this.uploader.bind("Error",(function(i,a){t.lastAddedFiles.each((function(i){var o=e("#"+i.id);o.length>0&&(o.remove(),window.alert(a.message)),t.addDropArea()}))})),this.uploader.bind("ChunkUploaded",(function(e,t,i){"object"==typeof(i=JSON.parse(i.response))&&i.error&&fconsole(i.error.message)})),this.uploader.bind("FileUploaded",(function(i,a,o){var s,n,r,d,l=e("#"+a.id);if((o=JSON.parse(o.response)).error)return window.alert(o.error),void l.remove();0!==l.length?((r=l.find(".plupload_resize a")).show(),r.attr({href:o.uri,id:"resizebutton_"+a.id}),r.data("filepath",o.filepath),t.widget&&(n=!1!==o.showWidget,t.widget.setImage(o.uri,o.filepath,a.params,n)),s=t.options.inRepeatGroup?t.options.elementName.replace(/\[\d*\]/,"["+t.getRepeatNum()+"]"):t.options.elementName,e(document.createElement("input")).attr({type:"hidden",name:s+"[crop]["+o.filepath+"]",id:"coords_"+a.id,value:JSON.stringify(a.params)}).insertAfter(t.pluploadContainer),e(document.createElement("input")).attr({type:"hidden",name:s+"[cropdata]["+o.filepath+"]",id:"data_"+a.id}).insertAfter(t.pluploadContainer),d=[a.recordid,"0"].pick(),e(document.createElement("input")).attr({type:"hidden",name:s+"[id]["+o.filepath+"]",id:"id_"+a.id,value:d}).insertAfter(t.pluploadContainer),l.removeClass("plupload_file_action").addClass("plupload_done"),t.isSubmitDone()):fconsole("Filuploaded didnt find: "+a.id)})),this.uploader.init()}}},imageCells:function(t,i,a){var o,s,n,r=this.deleteImgButton();return Fabrik.bootstrapped?(n=e(document.createElement("td")).addClass(this.options.spanNames[1]+" plupload_resize").append(a),s=Fabrik.jLayouts["fabrik-progress-bar"],o=e(document.createElement("td")).addClass(this.options.spanNames[5]+" plupload_file_status").html(s),[e(document.createElement("td")).addClass(this.options.spanNames[6]+" plupload_file_name").append(i),n,o,r]):[new Element("div",{class:"plupload_file_name"}).adopt([i,new Element("div",{class:"plupload_resize",style:"display:none"}).adopt(a)]),r,o=new Element("div",{class:"plupload_file_status"}).set("text","0%"),new Element("div",{class:"plupload_file_size"}).set("text",t.size),new Element("div",{class:"plupload_clearer"})]},editImgButton:function(){var t=this;return Fabrik.bootstrapped?e(document.createElement("a")).addClass("editImage").attr({href:"#",alt:Joomla.JText._("PLG_ELEMENT_FILEUPLOAD_RESIZE")}).css({display:"none"}).on("click",(function(i){i.preventDefault(),t.pluploadResize(e(this))})):new Element("a",{href:"#",alt:Joomla.JText._("PLG_ELEMENT_FILEUPLOAD_RESIZE"),events:{click:function(t){t.stop();var i=t.target.getParent();this.pluploadResize(e(i))}.bind(this)}})},deleteImgButton:function(){},isImage:function(e){if(void 0!==e.type)return"image"===e.type;var t=e.name.split(".").pop().toLowerCase();return["jpg","jpeg","png","gif"].contains(t)},pluploadRemoveFile:function(t){if(t.stopPropagation(),window.confirm(Joomla.JText._("PLG_ELEMENT_FILEUPLOAD_CONFIRM_HARD_DELETE"))){var i=e(t.target).closest("tr").prop("id").split("_").pop(),a=e(t.target).closest("tr").find(".plupload_file_name").text(),o=[];this.uploader.files.each((function(e){e.id!==i&&o.push(e)})),this.uploader.files=o;var s=this,n={option:"com_fabrik",format:"raw",task:"plugin.pluginAjax",plugin:"fileupload",method:"ajax_deleteFile",element_id:this.options.id,file:a,recordid:i,repeatCounter:this.options.repeatCounter};n[this.options.ajaxToken]=1,e.ajax({url:"",data:n}).done((function(a){""===(a=JSON.parse(a)).error&&(Fabrik.trigger("fabrik.fileupload.delete.complete",s),e(t.target).closest(".plupload_delete").remove(),e("#id_alreadyuploaded_"+s.options.id+"_"+i).remove(),e("#coords_alreadyuploaded_"+s.options.id+"_"+i).remove(),e("#data_alreadyuploaded_"+s.options.id+"_"+i).remove(),e("#id_"+i).remove(),e("#coords_"+i).remove(),e("#data_"+i).remove(),0===e(s.getContainer()).find("table tbody tr.plupload_delete").length&&s.addDropArea())}))}},pluploadResize:function(e){this.widget&&this.widget.setImage(e.attr("href"),e.data("filepath"),{},!0)},isSubmitDone:function(){this.allUploaded()&&"function"==typeof this.submitCallBack&&(this.saveWidgetState(),this.submitCallBack(!0),delete this.submitCallBack)},onsubmit:function(e){this.submitCallBack=e,this.allUploaded()?(this.saveWidgetState(),this.parent(e)):this.uploader.start()},saveWidgetState:function(){void 0!==this.widget&&e.each(this.widget.images,(function(t,i){t=t.split("\\").pop();var a=e('input[name*="'+t+'"]').filter((function(e,t){return t.name.contains("[crop]")}));if((a=a.last()).length>0){var o=i.img;delete i.img,a.val(JSON.stringify(i)),i.img=o}}))},allUploaded:function(){var e=!0;return this.uploader&&this.uploader.files.each((function(t){0===t.loaded&&(e=!1)})),e}});var i=new Class({initialize:function(t,i){this.modalId=t,Fabrik.Windows[this.modalId]&&(Fabrik.Windows[this.modalId].options.destroy=!0,Fabrik.Windows[this.modalId].close()),this.imageDefault={rotation:0,scale:100,imagedim:{x:200,y:200,w:400,h:400},cropdim:{x:75,y:25,w:150,h:50}},e.extend(this.imageDefault,i),this.windowopts={id:this.modalId,type:"modal",loadMethod:"html",width:parseInt(this.imageDefault.imagedim.w,10)+40,height:parseInt(this.imageDefault.imagedim.h,10)+170,storeOnClose:!0,createShowOverLay:!1,crop:i.crop,destroy:!1,modalId:i.modalId,quality:i.quality,onClose:function(){this.storeActiveImageData()}.bind(this),onContentLoaded:function(){this.center()},onOpen:function(){this.center()}},this.windowopts.title=i.crop?Joomla.JText._("PLG_ELEMENT_FILEUPLOAD_CROP_AND_SCALE"):Joomla.JText._("PLG_ELEMENT_FILEUPLOAD_PREVIEW"),this.showWin(),this.canvas=e(this.window).find("canvas")[0],this.images={},this.CANVAS=new FbCanvas({canvasElement:this.canvas,enableMouse:!0,cacheCtxPos:!1}),this.CANVAS.layers.add(new Layer({id:"bg-layer"})),this.CANVAS.layers.add(new Layer({id:"image-layer"})),i.crop&&(this.CANVAS.layers.add(new Layer({id:"overlay-layer"})),this.CANVAS.layers.add(new Layer({id:"crop-layer"})));var a=new CanvasItem({id:"bg",scale:1,events:{onDraw:function(e){void 0===e&&(e=this.CANVAS.ctx),e.fillStyle="#DFDFDF",e.fillRect(0,0,this.imageDefault.imagedim.w/this.scale,this.imageDefault.imagedim.h/this.scale)}.bind(this)}});this.CANVAS.layers.get("bg-layer").add(a),i.crop&&(this.overlay=new CanvasItem({id:"overlay",events:{onDraw:function(e){if(void 0===e&&(e=this.CANVAS.ctx),this.overlay.withinCrop){var t={x:0,y:0},i={x:this.imageDefault.imagedim.w,y:this.imageDefault.imagedim.h};e.fillStyle="rgba(0, 0, 0, 0.3)";var a=this.cropperCanvas;e.fillRect(t.x,t.y,i.x,a.y-a.h/2),e.fillRect(t.x-a.w/2,t.y+a.y-a.h/2,t.x+a.x,a.h),e.fillRect(t.x+a.x+a.w-a.w/2,t.y+a.y-a.h/2,i.x,a.h),e.fillRect(t.x,t.y+(a.y+a.h)-a.h/2,i.x,i.y)}}.bind(this)}}),this.CANVAS.layers.get("overlay-layer").add(this.overlay)),this.imgCanvas=this.makeImgCanvas(),this.CANVAS.layers.get("image-layer").add(this.imgCanvas),this.cropperCanvas=this.makeCropperCanvas(),i.crop&&this.CANVAS.layers.get("crop-layer").add(this.cropperCanvas),this.makeThread(),this.watchZoom(),this.watchRotate(),this.watchClose(),this.win.close()},setImage:function(t,i,a,o){if(o=o||!1,this.activeFilePath=i,this.images.hasOwnProperty(i))a=this.images[i],this.img=a.img,this.setInterfaceDimensions(a),o&&this.showWin();else var s=a,n=Asset.image(t,{crossOrigin:"anonymous",onLoad:function(){var t=this.storeImageDimensions(i,e(n),s);this.img=t.img,this.setInterfaceDimensions(t),this.showWin(),this.storeActiveImageData(i),o||this.win.close()}.bind(this)})},setInterfaceDimensions:function(e){this.scaleSlide&&this.scaleSlide.set(e.scale),this.rotateSlide&&this.rotateSlide.set(e.rotation),this.cropperCanvas&&e.cropdim&&(this.cropperCanvas.x=e.cropdim.x,this.cropperCanvas.y=e.cropdim.y,this.cropperCanvas.w=e.cropdim.w,this.cropperCanvas.h=e.cropdim.h),this.imgCanvas.w=e.mainimagedim.w,this.imgCanvas.h=e.mainimagedim.h,this.imgCanvas.x=void 0!==e.imagedim?e.imagedim.x:0,this.imgCanvas.y=void 0!==e.imagedim?e.imagedim.y:0},storeImageDimensions:function(e,t,i){t.appendTo(document.body).css({display:"none"}),i=i||new CloneObject(this.imageDefault,!0,[]);var a=t[0].getDimensions(!0);return i.imagedim?i.mainimagedim=i.imagedim:i.mainimagedim={},i.mainimagedim.w=a.width,i.mainimagedim.h=a.height,i.img=t[0],this.images[e]=i,i},makeImgCanvas:function(){var e=this;return new CanvasItem({id:"imgtocrop",w:this.imageDefault.imagedim.w,h:this.imageDefault.imagedim.h,x:200,y:200,interactive:!0,rotation:0,scale:1,offset:[0,0],events:{onMousemove:function(e,t){if(this.dragging){var i=this.w*this.scale,a=this.h*this.scale;this.x=e-this.offset[0]+.5*i,this.y=t-this.offset[1]+.5*a}},onDraw:function(t){if(t=e.CANVAS.ctx,void 0!==e.img){var i=this.w*this.scale,a=this.h*this.scale,o=this.x-.5*i,s=this.y-.5*a;if(t.save(),t.translate(this.x,this.y),t.rotate(this.rotation*Math.PI/180),this.hover?t.strokeStyle="#f00":t.strokeStyle="#000",t.strokeRect(-.5*i,-.5*a,i,a),void 0!==e.img)try{t.drawImage(e.img,-.5*i,-.5*a,i,a)}catch(e){}t.restore(),void 0!==e.img&&e.images.hasOwnProperty(e.activeFilePath)&&(e.images[e.activeFilePath].imagedim={x:this.x,y:this.y,w:i,h:a}),this.setDims(o,s,i,a)}},onMousedown:function(t,i){e.CANVAS.setDrag(this),this.offset=[t-this.dims[0],i-this.dims[1]],this.dragging=!0},onMouseup:function(){e.CANVAS.clearDrag(),this.dragging=!1},onMouseover:function(){e.overImg=!0,document.body.style.cursor="move"},onMouseout:function(){e.overImg=!1,e.overCrop||(document.body.style.cursor="default")}}})},makeCropperCanvas:function(){var e=this;return new CanvasItem({id:"item",x:175,y:175,w:150,h:50,interactive:!0,offset:[0,0],events:{onDraw:function(t){if(void 0!==(t=e.CANVAS.ctx)){var i=this.w,a=this.h,o=this.x-.5*i,s=this.y-.5*a;t.save(),t.translate(this.x,this.y),this.hover?t.strokeStyle="#f00":t.strokeStyle="#000",t.strokeRect(-.5*i,-.5*a,i,a),t.restore(),void 0!==e.img&&e.images.hasOwnProperty(e.activeFilePath)&&(e.images[e.activeFilePath].cropdim={x:this.x,y:this.y,w:i,h:a}),this.setDims(o,s,i,a)}},onMousedown:function(t,i){e.CANVAS.setDrag(this),this.offset=[t-this.dims[0],i-this.dims[1]],this.dragging=!0,e.overlay.withinCrop=!0},onMousemove:function(e,t){if(document.body.style.cursor="move",this.dragging){var i=this.w,a=this.h;this.x=e-this.offset[0]+.5*i,this.y=t-this.offset[1]+.5*a}},onMouseup:function(){e.CANVAS.clearDrag(),this.dragging=!1,e.overlay.withinCrop=!1},onMouseover:function(){this.hover=!0,e.overCrop=!0},onMouseout:function(){e.overImg||(document.body.style.cursor="default"),e.overCrop=!1,this.hover=!1}}})},makeThread:function(){var e=this;this.CANVAS.addThread(new Thread({id:"myThread",onExec:function(){void 0!==e.CANVAS&&void 0!==e.CANVAS.ctxEl&&e.CANVAS.clear().draw()}}))},watchClose:function(){var e=this;this.window.find("input[name=close-crop]").on("click",(function(t){e.storeActiveImageData(),e.win.close()}))},storeActiveImageData:function(t){if(void 0!==(t=t||this.activeFilePath)){var i=this.cropperCanvas.x,a=this.cropperCanvas.y,o=this.cropperCanvas.w-2,s=this.cropperCanvas.h-2;i-=o/2,a-=s/2;var n=e("#"+this.windowopts.id);if(0!==n.length){var r=n.find("canvas"),d=e(document.createElement("canvas")).attr({width:o+"px",height:s+"px"}).appendTo(document.body),l=d[0].getContext("2d"),h=t.split("\\").pop(),p=e('input[name*="'+h+'"]').filter((function(e,t){return t.name.contains("cropdata")}));l.drawImage(r[0],i,a,o,s,0,0,o,s),p.val(d[0].toDataURL("image/jpeg",this.windowopts.quality)),d.remove()}else fconsole("storeActiveImageData no window found for "+this.windowopts.id)}},watchZoom:function(){var t=this;if(this.windowopts.crop){var i=this.window.find("input[name=zoom-val]");this.scaleSlide=new Slider(this.window.find(".fabrikslider-line")[0],this.window.find(".knob")[0],{range:[20,300],onChange:function(e){if(t.imgCanvas.scale=e/100,void 0!==t.img)try{t.images[t.activeFilePath].scale=e}catch(e){fconsole("didnt get active file path:"+t.activeFilePath)}i.val(e)}}).set(100),i.on("change",(function(i){t.scaleSlide.set(e(this).val())}))}},watchRotate:function(){if(this.windowopts.crop){var t=this,i=this.window.find(".rotate"),a=this.window.find("input[name=rotate-val]");this.rotateSlide=new Slider(i.find(".fabrikslider-line")[0],i.find(".knob")[0],{onChange:function(e){if(t.imgCanvas.rotation=e,void 0!==t.img)try{t.images[t.activeFilePath].rotation=e}catch(e){fconsole("rorate err"+t.activeFilePath)}a.val(e)},steps:360}).set(0),a.on("change",(function(){t.rotateSlide.set(e(this).val())}))}},showWin:function(){this.win=Fabrik.getWindow(this.windowopts),this.window=e("#"+this.modalId),void 0!==this.CANVAS&&(void 0!==this.CANVAS.ctxEl&&(this.CANVAS.ctxPos=document.id(this.CANVAS.ctxEl).getPosition()),void 0!==this.CANVAS.threads&&void 0!==this.CANVAS.threads.get("myThread")&&this.CANVAS.threads.get("myThread").start(),this.win.drawWindow(),this.win.center())}});return window.FbFileUpload}));