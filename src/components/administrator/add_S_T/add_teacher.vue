<template>
    <div class="addTeacher">

        <input type="button" value="添加" class="add-doc-teacher color_green" @click="add">

        <div class="separateLine color_green">添加结果（教师）</div>
        <el-table class="schedule-table" :data="teachers" style="width: 100%" >
            <el-table-column type="index" label="序号" width="50" ></el-table-column>
            <el-table-column prop="tno" label="编号" width="90" align="center">
            </el-table-column>
            <el-table-column prop="tname" label="姓名" width="100" align="center">
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="60" align="center">
                <el-template slot-scope="scope">
                    <label v-if="scope.row.sex == 0">女</label>
                    <label v-else>男</label>
                </el-template>
            </el-table-column>
            <el-table-column prop="worktime" label="工作时间" width="80" align="center">
            </el-table-column>
            <el-table-column prop="pol" label="政治面貌" width="100" align="center">
            </el-table-column>
            <el-table-column prop="edurecord" label="学历" width="100" align="center">
            </el-table-column>
            <el-table-column prop="position" label="职位" width="100" align="center">
            </el-table-column>
            <el-table-column prop="dept" label="学院" width="160" align="center">
            </el-table-column>
            <el-table-column prop="tel" label="联系方式" width="160" align="center">
            </el-table-column>
            <el-table-column label="删除">
                    <template slot-scope="scope">
                        <el-button class="delete-teacher-btn" @click="delTeacher(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="修改">
                    <template slot-scope="scope">
                        <el-button class="update-teacher-btn" @click="updateTeacher(scope.$index)">修改</el-button>
                    </template>
                </el-table-column>
        </el-table>
        <button id="add_teacher_submit" class="color_green" @click="submit">提交</button>

        <el-dialog :visible.sync="dialogVisiable">
            <el-form title="教师信息" :model="teacherInfo" label-width="140px" label-position="right" :rules="rules" ref="ruleForm">
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="tno" label="编号">
                            <el-input v-model="teacherInfo.tno"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="tname" label="姓名">
                            <el-input v-model="teacherInfo.tname" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="sex" label="性别">
                            <el-select v-model="teacherInfo.sex" placeholder="" >
                                <el-option value="0" label="女">女</el-option>
                                <el-option value="1" label="男">男</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="worktime" label="工作时间">
                            <el-input v-model="teacherInfo.worktime" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="pol" label="政治面貌">
                            <el-input v-model="teacherInfo.pol" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="edurecord" label="学历">
                            <el-input v-model="teacherInfo.edurecord" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="position" label="职位">
                            <el-input v-model="teacherInfo.position" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="dept" label="学院">
                            <el-select v-model="teacherInfo.dept" >
                                <el-option v-for="item in depts" :value="item.value" :label="item.label"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="tel" label="联系方式">
                            <el-input v-model="teacherInfo.tel"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item>
                    <el-button @click="cancel">取消</el-button>
                    <el-button @click="addTeacher('ruleForm')" v-show="!isUpdate">确认</el-button>
                    <el-button @click="update('ruleForm')" v-show="isUpdate">修改</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import qs from 'qs';

//自定义表单检验电话号码
var checkPhone = (rule, value, callback) => {
    if( !value){
        return callback(new Error("电话号码不能为空"));
    }else if( !Number.isInteger(Number(value))){
        return callback(new Error("只能填写数字"));
    }else if(value.length != rule.length){
        return callback(new Error("电话号码为11位"));
    }else{
        return callback();
    }
}

//自定义检验教师编号
var checkTno = (rule, value, callback) => {
    if(!value){
        return callback(new Error("教师编号不能为空"));
    }else if(!Number.isInteger(Number(value))){
        return callback(new Error("只能填写数字"));
    }else if(value.length != rule.length){
        return callback(new Error("教师编号为8位"));
    }else{
        return callback();
    }
}

