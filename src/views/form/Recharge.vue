// 充提统计
<template lang="jade">
	.group-page
		slot(name='cover')
		slot(name='movebar')
		slot(name='resize-x')
		slot(name='resize-y')
		slot(name='toolbar')
		.stock-list.scroll-content
			.form.form-filters.my-el
				| 时间&nbsp;&nbsp; 
				el-date-picker(
					v-model='stEt'
					format='yyyy-MM-dd'
					type='daterange'
					placeholder='选择日期范围'
					:clearable='clearableOnTime'
					:picker-options="pickerOptions"
				)
				| &nbsp;&nbsp;
</template>

<script>
import setTableMaxHeight from "@/components/setTableMaxHeight"
export default {
  data () {
		return {
			pickerOptions: {
				disabledDate (time) {
					return time.getTime() < new Date()
				}
			},
			stEt: [new Date(), new Date()],
			clearableOnTime: false
		}
	}
}
</script>

<style lang="stylus" scoped>
    
</style>