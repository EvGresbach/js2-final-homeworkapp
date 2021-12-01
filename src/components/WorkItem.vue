<template>
  <div>
    <v-expansion-panels focusable>
      <v-expansion-panel class="ma-1">
        <v-expansion-panel-header>
          <div class="row">
            <div class="col col-xs-12 col-sm-6">{{item.name}}</div>
            <div class="col col-xs-12 col-sm-3">
              {{item.time}}
            </div>
            <div class="col col-xs-12 col-sm-2">
              {{item.formatDate()}}
            </div>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <component :is="itemType" :item="item"></component>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

  </div>
</template>

<script>
import Assignment from "@/components/Assignment";

export default {
name: "WorkItem",
  props:{
    item: {required: true,}
  },
  components:{
    Assignment,

  },
  computed: {
    itemType(){
      return this.item.constructor.name;
    }
  },
}
</script>

<style scoped>

div.v-list-item.theme--light div{
  width: 100%;
}
div.v-expansion-panel button:hover{
  background-color: lightgrey;
}
</style>