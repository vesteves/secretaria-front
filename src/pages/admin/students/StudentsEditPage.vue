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
import { useRoute, useRouter } from 'vue-router';
import { update, getById as getStudentById } from 'src/services/admin/students';
import { onMounted, ref } from 'vue';

defineOptions({
  name: 'StudentCreatePage'
});

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
const deficit = ref<string>('')

const route = useRoute();
const router = useRouter();

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
  const result = await getStudentById(Number(route.params.id));

  name.value = result.data.name;
  email.value = result.data.email;
  birthdate.value = result.data.birthdate;
  phone.value = result.data.phone;
  identity.value = result.data.identity;
  cpf.value = result.data.cpf;
  cep.value = result.data.cep;
  address.value = result.data.address;
  education.value = result.data.education;
  graduate.value = result.data.graduate;
  workspace.value = result.data.workspace;
  deficit.value = result.data.deficit;
})

const onSubmit = async () => {
  try {
    const result = await update(Number(route.params.id), {
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
      deficit: deficit.value,
    })
    console.log(result)
    await router.push('/admin/students');

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
  deficit.value = ''
}

onMounted(async () => {
  console.log('Página de pré-cadastro')
})
</script>

