<template>
  <q-page padding class="items-center">
    <h1>Seja bem vindo(a)</h1>
    <p>Aqui vc fará pré cadastro</p>

    <p>Inicialmente: informe seu CPF para verificarmos se vc já possui cadastro</p>

    <div class="flex q-gutter-md">
      <q-input
        v-model="cpf"
        label="CPF"
        :disable="cpfVerified"
      />

      <q-btn
        label="Verifica"
        @click="verifyCpf"
        :disable="cpfVerified"
      />

      <q-btn label="Alterar CPF" @click="changeCpf" />
    </div>

    <div v-if="cpfVerified" class="q-gutter-md">
      <template v-if="!isStudent">
        <q-input
          v-model="name"
          label="Nome Completo"
        />

        <q-input
          type="email"
          v-model="email"
          label="E-mail"
        />

        <q-input
          type="date"
          v-model="birthdate"
          label="Data de Nascimento"
        />

        <q-input
          v-model="phone"
          label="Número de telefone"
        />

        <q-input
          v-model="identity"
          label="Identidade"
        />

        <q-input
          v-model="cep"
          label="CEP"
        />

        <q-input
          v-model="address"
          label="Endereço"
        />

        <q-select
          v-model="education"
          :options="educationOptions"
          label="Qual sua escolaridade?"
        />

        <q-input
          v-model="graduate"
          label="Se você já é graduado ou se está se graduando, pode nos informar em qual curso?"
        />
        
        <q-input
          v-model="workspace"
          label="Qual sua área de trabalho atual?"
        />

        <q-select
          v-model="discover"
          :options="discoverOptions"
          label="Como você ficou sabendo do nosso curso?"
        />

        <q-select
          v-model="google"
          :options="[
            'Sim',
            'Não',
          ]"
          label="Você pesquisou no Google?"
        />

        <q-input
          v-model="deficit"
          label="Você tem alguma deficiência? Se sim, qual?"
        />
      </template>

      <q-select
        v-model="course"
        :options="courseOptions"
        :option-value="(item) => item.id"
        :option-label="(item) => item.name"
        :disable="courseDisabled"
        @update:model-value="getGroups()"
        label="Curso escolhido aqui na COTI"
      />

      <q-select
        v-model="group"
        :options="groupOptions"
        :option-value="(item) => item.id"
        :option-label="(item) => `${date.formatDate(item.start, 'DD/MM/YYYY HH:mm')} - ${date.formatDate(item.end, 'DD/MM/YYYY HH:mm')}`"
        :disable="groupDisabled"
        label="Horário da turma"
      />

      <q-select
        v-model="modality"
        :options="modalityOptions"
        label="Modalidade"
      />

      <q-select
        v-if="!route.query.experimental"
        v-model="payment"
        :options="paymentOptions"
        label="Forma de Pagamento"
      />

      <div>
        <q-btn label="Submit" @click="onSubmit" color="primary"/>
        <q-btn label="Reset" @click="onReset" color="primary" flat class="q-ml-sm" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { date } from 'quasar'
import { getAll as getCourses } from 'src/services/admin/courses';
import { getNextGroupsByCourseId } from 'src/services/admin/groups';
import type { Course }  from 'src/services/admin/courses.d';
import { store, getByCpf } from 'src/services/admin/students';
import type { Group }  from 'src/services/admin/groups.d';
import { onMounted, ref } from 'vue';
import { StudentStore } from 'src/services/admin/students.d';
import { useRoute } from 'vue-router';

defineOptions({
  name: 'StudentCreatePage'
});

const route = useRoute()

const courseOptions = ref<Course[]>([])
const groupOptions = ref<Group[]>([])

const isStudent = ref<boolean>(false)
const cpfVerified = ref<boolean>(false)
const name = ref<string>('')
const email = ref<string>('')
const birthdate = ref<string>('')
const phone = ref<string>('')
const identity = ref<string>('')
const cpf = ref<string>('')
const cep = ref<string>('')
const address = ref<string>('')
const education = ref<string>('')
const graduate = ref<string>('')
const workspace = ref<string>('')
const course = ref<Course | null>(null)
const group = ref<Group | null>(null)
const modality = ref<string>('')
const payment = ref<string>('')
const discover = ref<string>('')
const google = ref<string>('Não')
const deficit = ref<string>('')

const courseDisabled = ref<boolean>(false)
const groupDisabled = ref<boolean>(false)

const paymentOptions = [
  'À vista',
  'Cartão de Crédito',
  'Boleto',
  'Empenho',
]

const modalityOptions = [
  'Presencial',
  'Online (Ao Vivo)',
]

const discoverOptions = [
  'Anuncio no Google',
  'Anuncio no Instagram',
  'Anuncio no Facebook',
  'Linkedin',
  'Indicação de amigos',
  'Palestras',
  'Familiares',
]

const educationOptions = [
  'Ensino Fundamental Completo',
  'Ensino Fundamental Incompleto',
  'Ensino Medio Completo',
  'Ensino Medio Incompleto',
  'Graduação Completa',
  'Graduação Incompleta',
  'Pós Graduação Completa',
  'Pós Graduação Incompleta'
]

const verifyCpf = async () => {
  const response = await getByCpf(cpf.value);
  isStudent.value = response.data.cpf ? true : false
  cpfVerified.value = true
}

const changeCpf = () => {
  cpfVerified.value = false
  isStudent.value = false
}

const getGroups = async () => {
  groupOptions.value = []
  group.value = null

  if (course.value !== null) {
    const { data } = await getNextGroupsByCourseId(course.value.id);
    groupOptions.value = data
  }
}

const onSubmit = async () => {
  if (!course.value?.id || !group.value?.id) {
    return false
  }

  try {
    const data: StudentStore = {
      cpf: cpf.value,
      course_id: course.value.id,
      group_id: group.value.id,
      modality: modality.value,
      payment: payment.value,
    }

    if (!isStudent.value) {
      data.name = name.value
      data.email = email.value
      data.birthdate = birthdate.value
      data.phone = phone.value
      data.identity = identity.value
      data.cep = cep.value
      data.address = address.value
      data.education = education.value
      data.graduate = graduate.value
      data.workspace = workspace.value
      data.discover = discover.value
      data.google = google.value === 'Sim'
      data.deficit = deficit.value
    }
    await store(data)
  } catch (error: unknown) {
    console.log(error)
  }
}

const onReset = () => {
  name.value = ''
  email.value = ''
  birthdate.value = ''
  phone.value = ''
  identity.value = ''
  cpf.value = ''
  cep.value = ''
  address.value = ''
  education.value = ''
  graduate.value = ''
  workspace.value = ''
  course.value = null
  group.value = null
  modality.value = ''
  payment.value = ''
  discover.value = ''
  google.value = 'Não'
  deficit.value = ''
}

onMounted(async () => {
  const { data } = await getCourses()
  courseOptions.value = data

  if(route.query.group_id && route.query.course_id) {
    const courseFound = courseOptions.value.find(course => course.id === Number(route.query.course_id))
    
    if (courseFound) {
      course.value = courseFound

      const { data } = await getNextGroupsByCourseId(course.value.id);
      groupOptions.value = data

      const groupFound = groupOptions.value.find(group => group.id === Number(route.query.group_id))
      
      if (groupFound) {
        group.value = groupFound
      }

      if (route.query.experimental) {
        payment.value = 'experimental'
      }

      courseDisabled.value = true
      groupDisabled.value = true
    }
  }
})
</script>

