<template>
  <div>
    <h2>{{userClass.name}}</h2>
    <v-list></v-list>
  </div>
</template>

<script>


export default {
  name: "Class",
  props: {
    userClass: {
      type: Object,
      required: true,
    }
  },

  methods:{

  }
}
</script>

<style scoped>

</style>