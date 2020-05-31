<template>
    <div class="addStudent">
        <el-select class="add-stu-select"v-model="dept" placeholder="请选择学院">
            <el-option v-for="item in depts" :value="item.value" :label="item.label"></el-option>
        </el-select>
        <el-select class="add-stu-select" v-model="major" placeholder="请选择专业">
            <el-option v-for="item in majors" :value="item.value" :label="item.label"></el-option>
        </el-select>
        <el-select class="add-stu-select" v-model="grade" placeholder="请选择年级">
            <el-option v-for="item in grades" :value="item.value" :label="item.label"></el-option>
        </el-select>
        <el-select class="add-stu-select" v-model="classno" placeholder="请选择班级">
            <el-option v-for="item in classes" :value="item.value" :label="item.label"></el-option>
        </el-select>
        
        <input type="button" value="添加" class="add-doc-student color_green" @click="add">
        <div class="separateLine color_green">添加结果(学生)</div>

            <el-table class="add-student-table" :data="students.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%" >
                <el-table-column type="index" :index="indexAutoincrease" label="序号" width="60" ></el-table-column>
                <el-table-column prop="sno" label="学号" width="120" align="center">
                </el-table-column>
                <el-table-column prop="sname" label="姓名" width="120" align="center">
                </el-table-column>
                <el-table-column prop="sex" label="性别" width="70" align="center">
                    <el-template slot-scope="scope">
                        <label v-if="scope.row.sex == 0">女</label>
                        <label v-else>男</label>
                    </el-template>
                </el-table-column>
                <el-table-column prop="birth" label="出生日期" width="130" align="center">
                </el-table-column>
                <el-table-column prop="pol" label="政治面貌" width="100" align="center">
                </el-table-column>
                <el-table-column prop="gs" label="毕业学校" width="200" align="center">
                </el-table-column>
                <el-table-column label="删除">
                    <template slot-scope="scope">
                        <el-button class="delete-student-btn" @click="delStudent(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="修改">
                    <template slot-scope="scope">
                        <el-button class="update-student-btn" @click="updateStudent(scope.$index)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalNum"
            class="pagination">
        </el-pagination>
        <button id="add_student_submit" class="color_green" @click="submit">提交</button>

        <el-dialog title="学生信息" :visible.sync="dialogVisiable" class="dialog-addStu">
            <el-form :model="studentInfo" label-width="140px" label-position="right" :rules="rules" ref="ruleForm">
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="sno" label="请填写学号">
                            <el-input v-model="studentInfo.sno"></el-input>
                        </el-form-item>                       
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="sname" label="请填写姓名">
                            <el-input v-model="studentInfo.sname"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="sex" label="请选择性别">
                            <el-select v-model="studentInfo.sex" placeholder="">
                                <el-option value="0" label="女">女</el-option>
                                <el-option value="1" label="男">男</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="birth" label="请选择时间">
                            <el-date-picker v-model="studentInfo.birth" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                       <el-form-item prop="pol" label="政治面貌">
                            <el-input v-model="studentInfo.pol" ></el-input>
                        </el-form-item> 
                    </el-col> 
                    <el-col :span="12">
                        <el-form-item prop="gs" label="毕业学校">
                            <el-input v-model="studentInfo.gs" ></el-input>
                        </el-form-item>
                    </el-col>   
                </el-row> 
                <el-form-item>
                    <el-button @click="cancel">取消</el-button>
                    <el-button @click="addStudent('ruleForm')" v-if="!isUpdate">确定</el-button>
                    <el-button @click="update('ruleForm')" v-if="isUpdate">修改</el-button>
                </el-form-item>                              
            </el-form>
            
        </el-dialog>
    </div>
</template>

<script>
import qs from 'qs'

var checkSno = (rule, value, callback) => {
    if(!Number.isInteger(Number(value))){
        return callback(new Error("只能填写数字"));
    }else if(value.length != rule.length){
        return callback(new Error("学生编号为10位"));
    }else{
        return callback();
    }
}

