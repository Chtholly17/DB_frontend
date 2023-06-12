<template>
	<div>
		<h1 class="flex justify-center">{{ title }} </h1>
		<el-col :span="24" class="flex justify-center">
			<el-table :data="messages" style="width: 80%" >
				<el-table-column prop="name" label="Name"></el-table-column>
				<el-table-column>
				<template #default="{ row }">
					<div style="display: flex; flex-direction: row; float: right;">
					<el-button type="danger" size="small" @click="handleRefuse(row)">Refuse</el-button>
					<el-button type="primary" size="small" @click="handleAccept(row)">Accept</el-button>
					</div>
				</template>
				</el-table-column>
			</el-table>

		</el-col>
		<div style="height: 20px;"></div>
		<div class="flex justify-center" >
		<el-button type="danger" size="big" @click = "returnMain">Return</el-button>
		</div>
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
	name: 'VisitListPage',
	data() {
	  return {
		title: 'Visit Messages',
		messages: [
		]
	  }
	},
	methods: {
	  handleRefuse(row: any) {
			console.log(`Refused message from ${row.id}`)
			// update the visit status as refuse
			let From = new FormData();
			From.append('id', row.id);
			From.append('state', 'refuse');
			axios.post(path.baseUrl+ path.updateVisitState, From).then((res) => {
				console.log(res);
				// remove the row from this.messages
				for (let i = 0; i < this.messages.length; i++) {
					if (this.messages[i].id == row.id) {
						this.messages.splice(i, 1);
					}
				}
			}).catch(err => {
				console.log(err)
			})
	  },
	  handleAccept(row: any) {
			console.log(`Accepted message from ${row.id}`)
			// update the visit status as acc
			let From = new FormData();
			From.append('id', row.id);
			From.append('state', 'acc');
			axios.post(path.baseUrl+ path.updateVisitState, From).then((res) => {
				console.log(res);
				// remove the row from this.messages
				for (let i = 0; i < this.messages.length; i++) {
					if (this.messages[i].id == row.id) {
						this.messages.splice(i, 1);
					}
				}
			}).catch(err => {
				console.log(err)
			})

	  },
	  //return to dashboard
	  returnMain() {
		  router.push({path: '/dashboard'});
	  }
	},
	mounted() {
	  console.log('VisitListPage mounted')
	  const userStore = useUserStore();
		let id = userStore.id;
	  console.log(id);
	  let idFrom = new FormData();
	  idFrom.append('id', id);
		axios.post(path.baseUrl + path.getVisitById, idFrom).then((res) => {
			console.log(res.data);
			// empty this.messages, and add res.data to this.messages, each data is value of name
			this.messages = [];
			for (let i = 0; i < res.data.data.length; i++) {
				console.log(res.data[i]);
				this.messages.push({name: res.data.data[i].name, id: res.data.data[i].id});
			}
		}).catch(err => {
			console.log(err)
		})
	}
  }
  </script>