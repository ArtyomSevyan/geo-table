<template>
    <v-container>
        <v-row justify="center">
            <v-col lg="8">
                <v-card>
                    <v-card-title>
                        <v-btn :to="{ name: 'DrillcoreTable' }" color="primary" class="ml-n2 mr-1" icon>
                            <v-icon>mdi-arrow-left</v-icon>
                        </v-btn>
                        {{ drillcore.drillcore }}
                    </v-card-title>

                    <v-card-text>
                        <v-row>
                            <v-col v-for="[key, value] in getObjectValues" cols="12" md="3">
                                <v-text-field :label="key" :value="value" readonly></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { mapActions, mapState } from 'vuex';

    export default {
        props: {
            id: {
                type: Number,
                default: undefined
            }
        },

        computed: {
            ...mapState({
                drillcore: state => state.drillcore.drillcore
            }),

            // Not the best choice to create another array with dada, but fastest to visualise it.
            getObjectValues() {
                return Object.entries(this.drillcore);
            }
        },

        methods: {
            ...mapActions(['fetchDrillcore'])
        },

        mounted() {
            this.fetchDrillcore(this.id);
        }
    }
</script>
