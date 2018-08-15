<template>
	<v-container>
		<v-card style="padding: 2%; height: 842px; width:595px;">
			<div style="border:2px solid black;">
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
					<!-- <hr/> -->

				</v-layout>
			</v-card-title>

			<v-layout row style="border: 1px solid black; border-left:none;border-right:none; ">
				<v-flex xs6 style="text-align: justify;-moz-text-align-last: center; text-align-last: center;">
					<span style="font-size:17px; ">
						<b>Invoice number: </b> 1010
					</span> 	<br/>
				</v-flex>
				<v-flex xs6 style="text-align: justify;-moz-text-align-last: center; text-align-last: center;">
					<span style="font-size:17px; text-align: justify;-moz-text-align-last: center;text-align-last: center;">
						<b>Date: </b> 14/5/2018
					</span>
				</v-flex>
			</v-layout>

			<v-layout row justify-center style="border: 1px solid black; border-top: none;border-left:none;border-right:none;">
					
					<v-flex xs6 justify-center style="border-right:1px solid black; text-align: justify;-moz-text-align-last: center;text-align-last: center;">
						<div >
							<h3>Customer Name</h3>
							<p>
								Addressline1,<br/>
								Addressline2,<br/>
								Ahmedabad,<br/>
								Gujarat - 380001 <br/>
								Contact No: 123456789<br/>
								GST No: 123456789 <br/>
							</p>
						</div>
					</v-flex>
					<v-flex xs6 justify-center>
						<div style="text-align: justify; -moz-text-align-last: center; text-align-last: center;">
							<h3>Site Name</h3>
							<p>
								Addressline1,<br/>
								Addressline2,<br/>
								Ahmedabad,<br/>
								Gujarat - 380001 <br/>
								Contact No: 123456789<br/>
								GST No: 123456789 <br/>
							</p>
						</div>
					</v-flex>
			</v-layout>
			<v-data-table
				:headers="headers"
				:items="items"
				hide-actions	>
				<template slot="headers" slot-scope="headers" style="border-bottom: 1px solid black;">
					<th style="border-right:1px solid black; border-bottom: 1px solid black; font-color: black; font-weight:bold; "><b>Description</b></th>
					<th style="border-right:1px solid black;border-bottom: 1px solid black;  font-weight:bold;" >Quantity</th>
					<th style="border-right:1px solid black; border-bottom: 1px solid black;  font-weight:bold;">Rate</th>
					<th style="border-right:1px solid black; border-bottom: 1px solid black; font-weight:bold;">Days</th>
					<th style="border-bottom: 1px solid black; font-weight:bold;">Total</th>
				</template>
				<template slot="items" slot-scope="props">
				<td style="border-right:1px solid black; border-bottom: 1px solid black;" class="text-xs-center">{{ props.item.item_name }} {{ props.item.subitem_name }}</td>
				<td style="border-right:1px solid black; border-bottom: 1px solid black;"  class="text-xs-center">{{ props.item.quantity }}</td>
				<td style="border-right:1px solid black; border-bottom: 1px solid black;"  class="text-xs-center">{{ props.item.rate }}</td>
				<td style="border-right:1px solid black; border-bottom: 1px solid black;"  class="text-xs-center">{{ props.item.days }}</td>
				<td style="border-bottom: 1px solid black;"  class="text-xs-center">{{ props.item.total }}</td>
				</template>
			</v-data-table>

			<v-layout column>
				<v-flex xs2 offset-xs10 pl-4 style="border-bottom:1px solid black; border-left:1px solid black;">
					<p>Subtotal: Rs.1000</p>
					<p>CGST: Rs.25</p>
					<p>SGST: Rs.25</p>
					<p>Total: Rs.1050 </p>
				</v-flex>
			</v-layout>

			</div>
		</v-card>
	</v-container>
</template>


<script>
export default {
	data:()=>({
		headers:[
			{
            text: 'Item',
            sortable: false,
        },
        {
            text: 'Sub Item',
            sortable: false,
        },
        {
            text: 'Quantity',
            sortable: false
        },
        {
            text: 'Rate',
            sortable: false
		},
		{
			text:'Days',
			sortable:false
		},
		{
			text:'Total',
			sortable:false
		}
		],
		items:[
			{item_name:"Test",subitem_name:"subitem",quantity:10,rate:10,days:10,total:1000}
		]
	})
}
</script>



<style scoped>

</style>


