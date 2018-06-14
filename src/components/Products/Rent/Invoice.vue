<template>
	<v-container>
		<v-card style="padding: 2%;">
			<v-container style="border:2px solid black;">
			<v-card-title>
				<v-layout column>
					<h2>Company Name</h2>
					<p>
						Addressline1,<br/>
						Addressline2,<br/>
						Ahmedabad,<br/>
						Gujarat - 380001 <br/>
						Contact No: 123456789<br/>
						GST No: 123456789 <br/>
						
					</p>
					<hr/>

				</v-layout>
			</v-card-title>

			<v-layout row wrap>
					
					<v-flex xs4 md2 ml-3>
							<h3>Customer Name</h3>
							<p>
								Addressline1,<br/>
								Addressline2,<br/>
								Ahmedabad,<br/>
								Gujarat - 380001 <br/>
								Contact No: 123456789<br/>
								GST No: 123456789 <br/>
							</p>
					</v-flex>
					<v-flex xs4 md2>
							<h3>Site Name</h3>
							<p>
								Addressline1,<br/>
								Addressline2,<br/>
								Ahmedabad,<br/>
								Gujarat - 380001 <br/>
								Contact No: 123456789<br/>
								GST No: 123456789 <br/>
							</p>
					</v-flex>
					<v-flex xs4 md2 offset-md5 style="margin-left:auto">
						<span style="font-size:17px"><b>Invoice number: </b> 1010</span><br/>
						<span style="font-size:17px"><b>Date: </b> 14/5/2018</span>
					</v-flex>
			</v-layout>
			<v-data-table
				:headers="headers"
				:items="desserts"
				hide-actions
				class="elevation-1"	>
				<template slot="items" slot-scope="props">
				<td>{{ props.item.name }}</td>
				<td class="text-xs-right">{{ props.item.calories }}</td>
				<td class="text-xs-right">{{ props.item.fat }}</td>
				<td class="text-xs-right">{{ props.item.carbs }}</td>
				<td class="text-xs-right">{{ props.item.protein }}</td>
				<td class="text-xs-right">{{ props.item.iron }}</td>
				</template>
			</v-data-table>
			</v-container>
		</v-card>
	</v-container>
</template>

<style scoped>

</style>
