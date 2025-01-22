<template>
  <q-page padding>
    <div>Editar turma</div>

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

      <q-input
        v-model="price"
        label="Preço"
        type="number"
      />

      <q-input
        v-model="discount"
        label="discount"
        type="number"
      />

      <q-select
        v-model="course"
        :options="courses"
        label="Rounded outlined"
      />

      <div>
        <q-table :columns="columns" :rows="rows" row-key="name" title="Alunos">
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="name" :props="props">
                {{ props.row.name }}
              </q-td>
              <q-td key="email" :props="props">
                {{ props.row.email }}
              </q-td>
              <q-td key="phone" :props="props">
                {{ props.row.phone }}
              </q-td>
              <q-td key="subscribe" :props="props">
                <q-btn
                  color="primary"
                  label="Inscrever"
                  class="q-ml-sm"
                  @click="openConfirm(props.row.id)"
                />
              </q-td>
              <q-td key="remove" :props="props">
                <q-btn
                  color="primary"
                  label="Remover"
                  class="q-ml-sm"
                  @click="removeStudent(props.row.id)"
                />
              </q-td>
            </q-tr>
          </template>
        </q-table>
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

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">Inscrever aluno?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Sim" color="primary" @click="subscribeStudent(true)" v-close-popup />
          <q-btn flat label="Não" color="danger" @click="subscribeStudent(false)" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getById, update, subscribe } from 'src/services/admin/groups';
import { useRoute, useRouter } from 'vue-router';
import { getAll } from 'src/services/admin/courses';
import { Course } from 'src/services/admin/courses.d';
import { getAll as getAllStudents } from 'src/services/admin/students';
import { Student } from 'src/services/admin/students.d';

const start = ref<string>(new Date().toString());
const end = ref<string>(new Date().toString());
const price = ref<number>(0);
const discount = ref<number>(0);
const course = ref<Course | null>(null);
const courses = ref<Course[]>([]);
const confirm = ref<boolean>(false)
const studentSelected = ref<number | null>(null)

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

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Nome',
    field: (row: Student) => row.name,
    sortable: true,
  },
  { name: 'email', label: 'E-mail', field: 'email', sortable: true },
  {
    name: 'phone',
    label: 'Telefone',
    field: 'phone',
    sortable: true,
  },
  {
    name: 'subscribe',
    label: 'Inscrever',
    field: 'subscribe',
  },
  {
    name: 'remove',
    label: 'Remover',
    field: 'remove',
  },
];

const rows = ref<Student[]>([]);

onMounted(async () => {
  await fetchStudentsData();
});

const fetchStudentsData = async () => {
  const response = await getAllStudents();
  rows.value = response.data as Student[];
};

const openConfirm = (id: number) => {
  studentSelected.value = id
  confirm.value = true
}

const subscribeStudent = async (status: boolean) => {
  await subscribe(Number(route.params.id), {
    is_approved: status,
    student_id: studentSelected.value!,
  })

  await fetchStudentsData();
}


const removeStudent = async (id: number) => {
  // await destroy(id);
  console.log(id)
  await fetchStudentsData();
};
</script>
