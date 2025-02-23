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
        mask="#,##"
        reverse-fill-mask
      />

      <q-select
        v-model="course"
        :options="courses"
        label="Curso"
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

      <q-checkbox v-model="frequency" val="domingo" label="Domingo" />
      <q-checkbox v-model="frequency" val="segunda" label="Segunda" />
      <q-checkbox v-model="frequency" val="terca" label="Terça" />
      <q-checkbox v-model="frequency" val="quarta" label="Quarta" />
      <q-checkbox v-model="frequency" val="quinta" label="Quinta" />
      <q-checkbox v-model="frequency" val="sexta" label="Sexta" />
      <q-checkbox v-model="frequency" val="sabado" label="Sábado" />

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
              <q-td key="status" :props="props">
                {{ props.row.groups[0].pivot.status }}
              </q-td>
              <q-td key="price" :props="props">
                R$ {{ (props.row.groups[0].pivot.price / 100).toFixed(2) }}
              </q-td>
              <q-td key="presubscribeConfirm" :props="props">
                <q-btn
                  color="primary"
                  label="Ativar"
                  class="q-ml-sm"
                  @click="openPresubscribeConfirm(props.row.id)"
                />
              </q-td>
              <q-td key="paymentConfirm" :props="props">
                <q-btn
                  color="primary"
                  label="Ativar"
                  class="q-ml-sm"
                  @click="openPaymentConfirm(props.row.id)"
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

    <q-dialog v-model="confirmPresubscribe" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">Enviar dados de pagamento para aluno?</span>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="studentPrice"
            mask="#,##"
            reverse-fill-mask
            label="Preço"
          />

          <q-input
            type="textarea"
            v-model="paymentLink"
            label="Link para pagamento"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Sim" color="primary" @click="changeStatus(StudentStatus.PAYMENTSENT)" v-close-popup />
          <q-btn flat label="Remover Inscrição" color="danger" @click="changeStatus(StudentStatus.UNSUBSCRIBED)" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirmPayment" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">Confirmar pagamento do aluno?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Sim" color="primary" @click="changeStatus(StudentStatus.SUBSCRIBED)" v-close-popup />
          <q-btn flat label="Pré Inscrever" color="danger" @click="changeStatus(StudentStatus.PRESUBSCRIBED)" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getById, update, changeStudentStatus } from 'src/services/admin/groups';
import { getAll as getAllClassrooms } from 'src/services/admin/classrooms';
import { useRoute, useRouter } from 'vue-router';
import { getAll } from 'src/services/admin/courses';
import { Course } from 'src/services/admin/courses.d';
import { getAll as getAllStudents } from 'src/services/admin/students';
import { Student, StudentQueryParams, StudentStatus } from 'src/services/admin/students.d';
import { StatusData } from 'src/services/admin/groups.d';
import { Classroom } from 'src/services/admin/classrooms.d';

const start = ref<string>(new Date().toString());
const end = ref<string>(new Date().toString());
const price = ref<string>('');
const course = ref<Course | null>(null);
const courses = ref<Course[]>([]);
const confirmPresubscribe = ref<boolean>(false)
const confirmPayment = ref<boolean>(false)
const studentSelected = ref<number | null>(null)
const studentPrice = ref<string>('')
const paymentLink = ref<string>('')
const frequency = ref<string[]>([])
const classroom = ref<Classroom | null>(null);
const classrooms = ref<Classroom[]>([])
const teacher = ref<string>('')
const inCompany = ref<boolean>(false)

const route = useRoute();
const router = useRouter();

const query = ref<StudentQueryParams>({
  group_id: Number(route.params.id)
})

const fetchCourses = async () => {
  const result = await getAll();
  courses.value = (result.data as Course[]).map((course) => ({
    ...course,
    label: course.name,
    value: course.id,
  }));
};

const fetchClassrooms = async () => {
  const result = await getAllClassrooms();
  classrooms.value = (result.data as Classroom[]).map((classroom) => ({
    ...classroom,
    label: classroom.classroom,
    value: classroom.id,
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
      price: Number(price.value.replace(',', '').replace('.', '')),
      course_id: course.value.id,
      classroom_id: classroom.value?.id,
      teacher: teacher.value,
      inCompany: inCompany.value,
      frequency: frequency.value,
    });
    await router.push('/admin/groups');
  } catch (error: unknown) {
    console.log(error);
  }
};

const onReset = () => {
  start.value = new Date().toString();
  end.value = new Date().toString();
  price.value = '';
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
    name: 'status',
    label: 'Status',
    field: 'status',
  },
  {
    name: 'price',
    label: 'Preço',
    field: 'price',
  },
  {
    name: 'presubscribeConfirm',
    label: 'Enviar Pagamento',
    field: 'presubscribeConfirm',
  },
  {
    name: 'paymentConfirm',
    label: 'Confirmar Pagamento',
    field: 'paymentConfirm',
  },
  {
    name: 'remove',
    label: 'Remover',
    field: 'remove',
  },
];

const rows = ref<Student[]>([]);

const fetchStudentsData = async (query: StudentQueryParams = {}) => {
  const response = await getAllStudents(query);
  rows.value = response.data as Student[];
};

const openPresubscribeConfirm = (id: number) => {
  studentSelected.value = id
  confirmPresubscribe.value = true
}

const openPaymentConfirm = (id: number) => {
  studentSelected.value = id
  confirmPayment.value = true
}

const changeStatus = async (status: StudentStatus) => {
  const statusData: StatusData = {
    status,
    student_id: studentSelected.value!,
  }

  if (status === StudentStatus.PAYMENTSENT) {
    statusData.price = Number(studentPrice.value.replace(',', '').replace('.', '')),
    statusData.links = paymentLink.value 
  }
  await changeStudentStatus(Number(route.params.id), statusData)

  await fetchStudentsData(query.value);
}


const removeStudent = async (id: number) => {
  // await destroy(id);
  console.log(id)
  await fetchStudentsData(query.value);
};

onMounted(async () => {
  await fetchStudentsData(query.value);

  await fetchCourses();
  await fetchClassrooms();

  const result = await getById(Number(route.params.id));
  start.value = result.data.start;
  end.value = result.data.end;
  price.value = result.data.price;
  studentPrice.value = result.data.price;
  frequency.value = result.data.frequency;
  teacher.value = result.data.teacher;
  inCompany.value = result.data.inCompany === 1;
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
  classroom.value =
    (classrooms.value as Classroom[])
      .map((classroom) => ({
        ...classroom,
        label: classroom.classroom,
        value: classroom.id,
      }))
      .find((classroom) => {
        return classroom.id === result.data.classroom_id;
      }) || null;
});
</script>
