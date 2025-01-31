<template>
  <el-dialog :title="title" :visible.sync="formStatus.visible" width="40%">
    <el-form :model="groupData" ref="groupDataForm" :rules="rules" label-width="80px" class="demo-ruleForm"
             v-loading="creating" element-loading-text="GroupId创建中"
             element-loading-spinner="el-icon-loading">
      <el-form-item label="MQ实例" prop="instance">
        <el-select v-model="groupData.instance" placeholder="请选择实例" @change="getRegionId"
                   value-key="instanceId">
          <el-option
            v-for="item in instanceOptions"
            :key="item.id"
            :label="item.instanceName"
            :value="item">
            <span style="float: left">{{ item|instanceFilters }}</span>
            <span style="float: right; color: #8492a6; font-size: 10px;margin-left: 20px">{{ item.remark }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Group ID" prop="groupId">
        <el-input v-model.trim="groupData.groupId" :readonly="groupChecked">
          <el-button slot="append" :icon="groupChecked?'el-icon-success':'el-icon-warning'"
                     @click="handlerCheck(groupData.groupId)" :disabled="groupChecked"></el-button>
        </el-input>
        <el-alert type="warning" show-icon :closable="false" style="margin-top: 10px">
          <el-row>1. 以 “GID_”开头，只能包含大写字母、数字和下划线（_）</el-row>
          <el-row>2. 长度限制在 7~64 字符之间</el-row>
          <el-row>3. Group ID 一旦创建，则无法修改</el-row>
        </el-alert>
      </el-form-item>
      <el-form-item label="协议类型" prop="groupType">
        <el-select v-model="groupData.groupType" placeholder="消息类型" disabled>
          <el-option
            v-for="item in groupTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model.trim="groupData.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="formStatus.visible = false">取消</el-button>
      <el-button type="primary" @click="onsGroupCreate" :disabled="creating">创建</el-button>
    </div>
  </el-dialog>
</template>

<script>
// API
import { onsGroupCreate, onsGroupCheck } from '@api/cloud/aliyun.ons.group.js'

const groupData = {
  regionId: '',
  instance: '',
  groupType: 'tcp',
  groupId: 'GID_',
  remark: ''
}

export default {
  data () {
    return {
      title: '创建GroupId',
      groupData: groupData,
      instanceOptions: [],
      groupTypeOptions: [{
        value: 'tcp',
        label: 'tcp'
      }, {
        value: 'http',
        label: 'http'
      }],
      groupChecked: false,
      creating: false,
      rules: {
        groupId: [
          { required: true, message: '请输入GroupId', trigger: 'blur' },
          { min: 3, max: 64, message: '长度在 7 到 64 个字符', trigger: 'blur' }
        ],
        instance: [
          { required: true, message: '请选择MQ实例', trigger: 'change' }
        ],
        groupType: [
          { required: true, message: '请选择协议类型', trigger: 'change' }
        ],
        remark: [
          { required: true, message: '请输入备注，例如:营销促销优惠', trigger: 'blur' }
        ]
      }
    }
  },
  name: 'AliyunONSGroupDialog',
  props: ['formStatus'],
  mounted () {
  },
  filters: {
    instanceFilters (instance) {
      return instance.instanceName + '<' + instance.envName + '>'
    }
  },
  methods: {
    initData (instanceOptions) {
      this.groupData = Object.assign({}, groupData)
      this.groupChecked = false
      this.instanceOptions = instanceOptions
    },
    getRegionId (item) {
      this.groupData.regionId = item.regionId
    },
    handlerCheck (groupId) {
      if (groupId === '' || groupId === 'GID_') {
        this.$message.warning('请输入GroupId')
        return
      }
      let data = {
        instanceId: this.groupData.instance.instanceId,
        groupId: this.groupData.groupId
      }
      onsGroupCheck(data)
        .then(res => {
          this.nameCheck = res.success
          if (this.nameCheck) {
            this.$message.success('校验通过')
            this.groupChecked = true
          } else {
            this.$message.error('该实例下GroupId已存在')
          }
        })
    },
    onsGroupCreate () {
      this.$refs.groupDataForm.validate((valid) => {
        if (valid) {
          if (!this.groupChecked) {
            this.$message.warning('请先校验GroupId')
            return
          }
          this.creating = true
          let data = {
            regionId: this.groupData.regionId,
            instanceId: this.groupData.instance.instanceId,
            groupType: this.groupData.groupType,
            groupId: this.groupData.groupId,
            remark: this.groupData.remark
          }
          onsGroupCreate(data)
            .then(res => {
              this.creating = false
              this.$message.success('创建成功')
              this.formStatus.visible = false
            })
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
