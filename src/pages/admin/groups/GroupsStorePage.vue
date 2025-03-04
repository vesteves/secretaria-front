<template>
  <q-page padding>
    <div>Adicionar turma</div>

    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        v-model="start"
        label="Início"
        type="datetime-local"
      />

      <q-input
        v-model="end"
        label="Fim"
        type="datetime-local"
      />

      <q-input v-model="price" label="Preço" type="number" />

      <q-select
        v-model="course"
        :options="courses"
        label="Rounded outlined"
      />

      <q-select
        v-model="classroom"
        :options="classrooms"
        label="Sala"
      />

      <q-input v-model="teacher" label="Professor" />

      <div>
        <q-toggle
          v-model="inCompany"
          label="inCompany"
        />
      </div>

      <div>
        <label>Frequência</label>

        <q-checkbox v-model="frequency" val="domingo" label="Domingo" />
        <q-checkbox v-model="frequency" val="segunda" label="Segunda" />
        <q-checkbox v-model="frequency" val="terca" label="Terça" />
        <q-checkbox v-model="frequency" val="quarta" label="Quarta" />
        <q-checkbox v-model="frequency" val="quinta" label="Quinta" />
        <q-checkbox v-model="frequency" val="sexta" label="Sexta" />
        <q-checkbox v-model="frequency" val="sabado" label="Sábado" />
      </div>

      <div>
        <label>Modalidade</label>

        <q-checkbox v-model="modalities" val="presencial" label="Presencial" />
        <q-checkbox v-model="modalities" val="ao_vivo" label="Ao vivo" />
      </div>

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
import { store } from 'src/services/admin/groups';
import { getAll } from 'src/services/admin/courses';
import { useRouter } from 'vue-router';
import { Course } from 'src/services/admin/courses.d';
import { getAll as getAllClassrooms } from 'src/services/admin/classrooms';
import { Classroom } from 'src/services/admin/classrooms.d';

const router = useRouter();

const start = ref<string>(new Date().toString());
const end = ref<string>(new Date().toString());
const price = ref<number>(0);
const course = ref<Course | null>(null);
const courses = ref<Course[]>([]);
const frequency = ref<string[]>([])
const classroom = ref<Classroom | null>(null);
const classrooms = ref<Classroom[]>([])
const teacher = ref<string>('')
const inCompany = ref<boolean>(false)
const modalities = ref<string[]>([])

const fetchCourses = async () => {
  const result = await getAll();
  courses.value = (result.data as Course[]).map((course) => ({
    ...course,
    label: course.name,
    value: course.id,
  }));
  course.value = courses.value[0];
};

const fetchClassroomsData = async () => {
  const response = await getAllClassrooms();
  classrooms.value = response.data as Classroom[];
}

const onSubmit = async () => {
  if (!course.value) {
    return;
  }

  try {
    const result = await store({
      start: start.value,
      end: end.value,
      price: price.value,
      course_id: course.value.id,
      frequency: frequency.value,
      classroom_id: classroom.value?.id,
      teacher: teacher.value,
      inCompany: inCompany.value,
      modalities: modalities.value,
    });
    console.log(result);
    await router.push('/admin/groups');
  } catch (error: unknown) {
    console.log(error);
  }
};

const onReset = () => {
  start.value = new Date().toString();
  end.value = new Date().toString();
  price.value = 0;
  course.value = null;
  frequency.value = [];
};

onMounted(() => {
  fetchCourses();
  fetchClassroomsData();
});
</script>
