<template>
  <q-page padding class="items-center">
    <h1>Seja bem vindo(a)</h1>
    <p>Aqui vc fará pré cadastro</p>

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
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
        v-model="cpf"
        label="CPF"
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
        v-model="course"
        :options="courseOptions"
        :option-value="(item) => item.id"
        :option-label="(item) => item.name"
        @update:model-value="getGroups()"
        label="Curso escolhido aqui na COTI"
      />

      <q-select
        v-model="group"
        :options="groupOptions"
        :option-value="(item) => item.id"
        :option-label="(item) => `${date.formatDate(item.start, 'DD/MM/YYYY HH:mm')} - ${date.formatDate(item.end, 'DD/MM/YYYY HH:mm')}`"
        label="Horário da turma"
      />

      <q-select
        v-model="modality"
        :options="modalityOptions"
        label="Modalidade"
      />

      <q-select
        v-model="payment"
        :options="paymentOptions"
        label="Forma de Pagamento"
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

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { date } from 'quasar'
import { getAll as getCourses } from 'src/services/admin/courses';
import { getNextGroupsByCourseId } from 'src/services/admin/groups';
import type { Course }  from 'src/services/admin/courses.d';
import { store } from 'src/services/admin/students';
import type { Group }  from 'src/services/admin/groups.d';
import { onMounted, ref } from 'vue';

defineOptions({
  name: 'StudentCreatePage'
});

const courseOptions = ref<Course[]>([])
const groupOptions = ref<Group[]>([])

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

onMounted(async () => {
  const { data } = await getCourses()
  courseOptions.value = data
})

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
    const result = await store({
      name: name.value,
      email: email.value,
      birthdate: birthdate.value,
      phone: phone.value,
      identity: identity.value,
      cpf: cpf.value,
      cep: cep.value,
      address: address.value,
      education: education.value,
      graduate: graduate.value,
      workspace: workspace.value,
      course_id: course.value.id,
      group_id: group.value.id,
      modality: modality.value,
      payment: payment.value,
      discover: discover.value,
      google: google.value === 'Sim',
      deficit: deficit.value,
    })
    console.log(result)
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
  console.log('Página de pré-cadastro')
})
</script>

