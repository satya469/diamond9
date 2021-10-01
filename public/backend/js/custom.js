$(document).ready(function()
{$(document).ready(function(){var mtree=$('ul.mtree');mtree.wrap('<div class=mtree-main></div>');var skins=['bubba','skinny','transit','jet','nix'];mtree.addClass(skins[0]);$('body').prepend('<div class="mtree-skin-selector"><ul class="button-group radius"></ul></div>');var s=$('.mtree-skin-selector');$.each(skins,function(index,val){s.find('ul').append('<li><button class="small skin">'+val+'</button></li>');});s.find('ul').append('<li><button class="small csl active">Close Same Level</button></li>');s.find('button.skin').each(function(index){$(this).on('click.mtree-skin-selector',function(){s.find('button.skin.active').removeClass('active');$(this).addClass('active');mtree.removeClass(skins.join(' ')).addClass(skins[index]);});})
s.find('button:first').addClass('active');s.find('.csl').on('click.mtree-close-same-level',function(){$(this).toggleClass('active');});$(".path-back").click(function(){$(".set-content").slideToggle();});});$(document).on('click','.side-menu-button',function()
{$(this).addClass('change');$(".sidebar").show(300);});$(document).on('click','.side-menu-button.change',function()
{$(this).removeClass('change');$(".sidebar").hide(300);});$(".username").click(function()
{$(".username ul").slideToggle();});$(".sidebar .fa-times").click(function()
{$(".sidebar").hide(300);$(".side-menu-button").removeClass('change');});$(".master-balance .fa-arrow-alt-circle-down").click(function()
{$(".master-balance-detail").slideDown();$(this).hide();$(".fa-arrow-alt-circle-up").show();});$(".master-balance .fa-arrow-alt-circle-up").click(function()
{$(".master-balance-detail").slideUp();$(this).hide();$(".fa-arrow-alt-circle-down").show();});});$(document).ready(function(){$('.datatable').DataTable({"pageLength":50,"order":[]});});$.fn.dataTable.ext.classes.sPageButton='button btn btn-diamond primary_button datatable-pagebuttons';$.fn.dataTable.ext.classes.sFilterInput='form-control datatable-search';var csrf=$('meta[name=csrf-token]').attr("content");var path=$('meta[name=path]').attr("content");var token=$('meta[name=token]').attr("content");function setUserToDeposit(id){$("#uid").val(id);$("#modal-deposit #deposite-first-diff").html('');$("#modal-deposit #deposite-second-diff").html('');$("#modal-deposit #deposit-remark").html('');$("#modal-deposit #mpassword").val();$("#deposite-amount").val(0);let data=CryptojsEncrypt({'userid':id,'_token':csrf});$.ajax({url:path+"/set-user-deposite/"+token,type:"post",data:data,beforeSend:function(){showLoading();$("#DepositForm")[0].reset();},complete:function(){hideLoading();},success:function(apiResponse){let response=CryptojsDecrypt(apiResponse);if(response.status==200){let data=response.data;$("#modal-deposit .deposite-user-first").html(data.t1[0].userName);$("#modal-deposit #deposite-first").html(data.t1[0].general);$("#modal-deposit .deposite-user-second").html(data.t2[0].userName);$("#modal-deposit #deposite-second").html(data.t2[0].general);$("#modal-deposit").modal("show");}},});}
function changeSetDepositAmount(){var amount=$("#deposite-amount").val();if(amount>0){var first=$("#modal-deposit #deposite-first").html();var second=$("#modal-deposit #deposite-second").html();total1=parseFloat(parseFloat(first)-parseFloat(amount)).toFixed(2);total2=parseFloat(parseFloat(second)+parseFloat(amount)).toFixed(2);$("#modal-deposit #deposite-first-diff").html(total1);$("#modal-deposit #deposite-second-diff").html(total2);}else{$("#modal-deposit #deposite-first-diff").html("");$("#modal-deposit #deposite-second-diff").html("");}}
$('.maxlength10').keypress(function(e){var amount=$(this).val();if(amount.length>10){e.preventDefault();e.stopPropagation();return false;}});$(function(){if($("#modal-deposit #uid").val=='')
{alert('blank');}
else
{$('#DepositForm').on('submit',function(e){var data={'u_id':$("#modal-deposit #uid").val(),'amount':$("#modal-deposit #deposite-amount").val(),'remark':$("#modal-deposit #deposit-remark").val(),'type':'deposit','mpassword':$("#modal-deposit #mpassword").val(),'_token':csrf};$('#DepositForm .btn-submit').attr("disabled",true);let postData=CryptojsEncrypt(data);showLoading();$.ajax({url:path+"/save-user-deposite/"+token,type:"post",data:postData,success:function(apiResponse){let response=CryptojsDecrypt(apiResponse);if(response.status==200){let data=response.data;alert(data[0].msg);if(data[0].id==1){window.location.reload();}}},complete:function(){hideLoading();$('#DepositForm .btn-submit').attr("disabled",false);}});});}});function setUserToWithdraw(id){$("#withdraw-uid").val(id);$("#modal-withdraw #withdraw-first-diff").html('');$("#modal-withdraw #withdraw-second-diff").html('');$("#modal-withdraw #withdraw-remark").html('');$("#modal-withdraw #withdraw-mpassword").val();$("#withdraw-amount").val(0);let data=CryptojsEncrypt({'userid':id,'_token':csrf});$.ajax({url:path+"/set-user-withdraw/"+token,type:"post",data,beforeSend:function(){showLoading();$("#WithdrawForm")[0].reset();},complete:function(){hideLoading();},success:function(apiResponse){let response=CryptojsDecrypt(apiResponse);if(response.status==200){let data=response.data;$("#modal-withdraw .withdraw-user-first").html(data.t1[0].userName);$("#modal-withdraw #withdraw-first").html(data.t1[0].general);$("#modal-withdraw .withdraw-user-second").html(data.t2[0].userName);$("#modal-withdraw #withdraw-second").html(data.t2[0].general);$("#modal-withdraw").modal("show");}},});}
function changeSetWithdrawAmount(){var amount=$("#withdraw-amount").val();var first=$("#modal-withdraw #withdraw-first").html();var second=$("#modal-withdraw #withdraw-second").html();total1=parseFloat(first)+parseFloat(amount);total2=parseFloat(second)-parseFloat(amount);$("#modal-withdraw #withdraw-first-diff").html(total1);$("#modal-withdraw #withdraw-second-diff").html(total2);}
$(document).on("keyup","#new-credit, #new-limit",function(){var amount=$(this).val();if(parseInt(amount)<0||!$.isNumeric(amount)||amount==""){$(this).val(0);}});$(function(){if($("#modal-withdraw #withdraw-uid").val=='')
{alert('blank');}
else
{$('#WithdrawForm').on('submit',function(e){$('#WithdrawForm .btn-submit').attr("disabled",true);var data={'u_id':$("#modal-withdraw #withdraw-uid").val(),'amount':$("#modal-withdraw #withdraw-amount").val(),'remark':$("#modal-withdraw #withdraw-remark").val(),'type':'withdraw','mpassword':$("#modal-withdraw #withdraw-mpassword").val(),'_token':csrf};let postData=CryptojsEncrypt(data);showLoading();$.ajax({url:path+"/save-user-withdraw/"+token,type:"post",data:postData,success:function(apiResponse){let response=CryptojsDecrypt(apiResponse);if(response.status==200){let data=response.data;alert(data[0].msg);if(data[0].id==1){window.location.reload();}}},complete:function(){hideLoading();$('#WithdrawForm .btn-submit').attr("disabled",false);}});});}});function setUserToLimit(userid){$("#limit-uid").val(userid);$.ajax({url:path+"/limit-select/"+token,type:"post",data:CryptojsEncrypt({'userid':userid,'_token':csrf}),beforeSend:function(){showLoading();$("#LimitForm")[0].reset();},complete:function(){hideLoading();},success:function(apiResponse){let response=CryptojsDecrypt(apiResponse);if(response.status==200){let data=response.data;$("#modal-exposure-limit #old-limit").html(data[0].expoLimits);$("#modal-exposure-limit").modal("show");}},});}
$(function(){$('#LimitForm').on('submit',function(e){$('#LimitForm .btn-submit').attr("disabled",true);var data={'u_id':$("#modal-exposure-limit #limit-uid").val(),'amount':$("#modal-exposure-limit #new-limit").val(),'mpassword':$("#modal-exposure-limit #mpasswprd-limit").val(),'_token':csrf};$.ajax({url:path+"/save-user-limit/"+token,type:"post",data:CryptojsEncrypt(data),success:function(apiResponse){let response=CryptojsDecrypt(apiResponse);if(response.status==200){let data=response.data;alert(data[0].msg);if(data[0].id==1){window.location.reload();}}else if(response.status=="error"){alert(response.error)}},beforeSend:function(){showLoading();},complete:function(){hideLoading();$('#LimitForm .btn-submit').attr("disabled",false);}});});});function setUserToCredit(userid){$("#credit-uid").val(userid);$.ajax({url:path+"/credit-select/"+token,type:"post",data:CryptojsEncrypt({'userid':userid,'_token':csrf}),beforeSend:function(){showLoading();$("#CreditForm")[0].reset();},complete:function(){hideLoading();},success:function(apiResponse){let response=CryptojsDecrypt(apiResponse);if(response.status==200){let data=response.data;$("#modal-credit #old-credit").html(data[0].creditRef);$("#modal-credit").modal("show");}},});}
$(function(){$('#CreditForm').on('submit',function(e){$('#CreditForm .btn-submit').attr("disabled",true);var data={'u_id':$("#modal-credit #credit-uid").val(),'amount':$("#modal-credit #new-credit").val(),'mpassword':$("#modal-credit #credit-mpassword").val(),'_token':csrf};$.ajax({url:path+"/save-user-credit/"+token,type:"post",data:CryptojsEncrypt(data),beforeSend:function(){showLoading();},success:function(apiResponse){let response=CryptojsDecrypt(apiResponse);if(response.status==200){let data=response.data;alert(data[0].msg);if(data[0].id==1){window.location.reload();}}else if(response.status=="error"){alert(response.error)}},complete:function(){hideLoading();$('#CreditForm .btn-submit').attr("disabled",false);}});});});function setUserToPassword(userid){$("#PasswordForm")[0].reset();$("#password-uid").val(userid);}
$(function(){$('#PasswordForm').on('submit',function(e){var data={'u_id':$("#modal-password #password-uid").val(),'newpassword':$("#modal-password #new-password").val(),'confirmpassword':$("#modal-password #confirm-password").val(),'mpassword':$("#modal-password #password-mpassword").val(),'_token':csrf};$.ajax({url:path+"/save-user-password/"+token,type:"post",data:CryptojsEncrypt(data),beforeSend:function(){showLoading();},complete:function(){hideLoading();},success:function(apiResponse){let response=CryptojsDecrypt(apiResponse);if(response.status==200){let data=response.data;if(isJson(data))
{alert(data[0].msg);}
else
{alert(data[0].msg);}
if(data[0].id==1){window.location.reload();}}else if(response.status=="error"){alert(response.error)}},});});});function isJson(str){try{JSON.parse(str);}catch(e){return false;}
return true;}
function setUserToStatus(userid){$("#status-uid").val(userid);$.ajax({url:path+"/status-select/"+token,type:"post",data:CryptojsEncrypt({'userid':userid,'_token':csrf}),beforeSend:function(){showLoading();$("#StatusForm")[0].reset();},complete:function(){hideLoading();},success:function(apiResponse){let response=CryptojsDecrypt(apiResponse);if(response.status==200){let data=response.data;$("#modal-status #status-username").html(data[0].userName);if(data[0].userActive==true)
{$("#modal-status #user-active-diff-s").show();$("#modal-status #status-user-active-s").attr('checked','checked');}
else
{$("#modal-status #user-active-diff-f").show();}
if(data[0].betActive==true)
{$("#modal-status #status-bet-active-s").attr('checked','checked');}
$("#modal-status").modal("show");}},});}
$(function(){$('#StatusForm').on('submit',function(e){if($('#status-user-active-s').is(":checked"))
{$('#status-user-active').val('on');}
else
{$('#status-user-active').val('off');}
if($('#status-bet-active-s').is(":checked"))
{$('#status-bet-active').val('on');}
else
{$('#status-bet-active').val('off');}
var data={'u_id':$("#modal-status #status-uid").val(),'useractive':$('#status-user-active').val(),'betactive':$('#status-bet-active').val(),'mpassword':$("#modal-status #status-mpassword").val(),'_token':csrf};$.ajax({url:path+"/save-user-status/"+token,type:"post",data:CryptojsEncrypt(data),beforeSend:function(){showLoading();},complete:function(){hideLoading();},success:function(apiResponse){let response=CryptojsDecrypt(apiResponse);if(response.status==200){let data=response.data;alert(data[0].msg);if(data[0].id==1){window.location.reload();}}else if(response.status=="error"){alert(response.error)}},});});});var nowDate=new Date();var today=new Date(nowDate.getFullYear(),nowDate.getMonth()-1,nowDate.getDate(),0,0,0,0);var endDate=new Date(nowDate.getFullYear(),nowDate.getMonth(),nowDate.getDate(),0,0,0,0);$('#fromdate').datepicker({format:'yyyy-mm-dd',"autoclose":true,endDate:endDate}).on('changeDate',function(){$('#todate').datepicker('setStartDate',new Date($(this).val()));});$('#todate').datepicker({format:'yyyy-mm-dd',"autoclose":true,endDate:endDate}).on('changeDate',function(){$('#fromdate').datepicker('setEndDate',new Date($(this).val()));});var pathUrl=path+"/user-search-account-statement/"+token;$('.js-data-example-ajax').select2({ajax:{url:pathUrl,dataType:'json',processResults:function(data){return{results:data.results};},cache:false},minimumInputLength:3,allowClear:true,placeholder:{id:"",placeholder:"Leave blank to ..."},});function showLoading(){$("div#divLoading").addClass('show');}
function hideLoading(){$("div#divLoading").removeClass('show');}