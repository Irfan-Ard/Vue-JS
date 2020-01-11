<template>
    <div class="main">
        <v-container>
            <v-row>
                <v-col cols="4">
                    <v-card class="indigo darken-1" router to="/money">
                        <v-card-title class="display-1 white--text">Money Manager</v-card-title>
                        <v-card-subtitle class="white--text">Manage money with your own style, we'll take care all about configuration</v-card-subtitle>
                        <v-card-actions>
                            <v-btn class="white--text" text>Manage</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="4">
                    <v-card class="deep-purple darken-1">
                        <v-card-title class="display-1 white--text">Task & Schedule</v-card-title>
                        <v-card-subtitle class="white--text">Did you ever forgot something?, open this</v-card-subtitle>
                        <v-card-actions><v-btn class="white--text" text>Open Task</v-btn></v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="4">
                    <v-card class="blue darken-1">
                        <v-card-title class="display-1 white--text">Money Manager</v-card-title>
                        <v-card-subtitle class="white--text">Manage money with your own style, we'll take care all about configuration</v-card-subtitle>
                        <v-card-actions><v-btn class="white--text" text>Manage</v-btn></v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>