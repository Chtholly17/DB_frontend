<template>
	<div class="charge-page">
	  <h1>{{ title }}</h1>
	  <el-row>
		<el-col :span="10">
		  <div class="charge-row">
			<div class="charge-name">Electric Fee</div>
			<div class="charge-amount">{{ electricFee }}</div>
		  </div>
		  <div class="charge-row">
			<el-input v-model.number="newElectricFee" placeholder="Enter new electric fee"></el-input>
			<el-button type="primary" @click="updateElectricFee">Confirm</el-button>
		  </div>
		  
		</el-col>
		<el-col :span="10" class="charge-col">
		  <div class="charge-row">
			<div class="charge-name">Water Fee</div>
			<div class="charge-amount">{{ waterFee }}</div>
		  </div>
		  <div class="charge-row">
			<el-input v-model.number="newWaterFee" placeholder="Enter new water fee"></el-input>
			<el-button type="primary" @click="updateWaterFee">Confirm</el-button>
		  </div>
		</el-col>
	  </el-row>
	  <div style="height: 20px;"></div>
			<div class="flex justify-left" >
				<el-button type="danger" size="big" @click = "returnMain">Return</el-button>
			</div>
		<div style="height: 80px;"></div>
	</div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'
  import { ElMessage } from 'element-plus'
  import path from "@/api/path";
  import router from "@/router";
  import { useUserStore } from "@/store/modules/user";
import axios from 'axios';
  
  export default defineComponent({
	name: 'ChargePage',
	setup() {
	  const title = 'Charge'
	  const electricFee = ref(100)
	  const waterFee = ref(50)
	  const newElectricFee = ref(0)
	  const newWaterFee = ref(0)
	  const userStore = useUserStore();
	  
  
	  const updateElectricFee = () => {
		// TODO: Send newElectricFee value to server and update electricFee value
		ElMessage.success(`Added ${newElectricFee.value} to Electric fee`)
		electricFee.value = newElectricFee.value + electricFee.value

	  }
  
	  const updateWaterFee = () => {
		// TODO: Send newWaterFee value to server and update waterFee value
		ElMessage.success(`Added ${newWaterFee.value} to Water fee`)
		waterFee.value = newWaterFee.value + waterFee.value
	  }
	   //return to dashboard
	   const returnMain = () => {
           router.push({path: '/dashboard'});
	   }
  
	  onMounted(() => {
		// TODO: Retrieve electricFee and waterFee values from server and update the corresponding refs
		let idFrom = new FormData();
		idFrom.append('id', userStore.residence);
		axios.post(path.baseUrl + path.getResidenceById, idFrom).then((res) => {
			console.log(res.data)
			electricFee.value = res.data.data.electricityFee
			waterFee.value = res.data.data.waterFee
				console.log(electricFee.value)
				console.log(waterFee.value)
		}).catch(err => {
			console.log(err)
		})
	  })
  
	  return {
		title,
		electricFee,
		returnMain,
		waterFee,
		newElectricFee,
		newWaterFee,
		updateElectricFee,
		updateWaterFee
	  }
	}
  })
  </script>
  
  <style scoped>
  .charge-page {
	padding: 20px;
  }

.charge-col {
  margin-left: 40px;
}
  
  .charge-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
  }
  
  .charge-name {
	font-weight: bold;
	margin-right: 10px;
  }
  
  .charge-amount {
	font-size: 20px;
  }
  </style>