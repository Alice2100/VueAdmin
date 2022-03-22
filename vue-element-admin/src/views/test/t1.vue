<template>
    <el-container>
        <el-header style="text-align: center;">
        <el-row style="">
            <el-col :span="12"><el-alert title="表单组件：1aa -- dadadadad"  type="warning" center effect="dark"></el-alert></el-col>
            <el-col :span="12"><el-input v-model="fillPara" style="width: 300px" placeholder="序列参数"></el-input> <el-button @click="fill(fillPara)">执行 fill</el-button></el-col>
        </el-row>
        </el-header>
        <el-main>
        <template>
            <el-form ref="form" :model="form" label-width="30%" v-loading="page.loading">
                <el-form-item>
                    <el-input v-model="form.flowpos">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    {{form.CamID}}
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.CamIDx">
                    </el-input>
                </el-form-item>
                <el-form-item label="摄像机名称">
                    <el-input v-model="form.CamName" style="width:50px">
                    </el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="form.Mimo">
                    </el-input>
                </el-form-item>
                <el-form-item label="网络地址">
                    <el-input v-model="form.UrlAddress">
                    </el-input>
                </el-form-item>
                <el-form-item label="拉流方式">
                    <el-select v-model="form.RtpType.selValue">
                        <el-option v-for="item in form.RtpType.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input v-model="form.RunStat">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.AreaDicCode">
                    </el-input>
                </el-form-item>
                <el-form-item label="是否推送消息">
                    <el-input v-model="form.IsSendMsg">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.pid">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox-group v-model="form.fmem.selValue">
                        <el-checkbox v-for="item in form.fmem.options" :key="item.value" :label="item.value">{{item.label}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.modfmem">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.addtime">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.updatetime">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.dydata">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.stat">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.flow">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" round @click="submit(()=>{})">提交</el-button>
                    <el-button type="primary" round @click="reset()">重置</el-button>
                </el-form-item>
            </el-form>
        </template>
        </el-main>
        </el-container>
</template>
<script>
import Config from '../../ftdp/utils/config.js'
//配置
var apiBase=globalConfig.apiBase;
var config={
	apiGet:apiBase+"/demo/xxx?detail",
	apiSet:apiBase+"/demo/xxx?mod",
	tokenKey:globalConfig.tokenKey,
	tokenVal:getTokenLocal(),
}
//数据定义
 var form={
	flowpos:"",
	CamIDx:"",
	CamName:"",
	Mimo:"",
	UrlAddress:"",
	RtpType:{
		options:[],
		selValue:''
	},
	RunStat:"",
	AreaDicCode:"",
	IsSendMsg:"",
	pid:"",
	fmem:{
		options:[],
		selValue:[]
	},
	modfmem:"",
	addtime:"",
	updatetime:"",
	dydata:"",
	stat:"",
	flow:"",
}
var oriform = '{}'
module.exports = {
    data: function() {
        return {
			form:form,
			page:{loading:false },
            fillPara:'',
        }
    },
    methods: {
		fill(paras) {
			form_paras=paras;
			form_fill(config,this,form_paras,(obj)=>{form_fill_json(obj,this);oriform=JSON.stringify(form);});
		},
		reset() {
			form_paras='';
			var oform=JSON.parse(oriform);
			var keys=Object.keys(form);
			for(var ii=0;ii<keys.length;ii++)if(oform[keys[ii]]!=null)form[keys[ii]]=oform[keys[ii]];
		},
		submit(func) {
			form_submit(config,this,form_paras,form_submit_json(this),func);
		},
   },
	mounted:function(){
		init(this,()=>{oriform=JSON.stringify(form)});
	}
}
var form_paras='';
//初始化数据定义
function init(vm,callback)
{

	optionsJson(config,vm,apiBase+'/demo/xxx?options',(json)=>{form.RtpType.options=json;callback();});
	optionsJson(config,vm,apiBase+'/demo/xxx?options',(json)=>{form.fmem.options=json;callback();});

	callback();
}
//表单填充定义
function form_fill_json(detail,vm)
{
form.flowpos = detail.flowpos; //
form.CamID = detail.CamID; //
form.CamIDx = ""; //=>未匹配
form.CamName = detail.CamName; //摄像机名称
form.Mimo = detail.Mimo; //描述
form.UrlAddress = detail.UrlAddress; //网络地址
form.RtpType = detail.RtpType; //拉流方式
form.RunStat = detail.RunStat; //状态
form.AreaDicCode = detail.AreaDicCode; //
form.IsSendMsg = detail.IsSendMsg; //是否推送消息
form.pid = detail.pid; //
form.fmem = detail.fmem; //
form.modfmem = detail.modfmem; //
form.addtime = detail.addtime; //
form.updatetime = detail.updatetime; //
form.dydata = detail.dydata; //
form.stat = detail.stat; //
form.flow = detail.flow; //
}
//表单提交定义
function form_submit_json(vm)
{
var json={};
//json[''] = form.flowpos; //=>未匹配
//json[''] = form.CamID; //=>未匹配
//json[''] = form.CamIDx; //=>未匹配
json['CamName'] = form.CamName; //摄像机名称
//json[''] = form.Mimo; //描述=>未匹配
json['UrlAddress'] = form.UrlAddress; //网络地址
//json[''] = form.RtpType; //拉流方式=>未匹配
//json[''] = form.RunStat; //状态=>未匹配
//json[''] = form.AreaDicCode; //=>未匹配
//json[''] = form.IsSendMsg; //是否推送消息=>未匹配
//json[''] = form.pid; //=>未匹配
//json[''] = form.fmem; //=>未匹配
//json[''] = form.modfmem; //=>未匹配
//json[''] = form.addtime; //=>未匹配
//json[''] = form.updatetime; //=>未匹配
//json[''] = form.dydata; //=>未匹配
//json[''] = form.stat; //=>未匹配
//json[''] = form.flow; //=>未匹配
return json;
}
</script>