export default {
    name:'addStudent',
    data(){
        return {
            currentPage: 1, // 默认显示第一页
            pageSize: 5, // 默认每页显示1条
            totalNum: 0, // 数据总条数
            dialogVisiable:false,
            isUpdate:false,
            currentIndex:null, //记录选中行的索引

            studentInfo:{
                sno:"",
                sname:"",
                sex:"",
                birth:"",
                pol:"",
                gs:"",
                dept:"",
                major:"",
                grade:"",
                classno:""
            },

            dept:"",
            grade:"",
            major:"",
            classno:"",
            students:[],
            grades:[
                {
                    value:"2020",
                    label:"2020级"
                },
                {
                    value:"2021",
                    label:"2021级"
                },
                {
                    value:"2022",
                    label:"2022级"
                }
            ],
            classes:[
                {
                    value:"01",
                    label:"1班"
                },
                {
                    value:"02",
                    label:"2班"
                },
                {
                    value:"03",
                    label:"3班"
                },
                {
                    value:"04",
                    label:"4班"
                },
                {
                    value:"05",
                    label:"5班"
                },
                {
                    value:"06",
                    label:"6班"
                },
                {
                    value:"07",
                    label:"7班"
                }
            ],
            depts:[
                {
                    value:"计算机科学学院",
                    label:"计算机科学学院"
                },
                {
                    value:"外国语学院",
                    label:"外国语学院"
                },
                {
                    value:"体育学院",
                    label:"体育学院"
                },
                {
                    value:"音乐学院",
                    label:"音乐学院"
                },
                {
                    value:"舞蹈学院",
                    label:"舞蹈学院"
                },
                {
                    value:"美术学院",
                    label:"美术学院"
                },{
                    value:"服装与设计学院",
                    label:"服装与设计学院"
                },
                {
                    value:"物电学院",
                    label:"物电学院"
                },
                
            ],
            majors:[
                {
                    value:"软件工程",
                    label:"软件工程"
                },
                {
                    value:"网络工程",
                    label:"网络工程"
                },
                {
                    value:"计算机科学与技术",
                    label:"加算计科学与技术"
                },
                {
                    value:"电子商务",
                    label:"电子商务"
                },
            ],

            rules:{
                sno:[
                    {required:true,message: '学号不能为空', trigger: 'blur' },
                    {length: 10, validator: checkSno, trigger: 'blur'}    
                ],
                sname:[
                    {required:true,message: '姓名不能为空', trigger: 'blur' },
                    {min: 2,max: 20, message: '长度在2-20之间', trigger: 'blur'}
                ],
                sex:[
                    {required:true,message:'请选择性别', trigger:'blur'}
                ],
                gs:[
                    {required: true, message: '学校不能为空', trigger: 'blur'},
                    {min: 1, max: 30, message: '长度在1-30之间',trigger: 'blur'}
                ],
                birth:[
                    {required: true, message: '出生日期不能为空',trigger: 'blur'}
                ],
                pol:[
                    {required: true, message: '政治面貌不能为空',trigger: 'blur'},
                    {min: 2, max: 4, message: '长度在2-4之间', trigger: 'blur'}
                ]
             }
        }
    },
    methods:{
        //处理表格序号
        indexAutoincrease(index) {
            return (this.currentPage - 1) * this.pageSize + index + 1;
        },
        //修改选中行的学生信息
        updateStudent(index){     
            this.studentInfo.sno = this.students[index].sno
            this.studentInfo.sname = this.students[index].sname
            this.studentInfo.sex = this.students[index].sex;
            this.studentInfo.pol = this.students[index].pol;
            this.studentInfo.gs = this.students[index].gs;
            this.studentInfo.birth = this.students[index].birth;

            this.dialogVisiable = true;
            this.isUpdate = true;
            this.currentIndex = index;
        },
        //确认修改学生信息
        update(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    this.students[this.currentIndex].sno = this.studentInfo.sno
                    this.students[this.currentIndex].sname = this.studentInfo.sname
                    this.students[this.currentIndex].sex = this.studentInfo.sex 
                    this.students[this.currentIndex].pol = this.studentInfo.pol 
                    this.students[this.currentIndex].gs = this.studentInfo.gs
                    this.students[this.currentIndex].birth = this.studentInfo.birth
                    this.studentInfo = {
                        sno:"",
                        sname:"",
                        sex:"",
                        birth:"",
                        pol:"",
                        gs:"",
                        dept:"",
                        major:"",
                        grade:"",
                        classno:""
                    };
                    this.dialogVisiable = false;
                    this.isUpdate = false;
                }else{
                    console.log("error in update");
                }
            })
        },
        //删除表格中的学生信息
        delStudent(index){
            this.students.splice(index,1);
            this.totalNum = this.totalNum - 1;
        },
        add(){
            if(this.dept == ""){
                alert("请选择学院！");
                return;
            }
            if(this.grade == ""){
                alert("请选择年级！");
                return;
            }
            if(this.major == ""){
                alert("请选择专业！");
                return;
            }
            if(this.classno == ""){
                alert("请选择班级！");
                return;
            }
            this.dialogVisiable = true;
        },
        cancel(){
            this.studentInfo = {
                sno:"",
                sname:"",
                sex:"",
                birth:"",
                pol:"",
                gs:"",
                dept:"",
                major:"",
                grade:"",
                classno:""
            };
            this.dialogVisiable = false;
            this.isUpdate = false;
        },
        //在对话框中添加学生信息
        addStudent(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    this.studentInfo.dept = this.dept;
                    this.studentInfo.grade = this.grade;
                    this.studentInfo.major = this.major;
                    this.studentInfo.classno = this.classno;
                    this.students.push(this.studentInfo)

                    this.studentInfo = {
                        sno:"",
                        sname:"",
                        sex:"",
                        birth:"",
                        pol:"",
                        gs:"",
                        dept:"",
                        major:"",
                        grade:"",
                        classno:""
                    };
                    this.totalNum = this.totalNum + 1;
                    this.dialogVisiable = false;
                }else{
                    console.log("error");
                }
            })

            
        },

        submit(){
            var students = JSON.stringify(this.students);
            // console.log(this.students);
            //发送http请求
            this.$axios.post("/manager/insertStudent",students)
            .then(res => {
                console.log(res);
                if(res.data.state){
                    alert("添加成功！");
                    this.students.splice(0,this.students.length);
                }else{
                    alert("添加失败！");
                }
            }).catch(function (error){
                alert("发生错误!");
            });
        },
        // 分页处理
        handleSizeChange (val) {
            // console.log(`每页 ${val} 条`)
            this.pageSize = val // 动态改变
        },

        handleCurrentChange (val) {
            // console.log(`当前页: ${val}`)
            this.currentPage = val // 动态改变
        }
    },
    mounted(){
        //设置录入学生出生日期时，可以输入的日期的最大值
        var date = new Date();
        var year = date.getFullYear();
        //js中获取月份时，会比当前月份少1，
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth()+1) : (date.getMonth() + 1);
        var day = date.getUTCDate();
        document.getElementById("birth").setAttribute("max",year + "-" + month + "-" + day);
    }
}
</script>

<style>

@import "../../../assets/css/color.css";

#add_student_submit{
    margin-top: 50px;
    margin-left: 45%;
    width: 60px;
    height: 30px;
    color: white;
    border-radius: 7%;
    border-style: none;
}

.dialog-addStu > el-form-item > el-input{
    width: 200px;
}

.add-stu-select{
    margin-top: 30px;
}

.delete-student-btn{
    width: 60px;
    height: 30px;
    text-align: center;
    padding: 0%;
}
.update-student-btn{
    width: 60px;
    height: 30px;
    text-align: center;
    padding: 0%;
}

.add-doc-student{
    width: 60px;
    height: 30px;
    color: white;
    border-radius: 7%;
    border-style: none;
}

.separateLine{
    color: white;
    margin-top: 30px;
}


</style>



