<template>
  <q-page padding>
    <div v-html="content"></div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getById } from 'src/services/admin/contracts';
import { useRoute } from 'vue-router';

const content = ref<string>('');

const route = useRoute();

onMounted(async () => {
  const result = await getById(Number(route.params.id));
  content.value = result.data.content;
});

</script>
