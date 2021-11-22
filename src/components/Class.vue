<template>
  <div>
    <h2>{{cClass.name}}</h2>
    <v-list></v-list>
  </div>
</template>

<script>

import Class from "@/models/Class";

export default {
  name: "Class",
  props: {
    cClass: {
      type: Class,
      required: true,
    }
  },

  methods:{

  }
}
</script>

<style scoped>

</style>