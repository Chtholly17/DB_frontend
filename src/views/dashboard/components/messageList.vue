<template>
    <div>
      <h1 class="flex justify-center">{{ title }}</h1>
      <el-col :span="24" class="flex justify-center">
        <el-table :data="messages" style="width: 80%">
          <el-table-column prop="content" label="Message">
            <template #default="{ row }">
              <div class="message-row" :class="{ expanded: row.expanded }">
                <div class="message-content" :title="row.content">
                  {{ row.expanded ? row.content : row.content.substring(0, 50) }}{{ row.content.length > 50 && !row.expanded ? '...' : '' }}
                </div>
                <div class="message-actions">
                  <span class="expand" v-if="!row.expanded" @click="expandRow(row)">
                    Expand
                    <i class="el-icon-arrow-left"></i>
                  </span>
                  <span class="fold" v-if="row.expanded" @click="foldRow(row)">
                    Fold
                    <i class="el-icon-arrow-down"></i>
                  </span>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
        <div style="height: 20px;"></div>
        <div class="flex justify-center" >
            <el-button type="danger" size="big" @click = "returnMain">Return</el-button>
        </div>
        <div style="height: 80px;"></div>
    </div>
  </template>
  
  <script lang="ts">
  import { ref, onMounted } from 'vue'
  import axios from "axios";
  import router from "@/router";
  import path from "@/api/path";
  import { useUserStore } from "@/store/modules/user";
  import {data} from "autoprefixer";
  
  export default {
    name: 'MessageListPage',
    data() {
      return {
        title: 'Messages',
        messages: [
          { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', expanded: false },
          { content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', expanded: false },
          { content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', expanded: false },
          { content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', expanded: false },
          { content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', expanded: false }
        ]
      }
    },
    methods: {
      expandRow(row: any) {
        row.expanded = true;
      },
      foldRow(row: any) {
        row.expanded = false;
      },
    //return to dashboard
      returnMain() {
           router.push({path: '/dashboard'});
	  	}
    },

		mounted() {
			let data = new FormData();
			axios.post(path.baseUrl + path.getAllMessage, data).then((response) => {
				console.log(response.data.data);
				// empty the messages array, add the new messages
				this.messages = [];
				for (let i = 0; i < response.data.data.length; i++) {
					this.messages.push({content: response.data.data[i], expanded: false});
				}
			}).catch((error) => {
				console.log(error);
			})
		}
  }
  </script>
  
  <style scoped>
  .message-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ebeef5;
  }
  
  .message-row.expanded {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .message-content {
    flex: 1;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  
  .message-actions {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  
  .message-actions span {
    cursor: pointer;
    margin-left: 10px;
  }
  
  .message-actions i {
    margin-left: 5px;
  }
  </style>