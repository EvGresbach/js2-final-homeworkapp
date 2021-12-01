<template>
  <div>
    <h2>{{userClass.name}}</h2>
  <!--  TODO: work-list here  -->
    <work-list :authUser="authUser" :userClass="userClass"></work-list>
<!--    <v-btn @click="test">Testing</v-btn>-->
  </div>
</template>

<script>
import WorkList from "@/components/WorkList";

export default {
  name: "Class",
  components:{
    WorkList,
  },
  props: {
    authUser: {
      required: true,
    },
    userClass: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>

</style>