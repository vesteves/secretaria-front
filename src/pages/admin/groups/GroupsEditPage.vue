<template>
  <q-page padding>
    <div>Editar curso</div>

    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        rounded
        outlined
        v-model="start"
        label="Início"
        type="datetime-local"
      />

      <q-input
        rounded
        outlined
        v-model="end"
        label="Fim"
        type="datetime-local"
      />

      <q-input rounded outlined v-model="price" label="Preço" type="number" />

      <q-input
        rounded
        outlined
        v-model="discount"
        label="discount"
        type="number"
      />

      <q-select
        rounded
        outlined
        v-model="course"
        :options="courses"
        label="Rounded outlined"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />

        <q-btn
          color="primary"
          label="Voltar"
          to="/admin/groups"
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getById, update } from 'src/services/admin/groups';
import { useRoute, useRouter } from 'vue-router';
import { getAll } from 'src/services/admin/courses';
import { Course } from 'src/services/admin/courses.d';

const start = ref<string>(new Date().toString());
const end = ref<string>(new Date().toString());
const price = ref<number>(0);
const discount = ref<number>(0);
const course = ref<Course | null>(null);
const courses = ref<Course[]>([]);

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  await fetchCourses();
  const result = await getById(Number(route.params.id));
  start.value = result.data.start;
  end.value = result.data.end;
  price.value = result.data.price;
  discount.value = result.data.discount;
  course.value =
    (courses.value as Course[])
      .map((course) => ({
        ...course,
        label: course.name,
        value: course.id,
      }))
      .find((course) => {
        return course.id === result.data.course_id;
      }) || null;
});

const fetchCourses = async () => {
  const result = await getAll();
  courses.value = (result.data as Course[]).map((course) => ({
    ...course,
    label: course.name,
    value: course.id,
  }));
};

const onSubmit = async () => {
  if (!course.value) {
    return;
  }

  try {
    await update(Number(route.params.id), {
      start: start.value,
      end: end.value,
      price: price.value,
      discount: discount.value,
      course_id: course.value.id,
    });
    await router.push('/admin/groups');
  } catch (error: unknown) {
    console.log(error);
  }
};

const onReset = () => {
  start.value = new Date().toString();
  end.value = new Date().toString();
  price.value = 0;
  discount.value = 0;
  course.value = null;
};
</script>
