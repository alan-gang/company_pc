推广链接管理
<template>
  <div class="group-page">
    <slot name="cover" />
    <slot name="movebar" />
    <slot name="resize-x" />
    <slot name="resize-y" />
    <slot name="toolbar" />
    <div class="link_admin scroll-content">
      <div class="bgc-w mg_20 pd_20">
        <p class="opencout">开户总计：总点击 {{totalOpenNumber}} 次 总注册 {{totalRegistNumber}} 人</p>
        <div class="mytable">
          <el-table
            :data="data"
            :summary-method="getSummaries"
            stripe
            ref="table"
            show-summary
            class="header-bold nopadding"
          >
            <el-table-column label="生成时间" prop="createTime"></el-table-column>
            <el-table-column label="返点/返水" min-width=" 100 ">
              <template scope="scope">
                <template v-for="v in JSON.parse(scope.row.pointArr)">
                  <div :key="v">{{v}}</div>
                </template>
              </template>
            </el-table-column>
            <el-table-column label="注册人数" prop="registNumber"></el-table-column>
            <el-table-column label="点击次数" prop="openNumber"></el-table-column>
            <el-table-column label="链接地址" prop="time" min-width=" 100 ">
              <template scope="scope">
                <input :value="scope.row.line" class="ds-input" style="width:130px;" readonly />
                <span
                  v-clipboard:copy=" scope.row.line "
                  v-clipboard:success="copySuccess"
                  v-clipboard:error="copyError"
                  class="ds-button text-button blue"
                  style="padding: 0 10px;"
                >复制</span>
              </template>
            </el-table-column>
            <el-table-column label="链接备注" prop="lineRemards"></el-table-column>
            <el-table-column label="联系方式">
              <template scope="scope">
                <div v-if="scope.row.phone">手机：{{scope.row.phone}}</div>
                <div v-if="scope.row.qq">QQ：{{scope.row.qq}}</div>
                <div v-if="scope.row.weChant">微信：{{scope.row.weChant}}</div>
              </template>
            </el-table-column>
            <el-table-column label="状态">
              <template scope="scope">
                <div v-if="scope.row.lineStatus==1" style="color:#008000">使用中</div>
                <div v-if="scope.row.lineStatus==2">已停用</div>
                <div v-if="scope.row.lineStatus==3">已删除</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template scope="scope">
                <el-button
                  v-if="scope.row.lineStatus==1"
                  @click="click_stop(scope.row)"
                  type="text"
                  size="small"
                >停用</el-button>
                <el-button
                  v-if="scope.row.lineStatus==2"
                  @click="click_del(scope.row)"
                  type="text"
                  size="small"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            v-if=" total > pageSize "
            v-on:current-change="pageChanged"
            :total="total"
            :page-size="pageSize"
            :page-sizes="[5, 10, 15, 20]"
            :current-page="currentPage"
            small
            layout="prev, pager, next, total"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/http/api";
import { MessageBox } from "element-ui";

export default {
  data() {
    return {
      totalRegistNumber: "-",
      totalOpenNumber: "-",
      data: [],
      pageSize: 20,
      total: 99,
      currentPage: 1,
      preOptions: {}
    };
  },
  computed: {},
  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "本页合计";
          return;
        }
        if (index === 2) {
          sums[index] = this.totalRegistNumber;
          return;
        }
        if (index === 3) {
          sums[index] = this.totalOpenNumber;
          return;
        }
      });
      return sums;
    },
    copySuccess() {
      this.$message({
        type: "success",
        message: "复制成功"
      });
    },
    copyError() {
      this.$message({
        type: "warning",
        message: "复制失败!"
      });
    },
    click_stop(row) {
      MessageBox.confirm("此操作将停用该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.get_updateStatus(row, 1, () => {
            this.$message({
              type: "success",
              message: "停用成功!"
            });
            this.get_list();
          });
        })
        .catch(() => {
          //已取消
        });
    },
    click_del(row) {
      MessageBox.confirm("此操作将删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.get_updateStatus(row, 2, () => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.get_list();
          });
        })
        .catch(() => {
          //已取消
        });
    },
    get_updateStatus(row, val, fn) {
      let loading = this.$loading(
        {
          text: "加载中...",
          target: this.$refs["table"].$el
        },
        10000,
        "加载超时..."
      );
      this.$http
        .post(api.updateRegistLinesStatus, {
          entry: row.entry,
          // 更新类别，1:使用中更新为已停用;2:已停用更新为已删除
          lineStatus: val
        })
        .then(
          ({ data }) => {
            if (data.success === 1) {
              typeof fn === "function" && fn();
              !fn && (this.currentPage = 1);
            } else loading.text = "加载失败!";
          },
          rep => {
            // error
          }
        )
        .finally(() => {
          setTimeout(() => {
            loading.close();
          }, 100);
        });
    },
    get_list(id, page, fn) {
      let loading = this.$loading(
        {
          text: "加载中...",
          target: this.$refs["table"].$el
        },
        10000,
        "加载超时..."
      );

      if (!fn) {
        this.preOptions = {
          page: 1,
          pageSize: this.pageSize
        };
      } else {
        this.preOptions.page = page;
      }
      this.$http
        .post(api.queryRegistLines, this.preOptions)
        .then(
          ({ data }) => {
            if (data.success === 1) {
              this.totalRegistNumber = data.totalRegistNumber;
              this.totalOpenNumber = data.totalOpenNumber;
              this.totalRegistNumber = data.totalRegistNumber;
              this.totalOpenNumber = data.totalOpenNumber;
              this.data = data.list;
              this.total = data.totalSize;
              typeof fn === "function" && fn();
              !fn && (this.currentPage = 1);
            } else loading.text = "加载失败!";
          },
          rep => {
            // error
          }
        )
        .finally(() => {
          setTimeout(() => {
            loading.close();
          }, 100);
        });
    },
    pageChanged(cp) {
      this.get_list("", cp, () => {
        this.currentPage = cp;
      });
    }
  },
  mounted() {
    this.get_list();
  }
};
</script>
<style lang="less">
.link_admin {
  .opencout {
    margin: 0.2rem 0;
  }

  //   .link {
  //     max-width: 100%;
  //     white-space: nowrap;
  //     overflow: hidden;
  //     text-overflow: ellipsis;
  //     display: inline-block;
  //   }
}
</style>