export default {
    name:'addTeacher',
    data(){
        return {
            dialogVisiable:false,
            isUpdate:false,
            currentIndex:null,//记录选中行的索引

            teacherInfo:{
                    tno:"",
                    tname:"",
                    sex:"",
                    worktime:"",
                    pol:"",
                    edurecord:"",
                    position:"",
                    dept:"",
                    tel:"",
                },
            teachers:[],
            depts:[
                {
                    value:"计算机科学学院",
                    label:"计算机科学学院"
                },{
                    value:'音乐学院',
                    label:'音乐学院',
                }
            ],
            rules:{
                tno:[
                    {required: true, message: '教师编号不能为空', trigger: 'blur'},
                    {length:8, validator: checkTno, trigger:'blur'}
                ],
                tname:[
                    {required: true, message: '姓名不能为空', trigger: 'blur'},
                    {min: 1, max: 20, message: '长度在1-20之间', trigger: 'blur'}
                ],
                sex:[
                    {required: true, message: '性别不能为空', trigger: 'blur'}
                ],
                worktime:[
                    {required: true, message: '工作时间不能为空', trigger: 'blur'}
                ],
                pol:[
                    {required: true, message: '政治面貌不能为空', trigger: 'blur'}
                ],
                edurecord:[
                    {required: true, message: '学历不能为空', trigger: 'blur'}
                ],
                position:[
                    {required: true, message: '职位不能为空', trigger: 'blur'}
                ],
                dept:[
                    {required: true, message: '学院不能为空',trigger: 'blur'}
                ],
                tel:[
                    {required: true, message: '电话号码不能为空', trigger: 'blur'},
                    {length: 11, validator: checkPhone, trigger: 'blur'}
                ]
            }
        }
    },
    methods:{
        cancel(){
            this.teacherInfo = {
                    tno:"",
                    tname:"",
                    sex:"",
                    worktime:"",
                    pol:"",
                    edurecord:"",
                    position:"",
                    dept:"",
                    tel:"",
                }
            this.dialogVisiable = false
            this.isUpdate = false
        },
        //显示对话框，填写教师信息
        add(){
            if(this.teachers.length < 10){
                this.dialogVisiable = true;
            }else{
                alert("请先提交一部分数据！");
            }
        },
        //删除选中的教师
        delTeacher(index){
            this.teachers.splice(index,1);
        },
        //修改选中的教师,显示对话框
        updateTeacher(index){
            // this.teacherInfo = this.teachers[index]
            this.copy(this.teacherInfo, this.teachers[index])
            this.currentIndex = index;
            this.dialogVisiable = true;
            this.isUpdate = true;
        },

        //用户教师对象赋值
        copy(p1, p2){
            p1.tno = p2.tno
            p1.tname = p2.tname
            p1.sex = p2.sex
            p1.pol = p2.pol
            p1.edurecord = p2.edurecord
            p1.worktime = p2.worktime
            p1.position = p2.position
            p1.dept = p2.dept
            p1.tel = p2.tel
        },
        //修改教师信息
        update(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    this.copy(this.teachers[this.currentIndex],this.teacherInfo)
                    this.teacherInfo = {
                    tno:"",
                    tname:"",
                    sex:"",
                    worktime:"",
                    pol:"",
                    edurecord:"",
                    position:"",
                    dept:"",
                    tel:"",
                    }
                    this.dialogVisiable = false;
                    this.isUpdate = false;
                }else{
                    console.log("error in update");
                }
            })
        },
        //添加教师信息
        addTeacher(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    this.teachers.push(this.teacherInfo);
                    this.teacherInfo = {
                        tno:"",
                        tname:"",
                        sex:"",
                        worktime:"",
                        pol:"",
                        edurecord:"",
                        position:"",
                        dept:"",
                        tel:"",
                    }
                    this.dialogVisiable = false;
                }
            })
            
        },
        submit(){
            console.log(this.teachers);
            var teachers = JSON.stringify(this.teachers);
            console.log(teachers);
            // //发送http请求
            this.$axios.post("/manager/insertTeacher",teachers)
            .then(res => {
                console.log(res);
                if(res.data.state){
                    alert("添加成功！");
                    this.teachers.splice(0,this.teachers.length);
                }else{
                    alert("添加失败！");
                }
            })
            .catch(function (error){
                alert("添加失败！");
            })
        }
    },

}
</script>


<style>
@import "../../../assets/css/color.css";

.first-level{
    width: 5%;
}

.second-level{
    width: 10%;
}

.delete-teacher-btn{
    width: 60px;
    height: 30px;
    text-align: center;
    padding: 0%;
}

.update-teacher-btn{
    width: 60px;
    height: 30px;
    text-align: center;
    padding: 0%;
}

.addTeacher> table{
    margin: 0 auto;
    width: 100%;
    border-left: 2px solid #CCCCCC;
    border-top: 2px solid #CCCCCC;
}

.addTeacher > table > tr >td > input{
    border: none;
    height: 30px;
    width: 100%;
}

.addTeacher > table > tr >td > select{
    border: none;
    width: 100%;
    height: 30px;
}

.addTeacher > table > tr >td{
    text-align: center;
    border-right: 2px solid #CCCCCC;
    border-bottom: 2px solid #CCCCCC;
}

#add_teacher_submit{
    margin-top: 50px;
    margin-left: 45%;
    width: 60px;
    height: 30px;
    color: white;
    border-radius: 7%;
    border-style: none;
}

.add-doc-teacher{
    margin-top: 40px;
    margin-left: 80%;
    width: 60px;
    height: 30px;
    color: white;
    border-radius: 7%;
    border-style: none;
}


</style>



