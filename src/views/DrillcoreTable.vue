<template>
    <v-container>
        <v-card flat>
            <v-row>
                <v-spacer></v-spacer>
                <v-col cols="12" sm="6" lg="3">
                    <v-select
                            v-model="selectedHeaders"
                            :items="tableHeaders"
                            label="Select columns to show"
                            return-object
                            dense
                            outlined
                            multiple
                    >
                        <template v-slot:selection="{ item, index }">
                            <v-chip small v-if="index < 3">
                                <span>{{ item.text }}</span>
                            </v-chip>
                            <span v-if="index === 3" class="grey--text caption">(+{{ selectedHeaders.length - 3 }} others)</span>
                        </template>
                    </v-select>
                </v-col>
            </v-row>
            <v-card-title>
                <v-row justify="center">
                    <v-col cols="12" lg="1">
                        <span class="text-h5">Filters:</span>
                    </v-col>
                    <v-col cols="12" sm="6" lg="2">
                        <v-text-field
                                v-model="filters.drillcore__icontains"
                                label="Drillcore"
                                clearable
                                outlined
                                dense
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" lg="2">
                        <v-text-field
                                v-model="filters.locality__country__value__icontains"
                                label="Locality country"
                                clearable
                                outlined
                                dense
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" lg="2">
                        <v-text-field
                                v-model="filters.storage__location__icontains"
                                label="Storage location"
                                clearable
                                outlined
                                dense
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" lg="2">
                        <v-text-field
                                v-model="filters.depository__value__icontains"
                                label="Depository"
                                clearable
                                outlined
                                dense
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" lg="2">
                        <v-text-field
                                v-model="filters.boxes__range"
                                label="Range of boxes"
                                placeholder="E.g. 1,10"
                                clearable
                                outlined
                                dense
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-card-title>

            <v-card-text>
                <v-data-table
                        :headers="headers"
                        :items="drillcoreData"
                        item-key="id"
                        :server-items-length="drillcoreTotal"
                        :items-per-page="30"
                        :options.sync="tableOptions"
                        :footer-props="{ itemsPerPageOptions: [30, 50, 100, 150] }"
                        disable-sort
                        @click:row="test"
                >

                </v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    import { mapState, mapActions } from 'vuex';

    export default {
        data: () => ({
            tableHeaders: [
                { text: 'drillcore', align: 'center', value: 'drillcore' },
                { text: 'country', align: 'center', value: 'locality__country__value' },
                { text: 'country_en', align: 'center', value: 'locality__country__value_en' },
                { text: 'country_iso_code', align: 'center', value: 'locality__country__iso_code' },
                { text: 'latitude', align: 'center', value: 'locality__latitude' },
                { text: 'longitude', align: 'center', value: 'locality__longitude' },
                { text: 'locality__depth', align: 'center', value: 'locality__depth' },
                { text: 'depth', align: 'center', value: 'depth' },
                { text: 'boxes', align: 'center', value: 'boxes' },
                { text: 'box_numbers', align: 'center', value: 'box_numbers' },
                { text: 'storage__location', align: 'center', value: 'storage__location' },
                { text: 'locality_id', align: 'center', value: 'locality_id' },
                { text: 'drillcore_en', align: 'center', value: 'drillcore_en' },
                { text: 'depository__value', align: 'center', value: 'depository__value' },
                { text: 'depository__value_en', align: 'center', value: 'depository__value_en' },
                { text: 'number_meters', align: 'center', value: 'number_meters' },
                { text: 'year', align: 'center', value: 'year' },
                { text: 'remarks', align: 'center', value: 'remarks' },
                { text: 'agent__agent', align: 'center', value: 'agent__agent' },
                { text: 'database__acronym', align: 'center', value: 'database__acronym' },
                { text: 'locality__maaamet_pa_id', align: 'center', value: 'locality__maaamet_pa_id' },
                { text: 'locality__locality', align: 'center', value: 'locality__locality' },
                { text: 'locality__locality_en', align: 'center', value: 'locality__locality_en' }
            ],
            selectedHeaders: {},
            tableOptions: {},

            filters: {
                drillcore__icontains: null,
                locality__country__value__icontains: null,
                storage__location__icontains: null,
                depository__value__icontains: null,
                boxes__range: null
            }
        }),

        computed: {
            ...mapState({
                drillcoreData: state => state.drillcore.drillcoreData,
                drillcoreTotal: state => state.drillcore.drillcoreTotal
            }),

            headers() {
                return this.tableHeaders.filter(item => this.selectedHeaders.includes(item))
            }
        },

        watch: {
            tableOptions: {
                handler() {
                    this.fetchDrillcoredataWithPagination();
                },
                deep: true
            },

            filters: {
                handler() {
                    this.fetchDrillcoredataWithPagination();
                    console.log(this.filters)
                },
                deep: true
            }
        },

        methods: {
            ...mapActions(['fetchDrillcoreData']),

            fetchDrillcoredataWithPagination() {
                this.fetchDrillcoreData({
                    page: this.tableOptions.page,
                    size: this.tableOptions.itemsPerPage,
                    filters: this.filters
                })
            },

            test(value) {
                this.$router.push({ name: 'drillcoreItem', params: { id: value.id } })
            }
        },

        created() {
            this.selectedHeaders = this.tableHeaders;
        }
    }
</script>

<style>
    tr {
        cursor: pointer;
    }
</style>
