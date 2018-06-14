<template>
    <v-container>
        <v-navigation-drawer right clipped floating app class="blue-grey darken-3 hidden-xs-only" dark>
			<v-list>
				<v-list-tile @click="displayRents(0)">
					<v-list-tile-content>
						All Companies
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile v-for="company in Companies" :key="company.id" @click="displayRents(company)">
					<v-list-tile-content>
						<v-list-tile-title>{{ company.name }}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>

        <v-container v-if="Dispatches.length>0">
				<v-container>
					<v-flex xs12>
						<v-card>
							<v-card-title style="background-color:#1976d2; color:#fff" class="title">
								Rents : {{selectedCompany.name}}
								<v-spacer></v-spacer>
								<v-flex xs6 md4>
									<v-text-field append-icon="search" label="Search" single-line hide-details v-model="itemSearch" solo light></v-text-field>
								</v-flex>
									<v-btn @click.native="$router.push('rent/add')" fab color="pink"><v-icon>add</v-icon></v-btn>
							</v-card-title>
							<v-data-table :headers="headers" :items="Dispatches" :search="itemSearch" light :rows-per-page-items="[10,20,30,{'text':'All','value':-1}]">
								<template slot="items" slot-scope="props">
									<td v-on:click="itemSelected(props.item)">{{ props.index + 1 }}</td>
									<td v-on:click="itemSelected(props.item)">{{ props.item.invoice_no }}</td>
									<td v-on:click="itemSelected(props.item)">{{ props.item.customer_name }}</td>
									<td v-on:click="itemSelected(props.item)">{{ props.item.site_name }}</td>
									<td v-on:click="itemSelected(props.item)">{{ formatDate(props.item.dispatchDate)}}</td>
									<td v-on:click="itemSelected(props.item)">{{ props.item.total }}</td>

								</template>

								<v-alert slot="no-results" :value="true" color="error" icon="warning">
									Your search for "{{ itemSearch }}" found no results.
								</v-alert>
							</v-data-table>

						</v-card>
					</v-flex>
				</v-container>
			</v-container>
    </v-container>
</template>

<script>
export default {
    
}
</script>
