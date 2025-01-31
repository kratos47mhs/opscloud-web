<template>
  <div>
    <div style="margin-bottom: 5px">
      <el-row :gutter="24" style="margin-bottom: 5px">
        <el-input v-model="queryParam.queryName" placeholder="输入关键字模糊查询" class="input"/>
        <el-button @click="fetchData" style="margin-left: 5px">查询</el-button>
      </el-row>
    </div>
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="姓名" v-if="props.row.name != null && props.row.name != ''">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="电话" v-if="props.row.phone != null && props.row.phone != ''">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="微信" v-if="props.row.wechat != null && props.row.wechat != ''">
              <span>{{ props.row.wechat }}</span>
            </el-form-item>
            <el-form-item label="数据源" v-if="props.row.source != null && props.row.source != ''">
              <span>{{ props.row.source }}</span>
            </el-form-item>
            <el-form-item label="用户组">
              <div class="tag-group">
                <el-tag style="margin-right: 5px"
                        v-for="item in props.row.userGroups"
                        :key="item.id">{{ item.name }}
                </el-tag>
              </div>
            </el-form-item>
            <el-form-item label="Server group">
              <div class="tag-group">
                <el-tag style="margin-right: 5px"
                        v-for="item in props.row.serverGroups"
                        :key="item.id">{{ item.name }}
                </el-tag>
              </div>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="点击查看用户详情" placement="right">
            <el-button type="text" @click="openUserDetail(scope.row.username)">{{ scope.row.username }}</el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="点击复制" placement="right">
              <span v-clipboard:copy="scope.row.username" v-clipboard:success="onCopy"
                    v-clipboard:error="onError">
                <i style="margin-left: 5px" class="el-icon-copy-document"></i>
              </span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="displayName" label="显示名">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="点击复制" placement="right">
              <span v-clipboard:copy="scope.row.displayName" v-clipboard:success="onCopy"
                    v-clipboard:error="onError">{{ scope.row.displayName }}
                <i style="margin-left: 5px" class="el-icon-copy-document"></i>
              </span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="userGroups.length" label="用户组"></el-table-column>
      <el-table-column prop="serverGroups.length" label="Server group"></el-table-column>
      <el-table-column prop="ramUsers.length" label="阿里云RAM账户"></el-table-column>
      <el-table-column prop="lastLogin" label="最后登录时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" @click="reinstatedUser(scope.row)">复职</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background @current-change="paginationCurrentChange" :page-sizes="[10, 15, 20, 25, 30]"
                   @size-change="handleSizeChange"
                   layout="sizes, prev, pager, next" :total="pagination.total" :current-page="pagination.currentPage"
                   :page-size="pagination.pageSize">
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
// API
import { fuzzyQueryUserPage, beReinstatedUser } from '@api/user/user'
import util from '@/libs/util'

export default {
  data () {
    return {
      user: {},
      tableData: [],
      options: {
        stripe: true
      },
      loading: false,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      queryParam: {
        queryName: ''
      }
    }
  },
  name: 'UserRetiredTable',
  computed: {
    ...mapState('d2admin/user', [
      'info'
    ])
  },
  mounted () {
    this.initPageSize()
    this.fetchData()
  },
  methods: {
    ...mapActions({
      setPageSize: 'd2admin/user/set'
    }),
    handleSizeChange (size) {
      this.pagination.pageSize = size
      this.info.pageSize = size
      this.setPageSize(this.info)
      this.fetchData()
    },
    openUserDetail (username) {
      let host = window.location.host
      let httpProtocol = window.location.href.split('://')[0]
      let buildDetailsUrl = httpProtocol + '://' + host + '/#/user/detail/other?username=' + username
      util.open(buildDetailsUrl)
    },
    onCopy (e) {
      this.$message.success('内容已复制到剪切板！')
    },
    onError (e) {
      this.$message.error('抱歉，复制失败！')
    },
    initPageSize () {
      if (typeof (this.info.pageSize) !== 'undefined') {
        this.pagination.pageSize = this.info.pageSize
      }
    },
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
    },
    reinstatedUser (row) {
      this.$confirm('确认用户复职操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        beReinstatedUser(row.id).then(res => {
          this.fetchData()
          this.$message({
            type: 'success',
            message: '复职成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    fetchData () {
      this.loading = true
      let requestBody = {
        'queryName': this.queryParam.queryName,
        'extend': 1,
        'isActive': false,
        'page': this.pagination.currentPage,
        'length': this.pagination.pageSize
      }
      fuzzyQueryUserPage(requestBody)
        .then(res => {
          this.tableData = res.body.data
          this.pagination.total = res.body.totalNum
          this.loading = false
        })
    }
  }
}
</script>

<style scoped>
.input {
  display: inline-block;
  max-width: 200px;
  margin-left: 15px
}

.table-expand {
  font-size: 0;
}

.table-expand label {
  width: 150px;
  color: #99a9bf;
}

.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>
