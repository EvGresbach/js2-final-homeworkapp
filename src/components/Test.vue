<template>
  <div class="my-2">
    <v-row>
      <v-col xs="12">
        {{item.description}}
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
name: "Test",
  props:{
    item: {required: true},
  }
}
</script>

<style scoped>

</style>