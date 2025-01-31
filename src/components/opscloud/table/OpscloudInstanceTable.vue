<template>
  <div>
    <el-row style="margin-bottom: 5px" :gutter="24">
      <el-button @click="fetchData" style="margin-left: 15px">查询</el-button>
    </el-row>
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column prop="name" label="实例名称"></el-table-column>
      <el-table-column prop="hostname" label="主机名"></el-table-column>
      <el-table-column prop="hostIp" label="注册ip"></el-table-column>
      <el-table-column prop="isActive" label="Valid">
        <template slot-scope="props">
          <el-tag disable-transitions :type="props.row.isActive ? 'success' : 'info'">
            {{props.row.isActive ? 'Valid':'Invalid'}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="comment" label="描述"></el-table-column>
      <el-table-column fixed="right" label="操作" width="380">
        <template slot-scope="scope">
          <el-button :type="scope.row.isActive ?  'info': 'success'" plain size="mini"
                     @click="handlerRowSetActive(scope.row)">{{scope.row.isActive ? 'Invalid':'Valid'}}</el-button>
          <el-button type="danger" plain size="mini" @click="handlerRowDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background @current-change="paginationCurrentChange"
                   :page-sizes="[10, 15, 20, 25, 30]" @size-change="handleSizeChange"
                   layout="sizes, prev, pager, next" :total="pagination.total" :current-page="pagination.currentPage"
                   :page-size="pagination.pageSize">
    </el-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

// API
import { queryOpscloudInstancePage, delOpscloudInstanceById, setOpscloudInstanceActive } from '@api/opscloud/opscloud.instance.js'

export default {
  name: 'OpscloudInstanceTable',
  data () {
    return {
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
  computed: {
    ...mapState('d2admin/user', [
      'info'
    ])
  },
  mounted () {
    this.initPageSize()
    this.fetchData()
  },
  components: {
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
    initPageSize () {
      if (typeof (this.info.pageSize) !== 'undefined') {
        this.pagination.pageSize = this.info.pageSize
      }
    },
    handlerRowSetActive (row) {
      setOpscloudInstanceActive(row.id).then(res => {
        this.fetchData()
        this.$message({
          type: 'success',
          message: '设置成功!'
        })
      })
    },
    handlerRowDel (row) {
      this.$confirm('此操作将删除当前配置?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delOpscloudInstanceById(row.id).then(res => {
          this.fetchData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
    },
    fetchData () {
      this.loading = true
      let requestBody = {
        'page': this.pagination.currentPage,
        'length': this.pagination.pageSize
      }
      queryOpscloudInstancePage(requestBody)
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
</style>
