<template>
  <q-page class="row items-center justify-evenly">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        rounded
        outlined
        type="email"
        v-model="email"
        label="E-mail"
      />

      <q-input
        rounded
        outlined
        type="password"
        v-model="password"
        label="Senha"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { login } from 'src/services/auth';
import { onMounted, ref } from 'vue';

defineOptions({
  name: 'LoginPage'
});

const email = ref<string>('')
const password = ref<string>('')

const onSubmit = async () => {
  try {
    const result = await login({
      email: email.value,
      password: password.value
    })
    console.log(result)
  } catch (error: unknown) {
    console.log(error)
  }
}

const onReset = () => {
  email.value = ''
  password.value = ''
}

onMounted(async () => {
  console.log('Página de login')
})
</script>

